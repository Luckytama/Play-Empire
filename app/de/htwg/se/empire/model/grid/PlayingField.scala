package de.htwg.se.empire.model.grid

import de.htwg.se.empire.model.player.Player
import org.apache.logging.log4j.{LogManager, Logger}

import scala.collection.mutable.ListBuffer

case class PlayingField(continents: List[Continent] = List.empty, players: List[Player] = List.empty, playerOnTurn: Player = Player("Nobody")) {

  def this() = this(List.empty, List.empty, Player("Nobody"))

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

  def removePlayer(player: Player): PlayingField = copy(players = players.filter(_ != player))

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
    val country = getAllCountries find (_.name == countryName)
    if (country.isDefined) {
      country
    } else {
      LOG.info("Country not found with ", countryName)
      None
    }
  }

  def moveSoldiers(src: Country, target: Country, numberOfSoldiers: Int): PlayingField = {
    val srcCountry = src.removeSoldiers(numberOfSoldiers)
    val targetCountry = target.addSoldiers(numberOfSoldiers)
    updateCountry(src, srcCountry.get).updateCountry(target, targetCountry.get)
  }

  def updateCountry(oldCountry: Country, newCountry: Country): PlayingField = {
    for (continent <- continents) {
      if (continent.countries.contains(oldCountry)) {
        val indexInContinents = continents.indexOf(continent)
        val indexInCountries = continent.countries.indexOf(oldCountry)
        copy(continents = continents.updated(indexInContinents, continent.copy(countries = continent.countries.updated(indexInCountries, newCountry))))
      }
    }
    LOG.error("Could not find country named: " + oldCountry.name)
    this
  }

  def updatePlayerOnTurn(player: Player): PlayingField = {
    for (oldPlayer <- players) {
      if (oldPlayer.name == player.name) {
        copy(players = players.updated(players.indexOf(oldPlayer), player), playerOnTurn = player)
      }
    }
    LOG.error("Could not find player named: " + player.name)
    this
  }

  def addCountryToPlayer(updatePlayer: Player, country: Country): PlayingField = {
    for (player <- players) {
      if (player == updatePlayer) {
        copy(players = players.updated(players.indexOf(updatePlayer), player.addCountry(country)))
      }
    }
    this
  }

  def removeCountryFromPlayer(player: Player, country: Country): PlayingField =
    copy(players = players.updated(players.indexOf(player), player.removeCountry(country)))

  def distributeHandholdSoldiers(player: Player, handholdSoldiers: Int): PlayingField =
    copy(players = players.updated(players.indexOf(player), player.copy(handholdSoldiers = handholdSoldiers)))

  def getPlayerOnTurn: Option[Player] = players.find(_ eq playerOnTurn)

  def addSoldiersToCountry(country: Country, numberOfSoldiers: Int): PlayingField = updateCountry(country, country.addSoldiers(numberOfSoldiers).get)

  override def toString: String = {
    val output = new StringBuilder
    if (players.nonEmpty) {
      output.append("Players: " + players.mkString + "\n")
    }
    output.append("Continents: " + continents.mkString)
    output.toString()
  }
}
