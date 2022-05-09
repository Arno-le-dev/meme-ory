
import "bootstrap/dist/css/bootstrap.css";
import "./app/styles/style.css";

import { Router } from "./app/utils/router";
import { GameComponent } from "./app/components/game/game.component";
import { WelcomeComponent } from "./app/components/welcome/welcome.component";  // TODO Step 7 uncomment
import { ScoreComponent } from "./app/components/score/score.component";  // TODO Step 7 uncomment

const outlet = document.querySelector("#content-outlet");

const router = new Router(outlet)
//  .register("", WelcomeComponent) // TODO Step 7 uncomment
  .register("game", GameComponent);
 // .register("score", ScoreComponent); // TODO Step 7 uncomment