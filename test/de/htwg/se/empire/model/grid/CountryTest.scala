package de.htwg.se.empire.model.grid

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{Matchers, WordSpec}

@RunWith(classOf[JUnitRunner])
class CountryTest extends WordSpec with Matchers {
  "A Country" when {
    val country = Country("Country", List("Another County"))
    "new" should {
      "have a name" in {
        country.name should be("Country")
      }
      "have an adjacency" in {
        country.adjacentCountries.length should be(1)
      }
      "have a 0 soldiers" in {
        country.soldiers should be(0)
      }
      "have a nice String representation" in {
        country.toString should be("Country")
      }
    }
    "add soldiers" should {
      "have soldiers" in {
        var country = Country("Name", null)
        var countryTry = country.addSoldiers(5)
        countryTry.get.soldiers should be(5)
      }
    }
    "add invalid amount of soldiers" should {
      "throw an Exception" in {
        assertThrows[IllegalArgumentException](country.addSoldiers(-1))
      }
    }
    "remove positive amount of soldiers" should {
      "have 0 soldiers" in {
        country.removeSoldiers(7)
        country.soldiers should be(0)
      }
    }
    "remove an invalid amount of soldiers" should {
      "return Failure" in {
        val countryTry = country.removeSoldiers(-1)
        countryTry.isFailure should be(true)
      }
    }
  }
}
