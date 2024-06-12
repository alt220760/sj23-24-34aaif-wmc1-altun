const state = {
    teams: [
        { name: 'Team 1', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 },
        { name: 'Team 2', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 },
        { name: 'Team 3', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 },
        { name: 'Team 4', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 },
        { name: 'Team 5', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 },
        { name: 'Team 6', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 },
        { name: 'Team 7', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 },
        { name: 'Team 8', wins: 0, draws: 0, losses: 0, points: 0, gamesPlayed: 0 }
    ]
};

// 2. FUNCTIONS
function updateTeamStats(team, result) {
    if (result === 'win') team.wins++;
    if (result === 'draw') team.draws++;
    if (result === 'loss') team.losses++;
    team.points = team.wins * 3 + team.draws;
    team.gamesPlayed = team.wins + team.draws + team.losses;
}

function addResult(teamA, teamB, outcome) {
    updateTeamStats(state.teams.find(t => t.name === teamA), outcome);
    updateTeamStats(state.teams.find(t => t.name === teamB), outcome === 'win' ? 'loss' : outcome === 'loss' ? 'win' : 'draw');
}

function clearResults() {
    state.teams.forEach(team => {
        team.wins = 0;
        team.draws = 0;
        team.losses = 0;
        team.points = 0;
        team.gamesPlayed = 0;
    });
}

// 3. DOM REFERENCES
const tableBody = document.querySelector("#table tbody");
const teamASelect = document.getElementById('team-a');
const teamBSelect = document.getElementById('team-b');
const addResultBtn = document.getElementById('add-result');
const clearResultsBtn = document.getElementById('clear-results');

// 4. RENDER FUNCTION
function render() {
    tableBody.innerHTML = '';
    state.teams.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.gamesPlayed}</td>
            <td>${team.wins}</td>
            <td>${team.draws}</td>
            <td>${team.losses}</td>
            <td>${team.points}</td>
        `;
        tableBody.appendChild(row);
    });
    localStorage.setItem('state', JSON.stringify(state));
}

// 5. EVENT HANDLERS
addResultBtn.addEventListener('click', () => {
    const teamA = teamASelect.value;
    const teamB = teamBSelect.value;
    if (teamA !== teamB) {
        const outcome = prompt(`Ergebnis für ${teamA} gegen ${teamB} (win/draw/loss für ${teamA}):`);
        if (['win', 'draw', 'loss'].includes(outcome)) {
            addResult(teamA, teamB, outcome);
            render();
        } else {
            alert('Ungültiges Ergebnis');
        }
    } else {
        alert('Ein Team kann nicht gegen sich selbst spielen');
    }
});

clearResultsBtn.addEventListener('click', () => {
    if (confirm('Möchten Sie wirklich alle Ergebnisse löschen?')) {
        clearResults();
        render();
    }
});

// INIT
state.teams.forEach(team => {
    const optionA = document.createElement('option');
    optionA.value = team.name;
    optionA.textContent = team.name;
    teamASelect.appendChild(optionA);

    const optionB = document.createElement('option');
    optionB.value = team.name;
    optionB.textContent = team.name;
    teamBSelect.appendChild(optionB);
});

const savedState = localStorage.getItem('state');
if (savedState) {
    Object.assign(state, JSON.parse(savedState));
}

render();