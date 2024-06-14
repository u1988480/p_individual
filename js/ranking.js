document.addEventListener('DOMContentLoaded', function () {
    const rankingList = document.getElementById('ranking-list');
    const backButton = document.getElementById('back');

    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    rankingList.innerHTML = '<ol>' + ranking.map(score => `<li>${score} puntos</li>`).join('') + '</ol>';

    backButton.addEventListener('click', function () {
        window.location.assign('../index.html'); // Redirigir a la página principal o al menú
    });
});
