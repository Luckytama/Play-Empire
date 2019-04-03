package de.htwg.se.empire.controller

import de.htwg.se.empire.model.grid.PlayingField

trait InitController {
  def loadGridFromFile(pathToGrid: String, players: String*): Option[PlayingField]

  def randDistributeCountries(playingField: PlayingField)

  def randDistributeSoldiers(playingField: PlayingField)

  def addPlayers(playingField: PlayingField, player: String*)
}
