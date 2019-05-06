package de.htwg.se.empire.controller

import de.htwg.se.empire.controller.impl.DefaultReinforcementController
import de.htwg.se.empire.model.grid.{Continent, Country, PlayingField}
import de.htwg.se.empire.model.player.Player
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{Matchers, WordSpec}

@RunWith(classOf[JUnitRunner])
class DefaultReinforcementControllerTest extends WordSpec with Matchers {
  "The Reinforcement Controller" when {
    val reinforcementController = new DefaultReinforcementController
    var player = Player("Hans")
    val sampleCountry = Country("Deutschland", List.empty, soldiers = 5)

    "calculate minimum Soldiers to distribute" in {
      val hans = player.addCountry(sampleCountry)
      var playingField = PlayingField(List(Continent("Europe", 5, List(sampleCountry))), List(player))
      reinforcementController.calcSoldiersToDistribute(playingField, player) should be(8)
    }
    "calculate correct amount of Soldiers to distribute" in {
      player = player.addCountry(Country("Italy", null))
      player = player.addCountry(Country("Spain", null))
      player = player.addCountry(Country("Greek", null))
      player = player.addCountry(Country("Swiss", null))
      player = player.addCountry(Country("Great Britain", null))
      player = player.addCountry(Country("New Zealand", null))
      player = player.addCountry(Country("Brasil", null))
      player = player.addCountry(Country("Marokko", null))
      player = player.addCountry(Country("Agypt", null))
      player = player.addCountry(Country("Denmark", null))
      player = player.addCountry(Country("Netherlands", null))

      player = player.addCountry(sampleCountry)

      var playingField = PlayingField(List(Continent("Europe", 5, List(sampleCountry))), List(player))

      reinforcementController.calcSoldiersToDistribute(playingField, player) should be(4)
    }
    "distribute soldiers" in {
      var playingField = PlayingField(List(Continent("Europe", 5, List(sampleCountry))), List(player))
      playingField = reinforcementController.distributeSoldiers(playingField, sampleCountry.name, 5)
      sampleCountry.soldiers should be(5)
    }
  }
}