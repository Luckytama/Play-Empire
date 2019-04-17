package de.htwg.se.empire.model.player

import de.htwg.se.empire.model.grid.Country
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{Matchers, WordSpec}

@RunWith(classOf[JUnitRunner])
class PlayerTest extends WordSpec with Matchers {
  "A Player" when {
    var player = Player("Player1")
    "new" should {
      "have a name" in {
        player.name should be("Player1")
      }
      "not have a country" in {
        player.countries.length should be(0)
      }
      "not have soldiers on countries" in {
        player.getNumberOfAllSoldiers should be(0)
      }
      "have a nice String representation" in {
        player.toString should be("Player1 => countries: []")
      }
    }
    "two countries are added" should {
      "have 2 countries" in {
        player = player.addCountry(Country("Another Country", null))
        player = player.addCountry(Country("New Country", null))
        player.countries should be(List(Country("New Country", null), Country("Another Country", null)))
      }
      "provide amount of soldiers on countries" in {
        player = player.addCountry(Country("New Country", null, 3))
        player = player.addCountry(Country("Another Country", null, 2))
        player.getNumberOfAllSoldiers should be(5)
      }
    }
    "a country is removed" should {
      "have 1 country" in {
        val country = Country("A Country", null)
        player = Player("Name", List(country))
        player = player.removeCountry(country)
        player.countries should be(List.empty)
      }
    }
    "a unkown country is removerd" should {
      "log an error" in {
        player.removeCountry(Country("x", null))
      }
    }
    "the country amount is requested" should {
      "be 1 country" in {
        val player = Player("Name")
        player.getCountryAmount should be(0)
      }
    }
    "put a valid amount of soldiers" should {
      "have less handhold soldiers" in {
        var player = Player("Name", handholdSoldiers = 5)
        player = player.putSoldiers(5)
        player.handholdSoldiers should be(0)
      }
    }
    "put an invalid amount of soldiers" should {
      "have the same amount of soldiers on hand" in {
        player = player.putSoldiers(5)
        player.handholdSoldiers should be(0)
      }
    }
  }
}
