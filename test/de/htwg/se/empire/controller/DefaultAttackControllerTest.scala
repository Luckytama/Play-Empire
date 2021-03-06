package de.htwg.se.empire.controller

import de.htwg.se.empire.controller.impl.DefaultAttackController
import de.htwg.se.empire.model.grid.Country
import de.htwg.se.empire.model.player.Player
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{ Matchers, WordSpec }

@RunWith(classOf[JUnitRunner])
class DefaultAttackControllerTest extends WordSpec with Matchers {
  val attackingCountry = Country("Attacker", List("Defender"))
  val defendingCountry = Country("Defender", List("Attacker"))
  val attacker = Player("Hans")
  val defender = Player("Jürgen")
  attacker.addCountry(attackingCountry)
  defender.addCountry(defendingCountry)

  "The Attacking Controller" when {
    val attackController = new DefaultAttackController
    "Somebody performs an attack with 1 attacking and 1 defending soldier" should {
      attackingCountry.addSoldiers(2)
      defendingCountry.addSoldiers(1)
      attackController.attackCountry(attackingCountry, defendingCountry, 1)
      "have a country with one soldier less" in {
        if (attackingCountry.soldiers == 2) defendingCountry.soldiers should be(0) else attackingCountry.soldiers should be(1)
      }
    }
    "Somebody performs an illegal attack" should {
      "throw an Exception" in {
        assertThrows[IllegalArgumentException](attackController.attackCountry(attackingCountry, defendingCountry, 0))
      }
    }
    "Somebody wants to move soldiers from one to another country" should {
      val country1 = Country("Test1", List("Test2"))
      val country2 = Country("Test2", List("Test1"))
      country1.addSoldiers(5)
      country2.addSoldiers(0)
      "have the moved amount stored in the target country" in {
        attackController.moveSoldiers(country1, country2, 4)
        country1.soldiers should be(1)
        country2.soldiers should be(4)
      }
    }
  }
}
