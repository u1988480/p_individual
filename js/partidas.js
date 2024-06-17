document.addEventListener('DOMContentLoaded', function () {
    const partidasList = document.getElementById('partidas-list');
    const backButton = document.getElementById('back');

    let savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
    
    if (savedGames.length > 0) {
        savedGames.forEach(savedGame => {
            const partidaDiv = document.createElement('div');
            partidaDiv.classList.add('partida');
            partidaDiv.innerHTML = `
                <p>Modo: ${savedGame.mode === '1' ? 'Modo 1' : 'Modo 2'}</p>
                <p>Nivel: ${savedGame.level}</p>
                <p>Puntos: ${savedGame.points}</p>
                <p>Puntos Totales: ${savedGame.totalPoints}</p>
            `;
            const loadButton = document.createElement('button');
            loadButton.textContent = 'Cargar';
            loadButton.addEventListener('click', () => loadPartida(savedGame.id));
            partidaDiv.appendChild(loadButton);
            partidasList.appendChild(partidaDiv);
        });
    } else {
        partidasList.innerHTML = '<p>No hay partidas guardadas</p>';
    }

    backButton.addEventListener('click', function () {
        window.location.assign('../index.html'); // Redirigir a la página principal o al menú
    });
});

function loadPartida(gameId) {
    sessionStorage.setItem('loadSavedGame', gameId);
    window.location.assign('../html/game.html');
}
