let teamATotal = 0;
let teamBTotal = 0;
let roundNumber = 1;
let roundHistory = [];

function addRound() {
    // Get the scores for the current round
    const teamARoundScore = parseInt(document.getElementById('teamARound').value) || 0;
    const teamBRoundScore = parseInt(document.getElementById('teamBRound').value) || 0;

    // Add the round scores to the totals
    teamATotal += teamARoundScore;
    teamBTotal += teamBRoundScore;

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

    // Increment the round number
    roundNumber++;
    document.getElementById('roundNumber').value = roundNumber;

    // Clear the input fields for the next round
    document.getElementById('teamARound').value = '';
    document.getElementById('teamBRound').value = '';

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