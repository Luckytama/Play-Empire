package de.htwg.se.empire.controller.impl

import java.io.FileNotFoundException

import de.htwg.se.empire.controller.InitController
import de.htwg.se.empire.model.grid.PlayingField
import de.htwg.se.empire.model.player.Player
import de.htwg.se.empire.parser.impl.JsonParser
import org.apache.logging.log4j.{ LogManager, Logger }
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{ Failure, Random, Success }

class DefaultInitController extends InitController {

  val LOG: Logger = LogManager.getLogger(this.getClass)

  val INIT_SOLDIERS_5PLAYER = 25
  val INIT_SOLDIERS_4PLAYER = 30
  val INIT_SOLDIERS_3PLAYER = 35
  val INIT_SOLDIERS_2PLAYER = 40

  val INIT_VALUE_SOLDIERS_PER_COUNTRY = 1

  def loadGridFromFile(pathToGrid: String, players: String*): Future[PlayingField] = {
    val parser = new JsonParser
    val playingField = parser.parseFileToPlayingField(pathToGrid).addPlayers(players: _*)
    playingField
  }

  /*
   * Distribute randomly all countries to all player with one soldiers in it
   */
  def randDistributeCountries(playingField: PlayingField): PlayingField = {
    val allCountries = playingField.getAllCountries
    var updatedPlayingField = playingField
    if (1 <= playingField.players.length) {
      val playerCountries = splitList(Random.shuffle(allCountries), playingField.players.length) zip playingField.players
      for ((countries, player) <- playerCountries) {
        for (country <- countries) {
          country.addSoldiers(INIT_VALUE_SOLDIERS_PER_COUNTRY) match {
            case Success(updatedCountry) =>
              updatedPlayingField = updatedPlayingField.updateCountry(country, updatedCountry)
            case Failure(exception) =>
              LOG.error("There was a problem during distribute Countries to players")
          }
          updatedPlayingField.copy(players = updatedPlayingField.players.updated(updatedPlayingField.players.indexOf(player), player.addCountry(country)))
        }
      }
    } else {
      LOG.info("There are to less players to start the game")
    }
    println(updatedPlayingField)
    updatedPlayingField
  }

  /*
   * Distribute soldiers
   * 5 Players: 25, 4 Players: 30, 3 Players: 35, 2 Players: 40
   */
  def randDistributeSoldiers(playingField: PlayingField): PlayingField = {
    playingField.players.length match {
      case 5 =>
        distribute(playingField, INIT_SOLDIERS_5PLAYER)
      case 4 =>
        distribute(playingField, INIT_SOLDIERS_4PLAYER)
      case 3 =>
        distribute(playingField, INIT_SOLDIERS_3PLAYER)
      case 2 =>
        distribute(playingField, INIT_SOLDIERS_2PLAYER)
      case _ =>
        LOG.error("There are not a valid number of players")
        playingField
    }
  }

  private def distribute(playingField: PlayingField, soldiers: Int): PlayingField = {
    var updatedPlayingField = playingField
    for (player <- playingField.players) {
      val updatedPlayer = distributeSoldierToRandCountry(player, soldiers - player.getNumberOfAllSoldiers)
      updatedPlayingField = playingField.copy(players = updatedPlayingField.players.updated(updatedPlayingField.players.indexOf(player), updatedPlayer))
    }
    updatedPlayingField
  }

  private def distributeSoldierToRandCountry(player: Player, soldiers: Int): Player = {
    if (player.countries.isEmpty) {
      LOG.error("There are no countries set for player ", player.name)
      player.copy()
    } else if (soldiers != 0) {
      val randomCountry = player.countries(Random.nextInt(player.countries.length))
      val updatedPlayer = player.addSoldiersToCountry(randomCountry, 1)
      distributeSoldierToRandCountry(updatedPlayer, soldiers - 1)
    } else {
      player
    }
  }

  private def splitList[T](l: List[T], pieces: Int, len: Int = -1, done: Int = 0, result: List[List[T]] = Nil): List[List[T]] = {
    if (l.isEmpty) {
      result.reverse
    } else {
      val n = if (len < 0) l.length else len
      val ls = l.splitAt((n.toLong * (done + 1) / pieces - n.toLong * done / pieces).toInt)
      splitList(ls._2, pieces, n, done + 1, ls._1 :: result)
    }
  }
}
