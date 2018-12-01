name := "playEmpire"
 
version := "1.0" 

lazy val root = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "http://repo.akka.io/snapshots/"

//resolvers += Resolver.sonatypeRepo("snapshots")
      
scalaVersion := "2.12.7"

libraryDependencies += guice
libraryDependencies += "org.scala-lang.modules" % "scala-swing_2.12" % "2.0.3"
//unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )
libraryDependencies += "org.scalactic" %% "scalactic" % "3.0.5"
libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.5" % "test"
libraryDependencies += "junit" % "junit" % "4.8" % "test"
libraryDependencies ++= Seq(
  "org.apache.logging.log4j" %% "log4j-api-scala" % "11.0",
  "org.apache.logging.log4j" % "log4j-api" % "2.11.0",
  "org.apache.logging.log4j" % "log4j-core" % "2.11.0" % Runtime
)
libraryDependencies += "org.json4s" %% "json4s-jackson" % "3.5.0.RC1"
libraryDependencies += "net.codingwell" %% "scala-guice" % "4.2.1"
libraryDependencies += "com.google.inject" % "guice" % "4.1.0"
libraryDependencies += "org.scala-lang.modules" % "scala-swing_2.12" % "2.0.3"

fork in run := true

connectInput in run := true