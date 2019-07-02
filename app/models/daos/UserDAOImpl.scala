package models.daos

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import models.User
import models.daos.UserDAOImpl._
import play.api.libs.json.Json

import scala.collection.mutable
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import org.mongodb.scala._
import org.mongodb.scala.model.Filters._

/**
 * Give access to the user object.
 */
class UserDAOImpl extends UserDAO {
  private val mongoClient: MongoClient = MongoClient()
  private val database: MongoDatabase = mongoClient.getDatabase("empire")
  private val collection: MongoCollection[Document] = database.getCollection("users")

  /**
   * Finds a user by its login info.
   *
   * @param loginInfo The login info of the user to find.
   * @return The found user or None if no user for the given login info could be found.
   */
  def find(loginInfo: LoginInfo): Future[Option[User]] = {
    //    Future.successful(users.find { case (_, user) => user.loginInfo == loginInfo }.map(_._2))
    Future {
      var user = User(
        userID = UUID.randomUUID(),
        loginInfo = loginInfo,
        firstName = Some(""),
        lastName = Some(""),
        fullName = Some(""),
        email = Some(""),
        avatarURL = None,
        activated = true
      )
      var success = false
      var waitOnRes = true
      val coll = collection.find(equal("email", loginInfo.providerKey)).first()
      coll.subscribe(
        (response: Document) => {
          var res = response.toJson()
          println(res)
          user = User(
            userID = (Json.parse(res) \ "userID").get.as[UUID],
            loginInfo = loginInfo,
            firstName = Some((Json.parse(res) \ "firstName").get.as[String]),
            lastName = Some((Json.parse(res) \ "lastName").get.as[String]),
            fullName = Some((Json.parse(res) \ "fullName").get.as[String]),
            email = Some((Json.parse(res) \ "email").get.as[String]),
            avatarURL = None,
            activated = true
          )
          waitOnRes = false
          success = true
          println(success)
          Some(user)
        },
        (e: Throwable) => {
          println(e)
        },
        () => {
          waitOnRes = false
          println("Complete")
          Some(user)
        }
      )
      while (waitOnRes) {
        println("sleeping")
        Thread.sleep(10)
      }
      if (success) {
        Some(user)
      } else {
        None
      }
    }
  }

  /**
   * Finds a user by its user ID.
   *
   * @param userID The ID of the user to find.
   * @return The found user or None if no user for the given ID could be found.
   */
  def find(userID: UUID) = Future.successful(users.get(userID))

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User) = {
    //    users += (user.userID -> user)
    //    Future.successful(user)
    Future {
      val doc = Document(
        "userID" -> user.userID.toString(),
        "loginInfo" -> Document("providerID" -> user.loginInfo.providerID, "providerKey" -> user.loginInfo.providerKey),
        "firstName" -> user.firstName,
        "lastName" -> user.lastName,
        "fullName" -> user.fullName,
        "email" -> user.email,
        "avatarURL" -> None,
        "activated" -> true
      )
      val observable: Observable[Completed] = collection.insertOne(doc)
      observable.subscribe(new Observer[Completed] {
        override def onNext(result: Completed): Unit = println("Inserted")

        override def onError(e: Throwable): Unit = println("Failed")

        override def onComplete(): Unit = println("Completed")
      })
      user
    }
  }
}

/**
 * The companion object.
 */
object UserDAOImpl {

  /**
   * The list of users.
   */
  val users: mutable.HashMap[UUID, User] = mutable.HashMap()
}
