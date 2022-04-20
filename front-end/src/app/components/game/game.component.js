// TODO Step 6 import { parseUrl } from '../../utils/utils.js';
// TODO Step 7 import { Component } from "../../utils/component";
// TODO Step 7 import template from "./game.component.html"

(function () {
  // TODO Step 6 remove this closure
  const environment = {
    api: {
      host: "http://localhost:8081",
    },
  };

  /* class GameComponent constructor */
  class GameComponent {
    // gather parameters from URL
    constructor(){
    let params = parseUrl();

    // save player name & game ize
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  /* method GameComponent.init */
  async init() {
    // fetch the cards configuration from the server
    const config = await this.fetchConfig();
    //.then((config) => {
    // TODO Step 3.2: use arrow function
    this._config = config;

    // create a card out of the config
    this._cards = []; // TODO Step 3.3: use Array.map()

    this._config.ids.map((id) => this._cards.push(new CardComponent(id)));

    this._boardElement = document.querySelector(".cards");

    this._cards.forEach((element) => {
      // TODO Step 3.2: use arrow function
      const card = element;
      this._boardElement.appendChild(element.getElement());
      card.getElement().addEventListener("click", () => {
        this._flipCard(card);
      }); // TODO Step 3.2 use arrow function.
    });
    this.start();
    //});
  }


  // TODO Step 7 implement getTemplate() {}

  /* method GameComponent.start */
  start() {
    this._startTime = Date.now();
    let seconds = 0;
    document.querySelector("nav .navbar-title").textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;

    this._timer = setInterval(
      () => {
        document.querySelector("nav .navbar-title").textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;
      },
      1000
    );
  };

  /* method GameComponent.fetchConfig */
  async fetchConfig() {
    return await fetch(`${environment.api.host}/board?size=${this._size}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((error) =>
        console.log("Error while fetching   config: ", error)
      );
  }

  /* method GameComponent.gotoScore */
  gotoScore() {
    let timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(
       () => {
        // TODO Step 7: change path to: `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`;
        window.location = `../score/score.component.html?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
      },
      750
    );
  };

  /* method GameComponent._flipCard */
  _flipCard(card) {
    if (this._busy) {
      return;
    }

    if (card.flipped) {
      return;
    }

    // flip the card
    card.flip();

    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped, and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...

      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;

        // reset flipped card for the next turn.
        this._flippedCard = null;

        if (this._matchedPairs === this._size) {
          this.gotoScore();
        }
      } else {
        this._busy = true;

        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
           () =>  {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;

            // reset flipped card for the next turn.
            this._flippedCard = null;
          },
          500
        );
      }
    }
  };

  // TODO Step 6: Move this method to utils.js
  

}

function parseUrl() {
  const url = window.location;
  let query = url.href.split("?")[1] || "";
  const delimiter = "&";
  let result = {};

  var parts = query.split(delimiter);

  return parts
    .map((items) => {
      return items.split("=");
    })
    .reduce((result, kv) => {
      result[kv[0]] = kv[1];
      return result;
    }, {});
}
  // put component in global scope, to be runnable right from the HTML.
  // TODO Step 7: export GameComponent
  window.GameComponent = GameComponent;
})();
