document.addEventListener('DOMContentLoaded', function () {
    const partidasList = document.getElementById('partidas-list');
    const backButton = document.getElementById('back');

    let savedGame = JSON.parse(localStorage.getItem('savedGame'));
    
    if (savedGame) {
        partidasList.innerHTML = `<div class="partida">
            <p>Modo: ${savedGame.mode === '1' ? 'Modo 1' : 'Modo 2'}</p>
            <p>Nivel: ${savedGame.level}</p>
            <p>Puntos: ${savedGame.points}</p>
            <p>Puntos Totales: ${savedGame.totalPoints}</p>
            <button onclick="loadPartida()">Cargar</button>
        </div>`;
        
    } else {
        partidasList.innerHTML = '<p>No hay partidas guardadas</p>';
    }

    backButton.addEventListener('click', function () {
        window.location.assign('../index.html'); // Redirigir a la página principal o al menú
    });
});

function loadPartida() {
    window.location.assign('../html/game.html');
}
