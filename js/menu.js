addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', function(){
        window.location.assign("./html/mode.html");
    });
    document.getElementById('scores').addEventListener('click', function(){
        window.location.assign("./html/ranking.html");
    });
    document.getElementById('options').addEventListener('click', function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', function(){
        window.location.assign("./html/partidas.html");
    });
});
