$(document).ready(function() {

    $(".btn_startNewGame").click(function startNewGame() {
        window.open("http://localhost:9000/empire/newgame", "_self");
    });
});