package de.htwg.se.empire.controller

import de.htwg.se.empire.model.grid.PlayingField
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

trait InitController {
  def loadGridFromFile(pathToGrid: String, players: String*): Future[PlayingField]

  def randDistributeCountries(playingField: PlayingField): PlayingField

  def randDistributeSoldiers(playingField: PlayingField): PlayingField
}
