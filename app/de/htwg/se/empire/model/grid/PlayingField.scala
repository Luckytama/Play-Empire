package de.htwg.se.empire.model.grid

import de.htwg.se.empire.model.player.Player
import org.apache.logging.log4j.{ LogManager, Logger }

import scala.collection.mutable.ListBuffer

case class PlayingField(continents: List[Continent], players: List[Player] = List.empty) {

  def this() = this(List.empty[Continent])

  val LOG: Logger = LogManager.getLogger(this.getClass)

  def addPlayer(player: Player): PlayingField = {
    if (5 >= players.size) {
      copy(players = player :: players)
    } else {
      LOG.info("There can't be more than 5 players.")
      this
    }
  }

  def addPlayers(players: String*): PlayingField = {
    var playingField: PlayingField = copy()
    for (playerName <- players) {
      playingField = playingField.addPlayer(Player(playerName))
    }
    playingField
  }

  def removePlayer(player: Player): PlayingField = {
    copy(players = players.filter(_ equals player))
  }

  def getAllCountries: List[Country] = {
    var countries = new ListBuffer[Country]
    continents.foreach(c => countries ++= c.countries)
    countries.toList
  }

  def getPlayerForCountry(country: Country): Option[Player] = {
    var playerOpt: Option[Player] = None
    players.foreach(p => if (p.countries.contains(country)) playerOpt = Some(p))
    playerOpt
  }

  def getPlayer(playerName: String): Option[Player] = {
    val p = players find (_.name == playerName)
    if (p.isDefined) {
      p
    } else {
      LOG.info("Player not found with name ", playerName)
      None
    }
  }

  def getCountry(countryName: String): Option[Country] = {
    val c = getAllCountries find (_.name == countryName)
    if (c.isDefined) {
      c
    } else {
      LOG.info("Country not found with ", countryName)
      None
    }
  }

  override def toString: String = {
    var output = new StringBuilder
    if (players.nonEmpty) {
      output.append("Players: " + players.mkString + "\n")
    }
    output.append("Continents: " + continents.mkString)
    output.toString()
  }
}
