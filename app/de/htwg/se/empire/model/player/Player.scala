package de.htwg.se.empire.model.player

import de.htwg.se.empire.model.grid.Country
import org.apache.logging.log4j.{LogManager, Logger}

import scala.util.{Failure, Success}

case class Player(name: String, countries: List[Country] = List.empty, handholdSoldiers: Int = 0) {

  val LOG: Logger = LogManager.getLogger(this.getClass)

  def addCountry(country: Country): Player = {
    if (countries.contains(country)) {
      LOG.info("Could not add " + country.name + " because player already own country")
      copy()
    } else {
      copy(countries = country :: countries)
    }
  }

  def removeCountry(country: Country): Player = {
    if (countries.contains(country)) {
      copy(countries = countries.filter(_ != country))
    } else {
      LOG.error("Country is not in the list.")
      copy()
    }
  }

  def putSoldiers(soldiers: Int): Player = {
    if (0 > (handholdSoldiers - soldiers)) {
      LOG.warn("You don't have that amout of soldiers in your hands.")
      copy()
    } else {
      copy(handholdSoldiers = handholdSoldiers - soldiers)
    }
  }

  def addSoldiersToCountry(country: Country, numberOfSoldiers: Int): Player = {
    country.addSoldiers(numberOfSoldiers) match {
      case Success(updatedCountry) =>
        copy(countries = countries.updated(countries.indexOf(country), updatedCountry))
      case Failure(exception) =>
        LOG.debug("Could not add " + numberOfSoldiers + " to country " + country.name, exception)
        this
    }
  }

  def getNumberOfAllSoldiers: Int = {
    var count: Int = 0
    countries.foreach(c => count += c.soldiers)
    count
  }

  def getCountryAmount: Int = countries.size

  def containsCountry(country: String): Boolean = {
    if (countries.exists(_.name.equals(country))) true else false
  }

  override def toString: String = name + " => " + "countries: [" + countries.mkString(",") + "]"
}
