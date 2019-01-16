package controllers

import akka.actor.{ ActorSystem, _ }
import akka.stream.Materializer
import com.google.inject.{ Guice, Injector }
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import de.htwg.se.empire.EmpireModule
import de.htwg.se.empire.controller.GameController
import de.htwg.se.empire.model.Grid
import de.htwg.se.empire.model.grid.Country
import de.htwg.se.empire.parser.Parser
import de.htwg.se.empire.util.Phase
import de.htwg.se.empire.view.TUI
import javax.inject.{ Inject, Singleton }
import org.webjars.play.WebJarsUtil
import play.api.i18n.{ I18nSupport, Messages }
import play.api.libs.json.{ Json, _ }
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import utils.auth.{ DefaultEnv, WithProvider }

import scala.concurrent.ExecutionContext
import scala.swing.Reactor

@Singleton
class EmpireController @Inject() (cc: ControllerComponents, silhouette: Silhouette[DefaultEnv])(
  implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder,
  ex: ExecutionContext,
  system: ActorSystem,
  materializer: Materializer
) extends AbstractController(cc) with I18nSupport {

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
          case "keepAlive" => out ! Json.obj("pong" -> "pong").toString
        }
    }
  }

  def getAttackableCountries(country: String): String = {
    val attackableCountries = Json.obj("attackableCountries" -> gameController.getAttackableCountries(country))
    attackableCountries.toString
  }

  def executeAttack(attackCountry: String, defendCountry: String, soldiers: Int): String = {
    val result = gameController.attackCountry(attackCountry, defendCountry, soldiers)
    val attackMessage = Json.obj("attackMessage" -> result)
    attackMessage.toString
  }

  def distributeSoldiers(soldiers: Int, country: String): String = {
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

  def getHandholdSoldiers: String = {
    val handholdSoldiers = Json.obj("handholdSoldiers" -> gameController.playerOnTurn.handholdSoldiers)
    handholdSoldiers.toString
  }

  def getCountries: String = {
    val countries = Json.obj("countries" -> gameController.playerOnTurn.countries)
    countries.toString
  }

  def getPlayerInfo: String = {
    val playerOnTurn = Json.obj("playerInfo" -> Json.obj(
      "playerOnTurn" -> JsString(gameController.playerOnTurn.name),
      "numberOfCountries" -> JsNumber(gameController.playerOnTurn.getCountryAmount),
      "numberOfSoldiers" -> JsNumber(gameController.playerOnTurn.getNumberOfAllSoldiers)
    ))
    playerOnTurn.toString
  }

  def getStatus: String = {
    val status = Json.obj("status" -> gameController.status.toString)
    status.toString
  }

  def view: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      Ok(views.html.empire(gameController, request.identity))
  }

  def newGame: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      playingField = injector.getInstance(classOf[Grid])
      gameController = injector.getInstance(classOf[GameController])
      tui = TUI(gameController)
      Redirect(routes.EmpireController.view()).flashing("success" -> Messages("game.started"))
  }

  def empire: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      Redirect(routes.EmpireController.view())
  }

  def startGame: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      val headers = request.body.asFormUrlEncoded.get
      val playernames = headers.get("players[]")
      val playingfieldFile = headers("playingfield").head

      gameController.setUpPhase("playingfield/" + playingfieldFile)
      playernames.foreach(gameController.addPlayer)
      gameController.changeToGamePhase()
      if (gameController.status == Phase.REINFORCEMENT) {
        Redirect(routes.EmpireController.view()).flashing("info" -> Messages("game.started"))
      } else {
        Redirect(routes.EmpireController.view()).flashing("error" -> Messages("game.started.error"))
      }
  }

  def distribute: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
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

  def getAttackTo: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      val headers = request.body.asFormUrlEncoded.get
      val country = headers("country").head.toString
      val adjacencyList = Json.obj("adjacentCountries" -> gameController.getAttackableCountries(country))
      Ok(adjacencyList)
  }

  def executeAttack: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      val headers = request.body.asFormUrlEncoded.get
      val attackCountry = headers("attackCountry").head.toString
      val defendCountry = headers("defendCountry").head.toString
      val soldiers = headers("soldiers").head.toInt
      val result = gameController.attackCountry(attackCountry, defendCountry, soldiers)
      Redirect(routes.EmpireController.view()).flashing("info" -> result)
  }

  def completeRound: String = {
    gameController.completeRound()
    val message = Json.obj("success" -> "success")
    message.toString
  }
}