package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.se.empire.EmpireModule
import de.htwg.se.empire.controller.GameController
import de.htwg.se.empire.model.Grid
import de.htwg.se.empire.parser.Parser
import de.htwg.se.empire.view.TUI
import de.htwg.se.empire.view.gui.SwingGui
import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, ControllerComponents}

@Singleton
class EmpireController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def newGame = Action {
    val injector: Injector = Guice.createInjector(new EmpireModule)
    val parser: Parser = injector.getInstance(classOf[Parser])
    val playingField: Grid = injector.getInstance(classOf[Grid])
    val gameController: GameController = injector.getInstance(classOf[GameController])
    val tui: TUI = TUI(gameController)
    val gui = new SwingGui(gameController)

    Ok(views.html.empire())
  }
}
