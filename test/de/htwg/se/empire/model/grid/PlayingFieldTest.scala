package de.htwg.se.empire.model.grid

import de.htwg.se.empire.model.player.Player
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{Matchers, WordSpec}

@RunWith(classOf[JUnitRunner])
class PlayingFieldTest extends WordSpec with Matchers {
  "A Playing Field" when {
    val sampleCountry = Country("Deutschland", null)
    var playingField = PlayingField(List(Continent("Europa", 5, List(sampleCountry))))
    "new" should {
      "have no players" in {
        playingField.players should be(List.empty)
        playingField.getPlayer("Hans").isDefined should be(false)
      }
      "have countries" in {
        playingField.continents.length should be(1)
        playingField.getCountry("Deutschland").isDefined should be(true)
      }
      "doesn't find player for country" in {
        playingField.getPlayerForCountry(sampleCountry) should be(None)
      }
      "have a nice String representation" in {
        playingField.toString should be("Continents: Europa => Bonus: 5, Countries: [Deutschland]")
      }
    }
    "add Player" should {
      val player = Player("Hannes")
      "have a player" in {
        playingField = playingField.addPlayer(player)
        playingField.players.length should be(1)
        playingField.getPlayer("Hannes").get should be(player)
      }
      "have a nice String representation" in {
        playingField.toString should be("Players: Hannes => countries: []\nContinents: Europa => Bonus: 5, Countries: [Deutschland]")
      }
      "have no player after remove" in {
        playingField = playingField.removePlayer(player)
        playingField.players should be(List.empty)
      }
      "provide player for country" in {
        playingField = playingField.addPlayer(player)
        val action = playingField.addCountryToPlayer(player, sampleCountry)
        if (action.isCompleted) {
          val resultPlayingField = action.value.get.get
          val resultPlayer = resultPlayingField.getPlayerForCountry(sampleCountry)
          resultPlayer.isDefined should be(true)
          resultPlayer.get.countries should be(List(Country("Deutschland", null)))
        }
      }
    }
  }
}
