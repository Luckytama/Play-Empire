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
import play.api.mvc.{AbstractController, ControllerComponents}
import play.api.libs.json.Json

@Singleton
class EmpireController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  var injector: Injector = Guice.createInjector(new EmpireModule)
  var parser: Parser = injector.getInstance(classOf[Parser])
  var playingField: Grid = injector.getInstance(classOf[Grid])
  var gameController: GameController = injector.getInstance(classOf[GameController])
  var tui: TUI = TUI(gameController)
  var gui = new SwingGui(gameController)


  def newGame = Action {
    playingField = injector.getInstance(classOf[Grid])
    gameController = injector.getInstance(classOf[GameController])
    tui = TUI(gameController)
    gui = new SwingGui(gameController)
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
      Ok(views.html.empire(gameController))
    }  else {
      Ok(gameController.toString)
    }
  }
}
