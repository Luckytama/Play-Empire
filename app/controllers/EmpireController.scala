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
import de.htwg.se.empire.model.grid.Country

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
        functionName match {
          case "getAttackableCountries" => {
            val country = json("country").toString().replace("\"", "")
            val attackableCountries = Json.obj("attackableCountries" -> gameController.getAttackableCountries(country))
            out ! attackableCountries.toString
          }
          case "getStatus" => out ! getStatus
          case "getPlayerInfo" => out ! getPlayerInfo
          case "getCountries" => out ! getCountries
          case "getHandholdSoldiers" => out ! getHandholdSoldiers
          case "distributeSoldiers" => {
            val soldiersToDistribute = json("soldiersToDistribute").toString().replace("\"", "")
            val CountryToDistribute = json("countryToDistribute").toString().replace("\"", "")
            out ! distributeSoldiers(soldiersToDistribute.toInt, CountryToDistribute)
          }
          case "attackCountry" => {
            val attackCountry = json("attackCountry").toString().replace("\"", "")
            val defendCountry = json("defendCountry").toString().replace("\"", "")
            val amountSoldiers = json("amountSoldiers").toString().replace("\"", "")
            out ! executeAttack(attackCountry, defendCountry, amountSoldiers.toInt)
          }
          case "completeRound" => out ! completeRound
        }
    }
  }

  def getAttackableCountries(country:String):String = {
    val attackableCountries = Json.obj("attackableCountries" -> gameController.getAttackableCountries(country))
    attackableCountries.toString
  }

  def completeRound:String = {
    gameController.completeRound()
    val message = Json.obj("success" -> "success")
    message.toString
  }

  def executeAttack(attackCountry:String, defendCountry:String, soldiers:Int):String = {
    val result = gameController.attackCountry(attackCountry, defendCountry, soldiers)
    val attackMessage = Json.obj("attackMessage" -> result)
    attackMessage.toString
  }

  def distributeSoldiers(soldiers:Int, country:String):String  = {
    println(gameController.status)
    val distributedSoldiers: Int = gameController.distributeSoldiers(soldiers, country)
    if (distributedSoldiers > 0) {
      val soldiersToDistribute = Json.obj("soldiersToDistribute" -> distributedSoldiers)
      soldiersToDistribute.toString
    } else {
      println("distributeSoldiers failed")
      val soldiersToDistribute = Json.obj("soldiersToDistribute" -> distributedSoldiers)
      soldiersToDistribute.toString
    }
  }

  implicit val writer: Writes[Country] = (c: Country) => {
    Json.obj("name" -> c.name, "soldiers" -> c.soldiers, "adjacentCountries" -> c.adjacentCountries)

  }

  def getHandholdSoldiers:String = {
    val handholdSoldiers = Json.obj("handholdSoldiers" -> gameController.playerOnTurn.handholdSoldiers)
    handholdSoldiers.toString
  }

  def getCountries:String = {
    val countries = Json.obj("countries" -> gameController.playerOnTurn.countries)
    countries.toString
  }

  def getPlayerInfo:String = {
    val playerOnTurn = Json.obj("playerInfo" -> Json.obj(
      "playerOnTurn" -> JsString(gameController.playerOnTurn.name),
      "numberOfCountries" -> JsNumber(gameController.playerOnTurn.getCountryAmount),
      "numberOfSoldiers" -> JsNumber(gameController.playerOnTurn.getNumberOfAllSoldiers)
    ))
    playerOnTurn.toString
  }

  def getStatus:String = {
    val status = Json.obj("status" -> gameController.status.toString)
    status.toString
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
}