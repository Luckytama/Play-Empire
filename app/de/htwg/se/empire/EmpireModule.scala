package de.htwg.se.empire

import com.google.inject.AbstractModule
import de.htwg.se.empire.controller.impl.{ DefaultAttackController, DefaultGameController, DefaultInitController, DefaultReinforcementController }
import de.htwg.se.empire.controller.{ AttackController, GameController, InitController, ReinforcementController }
import de.htwg.se.empire.parser.Parser
import de.htwg.se.empire.parser.impl.JsonParser
import net.codingwell.scalaguice.ScalaModule

class EmpireModule extends AbstractModule with ScalaModule {

  val defaultHostname: String = "localhost"
  val defaultFileport: Int = 8089

  override def configure(): Unit = {
    bind[AttackController].to[DefaultAttackController]
    bind[InitController].to[DefaultInitController]
    bind[ReinforcementController].to[DefaultReinforcementController]
    bind[GameController].to[DefaultGameController]
    bind[Parser].to[JsonParser]
  }
}
