export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];

    const card = {
        current: back,
        clickable: true,
        callback: null, // Agregamos una propiedad para almacenar el callback

        goBack: function () {
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback(); // Llamamos al callback para actualizar la visualización
            }, 1000);
        },
        goFront: function () {
            this.current = this.front;
            this.clickable = false;
            this.callback(); // Llamamos al callback para actualizar la visualización
        }
    };

    var lastCard;
    var pairs = 2;
    var points = 100;

    return {
        init: function (call) {
            var items = resources.slice();
            items.sort(() => Math.random() - 0.5);
            items = items.slice(0, pairs);
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5);
            return items.map(item => {
                var newCard = Object.create(card);
                newCard.front = item; // Asignamos el frente de la carta
                newCard.callback = call; // Asignamos el callback para actualizar la visualización
                newCard.current = item;
                return newCard;
            });
        },
        
        click: function (card) {
            if (!card.clickable) return;
            card.goFront();
            if (lastCard) {
                if (card.front === lastCard.front) {
                    pairs--;
                    if (pairs <= 0) {
                        alert("Has ganado con " + points + " puntos!");
                        window.location.replace("../");
                    }
                } else {
                    [card, lastCard].forEach(c => c.goBack());
                    points -= 25;
                    if (points <= 0) {
                        alert("Has perdido");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            } else {
                lastCard = card;
            }
        },
        flipAllCards: function (cards) {
                cards.forEach(card => card.goBack()); // Después de un segundo, volteamos todas las cartas
        }
    };
}();
