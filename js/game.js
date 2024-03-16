import { game as gController } from "./memory.js";

var game = $('#game');
var cards = [];

gController.init(updateSRC).forEach(function(card, indx){
    var cardElement = $('<img id="c'+indx+'" class="card" title="card">');
    game.append(cardElement);
    card.pointer = cardElement;
    card.pointer.on('click', () => gController.click(card));
    card.pointer.attr("src", card.current);
    cards.push(card);
});

function updateSRC(){
    $(this.pointer).attr("src", this.current);
}

// Llama a la función flipAllCards después de un segundo
setTimeout(function() {
    gController.flipAllCards(cards);
}, 0);
