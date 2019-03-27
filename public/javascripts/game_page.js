function showNotification(isError, message) {
    let success = $(".alert-info");
    let danger = $(".alert-danger");
    $(".notification_text").text(message);
    if (isError) {
        danger.show();
        setTimeout(function () {
            danger.hide();
        }, 5000)
    } else {
        success.show();
        setTimeout(function () {
            success.hide();
        }, 5000)
    }
}


$(document).ready(function () {

    let ws;

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        ws = new WebSocket("ws://localhost:9000/ws");

    } else {
        ws = new WebSocket("wss://localhost:9000/ws");
    }

    //On reload functions
    window.onload = connectWebSocket(ws);

    let players = [];
    let player_form_index = 1;
    let playingField = "";

    let app = new Vue({
        el: '#app',
        data: {
            status: "SETUP",
            playerOnTurn: "",
            firstPlayer: "",
            secondPlayer: "",
            numberOfCountries: 0,
            numberOfSoldiers: 0,
            countries: [],
            handholdSoldiers: 0,
            soldiersToDistribute: "",
            countryToDistribute: "",
            countryToAttackFrom: "",
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
                ws.send(JSON.stringify(data));
            },
            getCountries: function () {
                let data = {};
                data.function = "getCountries";
                ws.send(JSON.stringify(data));
            },
            getHandholdSoldiers: function () {
                let data = {};
                data.function = "getHandholdSoldiers";
                ws.send(JSON.stringify(data));
            },
            getAttackableCountries: function () {
                if (app.countryToAttackFrom !== '' & app.countryToAttackFrom !== undefined) {
                    let data = {};
                    data.function = "getAttackableCountries";
                    data.country = app.countryToAttackFrom;
                    app.getAttackableSoldiers();
                    ws.send(JSON.stringify(data));
                }
            },
            getAttackableSoldiers: function () {
                for (let c of app.countries) {
                    if (c.name === app.countryToAttackFrom) {
                        app.soldiersOnAttackCountry = c.soldiers - 1;
                    }
                }
            },
            updateGame: function () {
                app.getStatus();
                app.getPlayerInfo();
                app.getCountries();
                app.getHandholdSoldiers();
                // if (app.status === "ATTACK") {
                //     app.getAttackableCountries();
                //     app.getAttackableSoldiers();
                // }

            },
            completeRound: function () {
                let data = {};
                data.function = "completeRound";
                ws.send(JSON.stringify(data));
                app.updateGame();
            },
            startGame: function () {
                $("#player_form input[type=text]").each(function () {
                    if (this.value !== "") {
                        players.push(this.value);
                    }
                });
                playingField = $("#field-select").val();
                if (players.length >= 2) {
                    app.firstPlayer = players[0];
                    app.secondPlayer = players[1];
                    let starter = {
                        "players": players,
                        "playingfield": playingField
                    };
                    $.ajax({
                        url: '/empire/startgame',
                        type: 'POST',
                        data: starter,
                        success: function () {
                            app.updateGame();
                            app.colorCountries();
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
                    //app.soldiersToDistribute = "";
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
                    app.colorCountries();
                    app.countryToAttackFrom = "";
                    app.countryToAttack = "";
                    app.soldiersOnAttackCountry = "";
                    app.soldiersToAttack = ""
                } else {
                    showNotification(true, "Attack not possible!");
                }
            },
            hoverCountry: function () {
                $("#layer4 path").animate(function () {
                    $(this).popover();
                }, function () {
                    $(this).popover();
                })
            },
            clickCountry: function () {
                $("#layer4 path").on("click", function(e) {
                    if (app.playerOnTurn === app.firstPlayer) {
                        if ($(this).hasClass("player_1")) {
                            $(".active").removeClass("active");
                            $(this).addClass("active");
                            if (app.status === "REINFORCEMENT") {
                                app.countryToDistribute = $(this).attr("id")
                            } else if (app.status === "ATTACK") {
                                app.countryToAttackFrom = $(this).attr("id")

                            }
                        }
                    } else {
                        if ($(this).hasClass("player_2")) {
                            $(".active").removeClass("active");
                            $(this).addClass("active");
                            if (app.status === "REINFORCEMENT") {
                                app.countryToDistribute = $(this).attr("id")
                            } else if (app.status === "ATTACK") {
                                app.countryToAttackFrom = $(this).attr("id")

                            }
                        }
                    }
                    if ($(this).hasClass("attackable")) {
                        $(".attackable_selected").removeClass("attackable_selected");
                        $(this).addClass("attackable_selected");
                        app.countryToAttack = $(this).attr("id");
                    }
                });

            },
            colorCountries: function () {
                app.cleanColors();
                if (app.playerOnTurn === app.firstPlayer) {
                    for (let c of app.countries) {
                        $("#" + c.name).addClass("player_1");
                        $("#" + c.name).attr("data-content","Soldiers: " + c.soldiers);
                    }
                    $("#layer4 path").each(function (e) {
                        if(!$(this).hasClass("player_1")) {
                            $(this).addClass("player_2");
                        }
                    })
                } else {
                    for (let c of app.countries) {
                        $("#" + c.name).addClass("player_2");
                        $("#" + c.name).attr("data-content","Soldiers: " + c.soldiers);
                    }
                    $("#layer4 path").each(function (e) {
                        if(!$(this).hasClass("player_2")) {
                            $(this).addClass("player_1");
                        }
                    })
                }

            },
            colorAttackable: function () {
                $(".attackable_selected").removeClass("attackable_selected");
                $("#layer4 path").each(function (e) {
                    $(this).removeClass("attackable");
                });
                for (let c of app.countriesToAttackTo) {
                    $("#" + c).addClass("attackable");
                }
            },
            cleanColors: function () {
                $("#layer4 path").each(function (e) {
                    $(this).removeClass("player_1");
                    $(this).removeClass("player_2");
                    $(this).removeClass("active");
                    $(this).removeClass("attackable");
                    $(this).removeClass("attackable_selected");
                });
            }
        },
        watch: {
            'countries': function () {
                this.colorCountries()
            },
            'countryToAttackFrom': function () {
                this.getAttackableCountries();
            },
            'countriesToAttackTo': function () {
                this.colorAttackable();
            }
        }
    });

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

    let timerId = 0;
    function keepAlive() {
        let timeout = 20000;
        let data = {};
        data.function = "keepAlive";
        if (ws.readyState == ws.OPEN) {
            ws.send(JSON.stringify(data));
        }
        timerId = setTimeout(keepAlive, timeout);
    }

    function cancelKeepAlive() {
        if (timerId) {
            clearTimeout(timerId);
        }
    }

    function isOpen(ws) { return ws.readyState === ws.OPEN }

    function connectWebSocket(ws) {

        ws.onmessage = function (e) {
            if (typeof e.data === "string") {
                let message = JSON.parse(e.data);
                if (message.hasOwnProperty("attackableCountries")) {
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
            keepAlive();
        };

        ws.onclose = function () {
            console.log('Connection with Websocket Closed!');
            cancelKeepAlive();
        };

        ws.onerror = function (error) {
            console.log('Error in Websocket Occured: ' + error);
        };
    }


    $("#add_player").click(function () {
        player_form_index++;
        let el = "<input type='text' id='player_name" + player_form_index + "' name='playername'>";
        $("#player_form").append(el);
    });

    $("#delete_player").click(function () {
        if (player_form_index > 1) {
            $("#player_name" + player_form_index).remove();
            player_form_index--;
        }

    });
});