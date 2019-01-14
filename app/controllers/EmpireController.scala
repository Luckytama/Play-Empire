package controllers

import com.google.inject.{ Guice, Injector }
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import de.htwg.se.empire.EmpireModule
import de.htwg.se.empire.controller.GameController
import de.htwg.se.empire.model.Grid
import de.htwg.se.empire.parser.Parser
import de.htwg.se.empire.util.Phase
import de.htwg.se.empire.view.TUI
import javax.inject.{ Inject, Singleton }
import org.webjars.play.WebJarsUtil
import play.api.i18n.{ I18nSupport, Messages }
import play.api.libs.json.Json
import play.api.mvc._
import utils.auth.{ DefaultEnv, WithProvider }

import scala.concurrent.ExecutionContext

@Singleton
class EmpireController @Inject() (cc: ControllerComponents, silhouette: Silhouette[DefaultEnv])(
  implicit
  webJarsUtil: WebJarsUtil,
  assets: AssetsFinder,
  ex: ExecutionContext
) extends AbstractController(cc) with I18nSupport {

  var injector: Injector = Guice.createInjector(new EmpireModule)
  var parser: Parser = injector.getInstance(classOf[Parser])
  var playingField: Grid = injector.getInstance(classOf[Grid])
  var gameController: GameController = injector.getInstance(classOf[GameController])
  var tui: TUI = TUI(gameController)

  def view: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      Ok(views.html.empire(gameController, request.identity))
  }

  def newGame: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      playingField = injector.getInstance(classOf[Grid])
      gameController = injector.getInstance(classOf[GameController])
      tui = TUI(gameController)
      Redirect(routes.EmpireController.empire()).flashing("success" -> Messages("empire.started"))
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
        Redirect(routes.EmpireController.empire()).flashing("info" -> Messages("empire.started"))
      } else {
        BadRequest("Error")
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
      Ok(result)
  }

  def completeRound: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
      gameController.completeRound()
      Ok("Success")
  }
}