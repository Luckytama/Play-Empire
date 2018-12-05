package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.empire.Empire
import de.htwg.se.empire.controller.GameController
import de.htwg.se.empire.view.TUI


/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val gameController: GameController = Empire.gameController
  def tui: String = gameController.status.toString

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action {
    Ok("status: " + tui)
  }

  def about = Action {
    Ok(views.html.index())
  }

}
