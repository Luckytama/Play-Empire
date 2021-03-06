package de.htwg.se.empire.controller.impl

import com.google.inject.{ Guice, Inject, Injector }
import de.htwg.se.empire.EmpireModule
import de.htwg.se.empire.controller.{ AttackController, GameController, InitController, ReinforcementController }
import de.htwg.se.empire.model.Grid
import de.htwg.se.empire.model.grid.Country
import de.htwg.se.empire.model.player.Player
import de.htwg.se.empire.parser.Parser
import de.htwg.se.empire.util.Phase.{ Phase, _ }
import org.apache.logging.log4j.{ LogManager, Logger }

case class DefaultGameController @Inject() (var playingField: Grid) extends GameController {

  val injector: Injector = Guice.createInjector(new EmpireModule)
  val attackController: AttackController = injector.getInstance(classOf[AttackController])
  val initController: InitController = injector.getInstance(classOf[InitController])
  val reinforcementController: ReinforcementController = injector.getInstance(classOf[ReinforcementController])
  val parser: Parser = injector.getInstance(classOf[Parser])

  var status: Phase = SETUP
  var playerOnTurn: Player = _

  val LOG: Logger = LogManager.getLogger(this.getClass)

  override def setUpPhase(pathToGrid: String, players: String*): Unit = {
    status = SETUP
    val playingFieldOpt = initController.setUpGrid(pathToGrid, players: _*)
    if (playingFieldOpt.isDefined) {
      playingField = playingFieldOpt.get
    }
  }

  override def addPlayer(players: String*): Unit = {
    if (status != SETUP) {
      println("You can't add new Players at this time of the game")
    } else {
      initController.addPlayers(playingField, players: _*)
      println("Players are successfully added.")
    }
  }

  override def changeToGamePhase(): Unit = {
    if (checkIfPlayingFieldIsValid()) {
      initController.randDistributeCountries(playingField)
      initController.randDistributeSoldiers(playingField)
      playerOnTurn = playingField.players.head
      status = REINFORCEMENT
      publish(new PhaseChanged)
      changeToReinforcementPhase()
      println("Game starts")
    } else {
      println("The playing field is not setup correct.")
    }
  }

  override def changeToReinforcementPhase(): Unit = {
    if (status == REINFORCEMENT) {
      playerOnTurn.handholdSoldiers = reinforcementController.calcSoldiersToDistribute(playingField, playerOnTurn)
      println(playerOnTurn.name + " is on turn!\nYou have " + playerOnTurn.handholdSoldiers + " soldiers to distribute")
    } else {
      println("You are not in the Reinforcement Phase")
    }
  }

  override def distributeSoldiers(soldiers: Int, countryName: String): Int = {
    if (status == REINFORCEMENT) {
      if (playerOnTurn.handholdSoldiers - soldiers >= 0) {
        reinforcementController.distributeSoldiers(playingField, countryName, soldiers)
        playerOnTurn.handholdSoldiers -= soldiers
        if (playerOnTurn.handholdSoldiers == 0) {
          changeToAttackPhase()
          soldiers
        }
        soldiers
      } else {
        println("You don't have that much soldiers to distribute")
        0
      }
    } else {
      println("You are not in the Reinforcement Phase")
      0
    }
  }

  override def attackCountry(srcCountry: String, targetCountry: String, soldiers: Int): String = {
    if (checkIfAttackIsValid(srcCountry, targetCountry, soldiers)) {
      attackController.attackCountry(playingField.getCountry(srcCountry).get, playingField.getCountry(targetCountry).get, soldiers)
      if (playingField.getCountry(targetCountry).get.soldiers == 0) {
        val ownerTargetCountry = playingField.getPlayerForCountry(playingField.getCountry(targetCountry).get).get
        ownerTargetCountry.countries.remove(ownerTargetCountry.countries.indexOf(playingField.getCountry(targetCountry).get))
        playerOnTurn.addCountry(playingField.getCountry(targetCountry).get)
        status = MOVING
        moveSoldiers(playingField.getCountry(srcCountry).get, playingField.getCountry(targetCountry).get, playingField.getCountry(srcCountry).get.soldiers / 2)
        "You win the battle and gain the country"
      } else {
        "The Country was defended"
      }
    } else {
      "This is not a valid attack"
    }
  }

  override def completeRound(): Unit = {
    val defeatedPlayerOpt = isPlayerDefeated
    if (defeatedPlayerOpt.isDefined) {
      println(defeatedPlayerOpt.get.name + " is defeated")
    } else {
      playerOnTurn = getNextPlayer
      status = REINFORCEMENT
      publish(new PhaseChanged)
      changeToReinforcementPhase()
    }
  }

  override def getCurrentPhase: Phase = status

  override def getAttackableCountries(country: String): List[String] = {
    if (country != "") {
      playingField.getCountry(country).get.adjacentCountries.filter(!playerOnTurn.containsCountry(_))
    } else {
      var dm = List[String]()
      dm
    }
  }

  private def getNextPlayer: Player = {
    val idx = playingField.players.indexOf(playerOnTurn)
    if (idx + 1 == playingField.players.length) playingField.players.head else playingField.players(idx + 1)
  }

  private def isPlayerDefeated: Option[Player] = {
    var defeatedPlayer: Option[Player] = None
    playingField.players.foreach(p => if (p.countries.isEmpty) {
      playingField.players.remove(playingField.players.indexOf(p))
      defeatedPlayer = Some(p)
    })
    if (playingField.players.length == 1) {
      println(playingField.players.head + " won the game!!!!")
      status = FINISH
    }
    defeatedPlayer
  }

  private def checkIfAttackIsValid(srcCountry: String, targetCountry: String, soldiers: Int): Boolean = {
    val src = playingField.getCountry(srcCountry)
    val target = playingField.getCountry(targetCountry)
    if ((src.isDefined && target.isDefined)
      && src.get.adjacentCountries.contains(target.get.name)
      && (src.get.soldiers > soldiers) && (playerOnTurn.countries.contains(src.get)
        && !playerOnTurn.countries.contains(target.get))) {
      true
    } else {
      false
    }
  }

  private def changeToAttackPhase(): Unit = {
    if (playerOnTurn.handholdSoldiers == 0) {
      status = ATTACK
      publish(new PhaseChanged)
      LOG.info("You have successfully distribute all of your soldiers!\nAttack Phase starts")
    }
  }

  private def moveSoldiers(src: Country, target: Country, numberOfSoldiers: Int): Unit = {
    if (src.soldiers - numberOfSoldiers >= 1 && playerOnTurn.countries.contains(src) && playerOnTurn.countries.contains(target)) {
      src.soldiers -= numberOfSoldiers
      target.soldiers += numberOfSoldiers
      status = ATTACK
      publish(new PhaseChanged)
    } else {
      LOG.info("Illegal move!")
    }
  }

  private def checkIfPlayingFieldIsValid(): Boolean = if (playingField.getAllCountries.nonEmpty && playingField.players.length >= 2) true else false
}
