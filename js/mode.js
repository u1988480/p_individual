addEventListener('load', function() {
    document.getElementById('gamemode1').addEventListener('click', function() {
        localStorage.setItem('gameMode', '1');
        window.location.assign("./game.html");
    });

    document.getElementById('gamemode2').addEventListener('click', function() {
        localStorage.setItem('gameMode', '2');
        window.location.assign("./game.html");
    });
});
