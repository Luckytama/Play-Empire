package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.se.empire.EmpireModule
import de.htwg.se.empire.controller.GameController
import de.htwg.se.empire.model.Grid
import de.htwg.se.empire.parser.Parser
import de.htwg.se.empire.util.Phase
import de.htwg.se.empire.view.TUI
import de.htwg.se.empire.view.gui.SwingGui
import javax.inject.{Inject, Singleton}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}

@Singleton
class EmpireController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  var injector: Injector = Guice.createInjector(new EmpireModule)
  var parser: Parser = injector.getInstance(classOf[Parser])
  var playingField: Grid = injector.getInstance(classOf[Grid])
  var gameController: GameController = injector.getInstance(classOf[GameController])
  var tui: TUI = TUI(gameController)


  def newGame = Action {
    playingField = injector.getInstance(classOf[Grid])
    gameController = injector.getInstance(classOf[GameController])
    tui = TUI(gameController)
    Redirect("/empire")
  }

  def empire = Action {
    Ok(views.html.empire(gameController))
  }

  def startGame = Action { request =>
    val headers = request.body.asFormUrlEncoded.get
    val playernames = headers.get("players[]")
    val playingfieldFile = headers("playingfield").head

    gameController.setUpPhase("playingfield/" + playingfieldFile)
    playernames.foreach(gameController.addPlayer)
    gameController.changeToGamePhase()
    if (gameController.status == Phase.REINFORCEMENT) {
      Ok("Success!")
    } else {
      BadRequest("something went wrong")
    }
  }

  def distribute = Action { request =>
    val headers = request.body.asFormUrlEncoded.get
    val amountOfSoldiers = headers("amountOfSoldiers").head.toInt
    val country = headers("country").head.toString
    val distributedSoldiers: Int = gameController.distributeSoldiers(amountOfSoldiers, country)
    if (distributedSoldiers > 0) {
      Ok("Success")
    } else {
      BadRequest("Error")
    }
  }

  def getAttackTo = Action { request =>
    val headers = request.body.asFormUrlEncoded.get
    val country = headers("country").head.toString
    val adjacencyList = Json.obj("adjacentCountries" -> gameController.getAttackableCountries(country))
    Ok(adjacencyList)
  }

  def executeAttack = Action { request =>
    val headers = request.body.asFormUrlEncoded.get
    val attackCountry = headers("attackCountry").head.toString
    val defendCountry = headers("defendCountry").head.toString
    val soldiers = headers("soldiers").head.toInt
    val result = gameController.attackCountry(attackCountry, defendCountry, soldiers)
    Ok(result)
  }

  def completeRound = Action { request =>
    gameController.completeRound()
    Ok("Success")
  }
}