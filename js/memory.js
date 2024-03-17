export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];

    var lastCard;
    var pairs = 2;
    var points = 100;
    var miss = 25;
    var time = 1000;

    const card = {
        current: back,
        clickable: true,
        callback: null,

        goBack: function () {
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, time);
        },
        goFront: function () {
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };

    return {
        init: function (call) {
            var savedOptions = JSON.parse(localStorage.getItem('options'));
            if (savedOptions) {
                pairs = savedOptions.pairs;
                if (savedOptions.difficulty === "easy"){
                    miss=10;
                    time=2000;
                }
                else if (savedOptions.difficulty === "hard"){
                    miss=40;
                    time=500;
                }

            }
            var items = resources.slice();
            items.sort(() => Math.random() - 0.5);
            items = items.slice(0, pairs);
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5);
            return items.map(item => {
                var newCard = Object.create(card);
                newCard.front = item;
                newCard.callback = call;
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
                    points -= miss;
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
                cards.forEach(card => card.goBack());
        }
    };
}();
