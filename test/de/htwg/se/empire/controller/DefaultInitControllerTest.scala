package de.htwg.se.empire.controller

import de.htwg.se.empire.controller.impl.DefaultInitController
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{Matchers, WordSpec}

@RunWith(classOf[JUnitRunner])
class DefaultInitControllerTest extends WordSpec with Matchers {
  "A the Init Controller" when {
    "set up without players and with wrong path to file" should {
      val initController = new DefaultInitController
      "handle wrong path" in {
        initController.loadGridFromFile("/wrongPath") should be(None)
      }
    }
    "set up without players and with real path to file" should {
      val initController = new DefaultInitController
      val playingFieldFuture = initController.loadGridFromFile("playingfield/EmpireData.json")
      val playingField = playingFieldFuture.value.get.get
      "return a playing field without player" in {
        playingFieldFuture.isCompleted should be(true)
        playingField.players.length should be(0)
      }
      "not distributing countries because to less players" in {
        initController.randDistributeSoldiers(playingField)
        playingField.equals(playingField) should be(true)
      }
    }
    "set up with players and with real path to file" should {
      val initController = new DefaultInitController
      val playingFieldFuture = initController.loadGridFromFile("playingfield/EmpireData.json", "Hans", "Jürgen", "Karl")
      val playingField = playingFieldFuture.value.get.get
      "return ap playing field with players" in {
        playingFieldFuture.isCompleted should be(true)
        playingField.players.length should be(3)
      }
      "distribute countries fair to players" in {
        initController.randDistributeCountries(playingField)
        playingField.players.head.countries.length should be(14)
        playingField.players(1).countries.length should be(14)
        playingField.players(2).countries.length should be(14)
      }
    }
  }
}