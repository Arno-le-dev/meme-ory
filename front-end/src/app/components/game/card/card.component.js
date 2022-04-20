// TODO Step 7 import { Component } from "../../../utils/component";
// TODO Step 7 import template from  "./card.component.html"

(function () {
  // TODO Step 7 remove this closure

  /* class CardComponent constructor */
  class CardComponent {
    constructor(id){
      this._flipped = false;
    // is this card flipped ?
    // has the matching card has been discovered already ?
    this.matched = false;

    this._id = id;

    this._imageElt = this.getElement().querySelector(".card-wrapper");
    // TODO Step 3.2: use template literals (backquotes)
    // TODO Step 7: Update the path for images with 'src/app/components/game/card/assets/card***'
    this._imageElt.querySelector("img.front-face").src =
      "./card/assets/card-" + this._id + ".png";
    this._imageElt.querySelector("img.back-face").src =
      "./card/assets/back.png";
    }
   
  

  /* method CardComponent.getElement */
  // TODO Step 7: remove this method
  getElement() {
    if (!this._elt) {
      this._elt = document
        .getElementById("card-template")
        .content.cloneNode(true).firstElementChild;
    }
    return this._elt;
  };

  // TODO Step 7 implement getTemplate() {}

  /* method CardComponent.flip */
  flip() {
    this._imageElt.classList.toggle("flip");
    this._flipped = !this._flipped;
  };

  /* method CardComponent.equals */
  equals(card) {
    return card._id === this._id;
  };
  
  /* CardComponent.get flipped() */
  getFlipped() {   
        return this._flipped;
      }

    }

  // put component in global scope, to be runnable right from the HTML.
  // TODO Step 7 export CardComponent
  window.CardComponent = CardComponent;
})();

let environment = {
  api: {
    host: "See that ? Without closures, I can override variables from other files that belongs to the global scope.",
  },
};
