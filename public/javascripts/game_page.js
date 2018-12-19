$(document).ready(function() {

    var players = "";
    var player_form_index=0;

    $("#add_player").click(function() {
        player_form_index++;
        $("#player_name").clone().appendTo("#add_player_form").attr("id","player_name" + player_form_index);
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

    $("#btn_startGame").click(function() {
        if (players === "") {
            // add css class to form_setup for empty input or for Playingfield selection
        } else {
            const http = new XMLHttpRequest();
            const url = "http://localhost:9000/empire/yay";
            http.setRequestHeader("players", players);
            //http.setRequestHeader("playingfield", )
            http.open("GET", url);
            http.send();
        }
    });

});
