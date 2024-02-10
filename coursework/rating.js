var playersLeaderboard = JSON.parse(localStorage.getItem('PlayersLeaderboard')) || {};
let leaderboardBody = document.getElementById("leaderboard-table").getElementsByTagName("tbody")[0];

var sortedPlayerScores = Object.entries(playersLeaderboard).sort((a, b) => b[1] - a[1]);

sortedPlayerScores.forEach(function([user, score], index) {
if(index < 10 && user != 'NaN'){
    var row = document.createElement('tr');
    var rankCell = document.createElement('td');
    var playerNameCell = document.createElement('td');
    var scoreCell = document.createElement('td');

    rankCell.textContent = index + 1;
    playerNameCell.textContent = user;
    scoreCell.textContent = score;

    row.appendChild(rankCell);
    row.appendChild(playerNameCell);
    row.appendChild(scoreCell);

    leaderboardBody.appendChild(row);
    }
    
});