$(document).ready(function() {

    let players = [];
    let player_form_index=0;
    let playingField = "";

    $("#add_player").click(function() {
        player_form_index++;
        $("#player_name").clone().appendTo("#add_player_form").attr("id","player_name" + player_form_index).val(null);
    });

    $("#delete_player").click(function() {
        $("#player_name" + player_form_index).remove();
        player_form_index--;
    });

    $("#btn_addPlayer").click(function() {
        var playername = $("#input_playername").val();
        if (playername === "") {
            alert("form ist empty");
            // add css to form_setup for empty input (class = "form_setup empty")
        } else {
            if (players === "") {
                players = playername;
            } else {
                players += ", " + playername;
            }
            $("#players").text(players);
        }
    });

    $("#start_game").click(function(event) {
        $("#add_player_form input[type=text]").each(function() {
            if (this.value !== "") {
                players.push(this.value);
            }
        });
        playingField = $("#field-select").val();
        if(players.length >= 2) {
            let starter = {"players": players,
                "playingfield": playingField};
            $.ajax({
                url: '/empire/startgame',
                type: 'POST',
                data: starter,
                success: function(){
                    location.reload(true);
                },
                error: function(){
                    //TODO: make error handling in empireController and return message
                }
            });
        } else {
            //TODO: Setup a notification bar for those error messeges
            alert("Not enough players!")
        }
    });

    $("#distribute_soldiers_btn").click(function() {
        let amountOfSoldiers = $("#distribute_soldiers_input").val();
        let country = $("#distribute_soldiers_cb").val();
        if (!isNaN(amountOfSoldiers)) {
            let distributeData = {"amountOfSoldiers": amountOfSoldiers, "country": country};
            $.ajax({
                url: 'empire/distribute',
                type: 'POST',
                data: distributeData,
                success: function() {
                    location.reload(true);
                },
                error: function() {
                    alert("Something went wrong!");
                }
            })
        } else {
            alert("Input must be a number");
        }
    });
});
