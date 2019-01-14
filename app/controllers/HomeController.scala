package controllers

import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import javax.inject._
import org.webjars.play.WebJarsUtil
import play.api.i18n.I18nSupport
import play.api.mvc._
import utils.auth.{DefaultEnv, WithProvider}

import scala.concurrent.{ExecutionContext, Future}

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(
                                components: ControllerComponents,
                                silhouette: Silhouette[DefaultEnv],
                              )(
                                implicit
                                webJarsUtil: WebJarsUtil,
                                assets: AssetsFinder,
                                ex: ExecutionContext
                              ) extends AbstractController(components) with I18nSupport {
  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  def about: Action[AnyContent] = silhouette.SecuredAction(WithProvider[DefaultEnv#A](CredentialsProvider.ID)) {
    implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    Ok(views.html.index(request.identity))
  }

}
