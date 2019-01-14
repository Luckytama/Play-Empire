$(document).ready(function () {

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
                "playingfield": playingField,
            };
            $.ajax({
                url: '/empire/startgame',
                type: 'POST',
                data: starter,
                success: function () {
                    location.reload(true);
                },
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
                url: '/empire/distribute',
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
                url: '/empire/attack',
                type: 'POST',
                data: attackData,
                success: function () {
                    location.reload(true);
                }
            });
        }
    });

    $("#complete_round_btn").click(function () {
        $.ajax({
            url: '/empire/complete',
            type: 'POST',
            success: function () {
                location.reload(true);
            }
        });
    });

    $("#attack-from").change(loadAdjacentCountries);

    var csrf_token = $('input[name="csrfToken"]').val();
    $.ajaxPrefilter(function (options) {
        if (options.type.toLowerCase() === "post") {
            // initialize `data` to empty string if it does not exist
            options.data = options.data || "";

            // add leading ampersand if `data` is non-empty
            options.data += options.data ? "&" : "";

            // add _token entry
            options.data += "csrfToken=" + encodeURIComponent(csrf_token);
        }
    });

    function loadAdjacentCountries() {
        let country = $("#attack-from").val();
        let attackToData = {"country": country};
        if (!country || !attackToData) {
            return;
        }
        $.ajax({
            url: '/empire/getAttackTo',
            type: 'POST',
            data: attackToData,
            success: function (attackToCountries) {
                $("#attack-to").empty();
                attackToCountries.adjacentCountries.forEach(function (c) {
                    console.log(c);
                    $("#attack-to").append(new Option(c));
                });
            },
            error: function (message) {
                alert(message);
            }
        })
    }

    //On reload functions
    window.onload = loadAdjacentCountries();
});
