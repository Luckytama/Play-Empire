package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.se.empire.EmpireModule
import de.htwg.se.empire.controller.GameController
import de.htwg.se.empire.model.Grid
import de.htwg.se.empire.parser.Parser
import de.htwg.se.empire.util.Phase
import de.htwg.se.empire.view.TUI
import javax.inject.{Inject, Singleton}
import play.api.libs.json._
import play.api.mvc._
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._

import scala.swing.Reactor

@Singleton
class EmpireController @Inject()(cc: ControllerComponents)( implicit system: ActorSystem, materializer: Materializer) extends AbstractController(cc) {

  var injector: Injector = Guice.createInjector(new EmpireModule)
  var parser: Parser = injector.getInstance(classOf[Parser])
  var playingField: Grid = injector.getInstance(classOf[Grid])
  var gameController: GameController = injector.getInstance(classOf[GameController])
  var tui: TUI = TUI(gameController)

  def ws: WebSocket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("connection established!")
      EmpireWebSocketActorFactory.create(out)
    }
  }

  object EmpireWebSocketActorFactory {
    def create(out: ActorRef): Props = {
      Props(new EmpireWebSocketActor(out))
    }
  }

  class EmpireWebSocketActor(out: ActorRef) extends Actor with Reactor {
    listenTo(gameController)

    def receive: PartialFunction[Any, Unit] = {
      case msg: String =>
        val json = Json.parse(msg)
        val functionName = json("function").toString().replace("\"", "")
        val country = json("country").toString().replace("\"", "")
        if (functionName == "getAdjacentCountries") {
          val adjacencyList = Json.obj("adjacentCountries" -> gameController.getAttackableCountries(country))
          out ! adjacencyList.toString()
        }
    }


  }

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