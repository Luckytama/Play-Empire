package de.htwg.se.empire.controller

import de.htwg.se.empire.controller.impl.DefaultAttackController
import de.htwg.se.empire.model.grid.Country
import de.htwg.se.empire.model.player.Player
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{Matchers, WordSpec}

@RunWith(classOf[JUnitRunner])
class DefaultAttackControllerTest extends WordSpec with Matchers {
  var attackingCountry = Country("Attacker", List("Defender"))
  var defendingCountry = Country("Defender", List("Attacker"))
  var attacker = Player("Hans")
  var defender = Player("Jürgen")
  attacker = attacker.addCountry(attackingCountry)
  defender = defender.addCountry(defendingCountry)

  "The Attacking Controller" when {
    val attackController = new DefaultAttackController
    "Somebody performs an attack with 1 attacking and 1 defending soldier" should {
      attackingCountry = attackingCountry.addSoldiers(2).get
      defendingCountry = defendingCountry.addSoldiers(1).get
      val (attackerCountry, defenderCountry) = attackController.attackCountry(attackingCountry, defendingCountry, 1)
      "have a country with one soldier less" in {
        if (attackerCountry.soldiers == 2) defenderCountry.soldiers should be(0) else attackerCountry.soldiers should be(1)
      }
    }
    "Somebody performs an illegal attack" should {
      "throw an Exception" in {
        assertThrows[IllegalArgumentException](attackController.attackCountry(attackingCountry, defendingCountry, 0))
      }
    }
  }
}
