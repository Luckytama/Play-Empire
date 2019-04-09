package de.htwg.se.empire.model.grid

import org.apache.logging.log4j.{LogManager, Logger}

case class Country(name: String, adjacentCountries: List[String], soldiers: Int = 0) {

  val LOG: Logger = LogManager.getLogger(this.getClass)

  //TODO: refactor with Try
  def addSoldiers(numberOfSoldiers: Int): Country = {
    if (0 > numberOfSoldiers) {
      LOG.error("Numbers of soldiers can't be negative or null")
      throw new IllegalArgumentException
    }
    copy(soldiers = soldiers + numberOfSoldiers)
  }

  def removeSoldiers(numberOfSoldiers: Int): Country = {
    if (0 > numberOfSoldiers) {
      LOG.error("Numbers of soldiers to remove can't be negative or null")
      throw new IllegalArgumentException
    }
    if (0 <= soldiers - numberOfSoldiers) copy(soldiers = soldiers - numberOfSoldiers) else copy(soldiers = 0)
  }

  override def toString: String = name
}
