function connectWebSocket(websocket) {
    console.log("Connecting to Websocket");

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            let attackToCountries = JSON.parse(e.data);
            $("#attack-to").empty();
            attackToCountries.adjacentCountries.forEach(function (c) {
                $("#attack-to").append(new Option(c));
            });
        }
        else if (e.data instanceof ArrayBuffer) {
            console.log('ArrayBuffer received: ' + e.data);
        }
        else if (e.data instanceof Blob) {
            console.log('Blob received: ' + e.data);
        }
    };

    websocket.onopen = function(event) {
        console.log("Connected to Websocket");
        if ($("#attack-from").val() !== undefined) {
            let country = $("#attack-from").val();
            let data = {};
            data.function = "getAdjacentCountries";
            data.country = country;
            websocket.send(JSON.stringify(data));
        }
    };

    websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };


}


$(document).ready(function () {

    var websocket = new WebSocket("ws://localhost:9000/ws");
    //On reload functions
    window.onload = connectWebSocket(websocket);

    let players = [];
    let player_form_index = 0;
    let playingField = "";

    $("#add_player").click(function () {
        player_form_index++;
        $("#player_name").clone().appendTo("#add_player_form").attr("id", "player_name" + player_form_index).val(null);
    });

    $("#delete_player").click(function () {
        $("#player_name" + player_form_index).remove();
        player_form_index--;
    });

    $("#start_game").click(function () {
        $("#add_player_form input[type=text]").each(function () {
            if (this.value !== "") {
                players.push(this.value);
            }
        });
        playingField = $("#field-select").val();
        if (players.length >= 2) {
            let starter = {
                "players": players,
                "playingfield": playingField
            };
            $.ajax({
                url: '/empire/startgame',
                type: 'POST',
                data: starter,
                success: function () {
                    location.reload(true);
                },
                error: function () {
                    showNotification(true, "Game can't be started.")
                }
            });
        } else {
            showNotification(true, "You need at least 2 players to start the game");
        }
    });

    $("#distribute_soldiers_btn").click(function () {
        let amountOfSoldiers = $("#distribute_soldiers_input").val();
        let country = $("#distribute_soldiers_cb").val();
        if (!isNaN(amountOfSoldiers)) {
            let distributeData = {"amountOfSoldiers": amountOfSoldiers, "country": country};
            $.ajax({
                url: 'empire/distribute',
                type: 'POST',
                data: distributeData,
                success: function () {
                    location.reload(true);
                },
                error: function () {
                    showNotification(true, "An Error occurred at distributing soldiers")
                }
            })
        } else {
            alert("Input must be a number");
        }
    });

    $("#attack_btn").click(function () {
        let attackCountry = $("#attack-from").val();
        let defendCountry = $("#attack-to").val();
        let amountOfSoldiers = $("#soldiers_to_attack").val();
        if (amountOfSoldiers !== "" && !isNaN(amountOfSoldiers)) {
            let attackData = {
                "attackCountry": attackCountry,
                "defendCountry": defendCountry,
                "soldiers": amountOfSoldiers
            };
            $.ajax({
                url: 'empire/attack',
                type: 'POST',
                data: attackData,
                success: function (message) {
                    showNotification(false, message);
                    setTimeout(function () {
                        location.reload(true);
                    }, 2000);
                }
            });
        } else {
            showNotification(true, "Choose an amount of soldiers to attack");
        }
    });

    $("#complete_round_btn").click(function () {
        $.ajax({
            url: 'empire/complete',
            type: 'POST',
            success: function () {
                location.reload(true);
            }
        });
    });

    $("#attack-from").change(loadAdjacentCountries);

    function loadAdjacentCountries() {
        let country = $("#attack-from").val();
        let data = {};
        data.function = "getAdjacentCountries";
        data.country = country;
        websocket.send(JSON.stringify(data));
    }

    function showNotification(isError, message) {
        var notification = $(".notification_bar");
        var notificationMessage = $(".notification_message");

        if (isError) {
            notification.addClass("error");
        } else {
            notification.addClass("success");
        }
        notificationMessage.text(message);
    }
});
