$(document).ready(function () {

    //On reload functions
    window.onload = loadAdjacentCountries();

    let players = [];
    let player_form_index = 0;
    let playingField = "";


    let app = new Vue({
        el: '#app',
        data: {
            status: "SETUP",
            playerOnTurn: "",
            numberOfCountries: 0,
            numberOfSoldiers: 0,
            countries: [],
            handholdSoldiers: 0,
            soldiersToDistribute: "",
            countryToDistribute: "",
            countryToAttackFrom: {},
            countryToAttack: "",
            countriesToAttackTo: [],
            soldiersOnAttackCountry: "",
            soldiersToAttack: ""
        },
        methods: {
            getStatus: function () {
                let data = {};
                data.function = "getStatus";
                ws.send(JSON.stringify(data));
            },
            getPlayerInfo: function () {
                let data = {};
                data.function = "getPlayerInfo";
                ws.send(JSON.stringify(data))
            },
            getCountries: function () {
                let data = {};
                data.function = "getCountries";
                ws.send(JSON.stringify(data))
            },
            getHandholdSoldiers: function () {
                let data = {};
                data.function = "getHandholdSoldiers";
                ws.send(JSON.stringify(data))
            },
            getAttackableCountries: function () {
                let data = {};
                data.function = "getAttackableCountries";
                data.country = $("#attack-from").val();
                app.getAttackableSoldiers();
                ws.send(JSON.stringify(data));
            },
            getAttackableSoldiers: function () {
                for (let c of app.countries) {
                    if (c.name === $("#attack-from").val()) {
                        app.soldiersOnAttackCountry = c.soldiers - 1;
                    }
                }
            },
            updateGame: function () {
                app.getStatus();
                app.getPlayerInfo();
                app.getCountries();
                app.getHandholdSoldiers();
                if (app.status === "ATTACK") {
                    app.getAttackableCountries();
                    app.getAttackableSoldiers();
                }

            },
            completeRound: function () {
                let data = {};
                data.function = "completeRound";
                ws.send(JSON.stringify(data));
                app.updateGame();
            },
            startGame: function () {
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
                            app.updateGame()
                        },
                        error: function () {
                            showNotification(true, "Game can't be started.")
                        }
                    });
                } else {
                    showNotification(true, "You need at least 2 players to start the game");
                }
            },
            distributeSoldiers: function () {
                if (!isNaN(app.soldiersToDistribute) && app.soldiersToDistribute > 0 ) {
                    let data = {};
                    data.function = "distributeSoldiers";
                    data.soldiersToDistribute = app.soldiersToDistribute;
                    data.countryToDistribute = app.countryToDistribute;
                    ws.send(JSON.stringify(data));
                    app.updateGame();
                } else if (app.soldiersToDistribute > app.handholdSoldiers) {
                    showNotification(true, "You don't have that many soldiers to distribute.")
                } else {
                    showNotification(true, "Input must be a number and above 0.");
                }
            },
            attackCountry: function () {
                if (app.soldiersToAttack !== "" && !isNaN(app.soldiersToAttack) && app.soldiersToAttack > 0 ) {
                    let data = {};
                    data.function = "attackCountry";
                    data.attackCountry = app.countryToAttackFrom;
                    data.defendCountry = app.countryToAttack;
                    data.amountSoldiers = app.soldiersToAttack;
                    ws.send(JSON.stringify(data));
                    app.updateGame();
                } else {
                    showNotification(true, "Attack not possible!");
                }
            }
        },
    });

    function isOpen(ws) { return ws.readyState === ws.OPEN }

    function connectWebSocket(ws) {

        ws.onmessage = function (e) {
            if (typeof e.data === "string") {
                let message = JSON.parse(e.data);
                if (message.hasOwnProperty("attackableCountries")) {
                    console.log(message.attackableCountries);
                    app.countriesToAttackTo = message.attackableCountries;
                } else if (message.hasOwnProperty("status")) {
                    app.status = message.status;
                } else if (message.hasOwnProperty("playerInfo")) {
                    app.playerOnTurn = message.playerInfo.playerOnTurn;
                    app.numberOfCountries = message.playerInfo.numberOfCountries;
                    app.numberOfSoldiers = message.playerInfo.numberOfSoldiers;
                } else if (message.hasOwnProperty('countries')) {
                    app.countries = message.countries;
                } else if (message.hasOwnProperty("handholdSoldiers")) {
                    app.handholdSoldiers = message.handholdSoldiers;
                } else if (message.hasOwnProperty("attackMessage")) {
                    showNotification(false, message.attackMessage);
                }
            }
            else if (e.data instanceof ArrayBuffer) {
                console.log('ArrayBuffer received: ' + e.data);
            }
            else if (e.data instanceof Blob) {
                console.log('Blob received: ' + e.data);
            }
        };

        ws.onopen = function() {
            console.log("Connected to Websocket");
        };

        ws.onclose = function () {
            console.log('Connection with Websocket Closed!');
        };

        ws.onerror = function (error) {
            console.log('Error in Websocket Occured: ' + error);
        };
    }

    $("#add_player").click(function () {
        player_form_index++;
        $("#player_name").clone().appendTo("#add_player_form").attr("id", "player_name" + player_form_index).val(null);
    });

    $("#delete_player").click(function () {
        $("#player_name" + player_form_index).remove();
        player_form_index--;
    });
});
