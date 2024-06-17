addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', function(){
        localStorage.removeItem('savedGame'); // Eliminar partida guardada
        window.location.assign("./html/mode.html");
    });

    document.getElementById('options').addEventListener('click', function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', function(){
        window.location.assign("./html/partidas.html");
    });

    document.getElementById('scores').addEventListener('click', function(){
        window.location.assign("./html/ranking.html");
    });
});
