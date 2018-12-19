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
                dataType: 'JSON',
                data: starter,
                beforeSend: function(request) {
                    return request.setRequestHeader('X-CSRF-Token', $("meta[name='token']").attr('content'));
                },
                success: function(response){
                    console.log("success");
                },
                error: function(response){
                }
            });
        } else {
            alert("Not enough players!")
        }

        // if (players === "") {
        //     // add css class to form_setup for empty input or for Playingfield selection
        // } else {
        //     const http = new XMLHttpRequest();
        //     const url = "http://localhost:9000/empire/yay";
        //     http.setRequestHeader("players", players);
        //     //http.setRequestHeader("playingfield", )
        //     http.open("GET", url);
        //     http.send();
        // }
    });

});
