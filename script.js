let teamATotal = 0;
let teamBTotal = 0;
let roundNumber = 1;
let roundHistory = [];
let selectedPoints = 0;

// Load data from localStorage
window.onload = function() {
    const savedData = localStorage.getItem('roundHistory');
    if (savedData) {
        roundHistory = JSON.parse(savedData);
        roundHistory.forEach(round => {
            addRoundToTable(round.roundNumber, round.teamARoundScore, round.teamBRoundScore);
        });
        updateTotals();
    }
};

function addRoundToTable(roundNumber, teamARoundScore, teamBRoundScore) {
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const roundCell = newRow.insertCell(0);
    const teamACell = newRow.insertCell(1);
    const teamBCell = newRow.insertCell(2);

    roundCell.textContent = roundNumber;
    teamACell.textContent = teamARoundScore;
    teamBCell.textContent = teamBRoundScore;
}

function updateTotals() {
    teamATotal = roundHistory.reduce((total, round) => total + round.teamARoundScore, 0);
    teamBTotal = roundHistory.reduce((total, round) => total + round.teamBRoundScore, 0);

    document.getElementById('teamATotal').textContent = teamATotal;
    document.getElementById('teamBTotal').textContent = teamBTotal;
    document.getElementById('roundNumber').value = roundHistory.length + 1;

    checkWinner();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('roundHistory', JSON.stringify(roundHistory));
}

function setPointsAndAddRound(points, team) {
    setPoints(points);
    addRound(team);
}

function setPoints(points) {
    selectedPoints = points;
}

function addRound(team) {
    // Get the points for the current round
    const points = selectedPoints;
    if (points === 0) {
        alert('Please select a point value.');
        return;
    }

    let teamARoundScore = 0;
    let teamBRoundScore = 0;

    if (team === 'A') {
        teamARoundScore = points;
        teamATotal += points;
    } else {
        teamBRoundScore = points;
        teamBTotal += points;
    }

    // Update the total scores on the page
    document.getElementById('teamATotal').textContent = teamATotal;
    document.getElementById('teamBTotal').textContent = teamBTotal;

    // Add the round to the history table
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const roundCell = newRow.insertCell(0);
    const teamACell = newRow.insertCell(1);
    const teamBCell = newRow.insertCell(2);

    roundCell.textContent = roundNumber;
    teamACell.textContent = teamARoundScore;
    teamBCell.textContent = teamBRoundScore;

    // Store the round data in the history
    roundHistory.push({ roundNumber, teamARoundScore, teamBRoundScore });
    saveData();

    // Increment the round number
    roundNumber++;
    document.getElementById('roundNumber').value = roundNumber;

    // Reset the selected points
    selectedPoints = 0;

    // Check if either team has reached or exceeded 54 points
    checkWinner();
}

function undoLastRound() {
    if (roundHistory.length === 0) return;

    // Get the last round data
    const lastRound = roundHistory.pop();

    // Subtract the last round scores from the totals
    teamATotal -= lastRound.teamARoundScore;
    teamBTotal -= lastRound.teamBRoundScore;

    // Update the total scores on the page
    document.getElementById('teamATotal').textContent = teamATotal;
    document.getElementById('teamBTotal').textContent = teamBTotal;

    // Remove the last row from the history table
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    historyTable.deleteRow(historyTable.rows.length - 1);

    // Decrement the round number
    roundNumber--;
    document.getElementById('roundNumber').value = roundNumber;

    saveData();

    // Check if either team has reached or exceeded 54 points
    checkWinner();
}

function checkWinner() {
    let resultText = '';
    if (teamATotal >= 54 && teamBTotal >= 54) {
        resultText = `<p>Both teams have reached 54 points! It's a tie!</p>`;
    } else if (teamATotal >= 54) {
        resultText = `<p>Team A Wins with ${teamATotal} points!</p>`;
    } else if (teamBTotal >= 54) {
        resultText = `<p>Team B Wins with ${teamBTotal} points!</p>`;
    } else {
        resultText = `<p>No team has reached 54 points yet.</p>`;
    }

    // Display the result
    document.getElementById('result').innerHTML = resultText;
}

function resetGame() {
    // Clear the round history
    roundHistory = [];
    saveData();

    // Reset the totals
    teamATotal = 0;
    teamBTotal = 0;
    document.getElementById('teamATotal').textContent = teamATotal;
    document.getElementById('teamBTotal').textContent = teamBTotal;

    // Clear the history table
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    historyTable.innerHTML = '';

    // Reset the round number
    roundNumber = 1;
    document.getElementById('roundNumber').value = roundNumber;

    // Clear the input fields
    document.getElementById('teamARound').value = '';
    document.getElementById('teamBRound').value = '';

    // Clear the result
    document.getElementById('result').textContent = '';
}

function validateInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}