// Funktion zum Überprüfen von Bingos
function checkForBingo(tableElement) {
    const cells = tableElement.getElementsByTagName('td');
    const grid = [];
    for (let i = 0; i < 5; i++) {
        grid[i] = [];
        for (let j = 0; j < 5; j++) {
            grid[i][j] = cells[i * 5 + j].classList.contains('highlighted');
        }
    }

    let bingoLines = 0;

    // Horizontale Linien
    for (let i = 0; i < 5; i++) {
        if (grid[i].every(cell => cell)) bingoLines++;
    }

    // Vertikale Linien
    for (let j = 0; j < 5; j++) {
        if ([0, 1, 2, 3, 4].every(i => grid[i][j])) bingoLines++;
    }

    // Diagonale Linien
    if ([0, 1, 2, 3, 4].every(i => grid[i][i])) bingoLines++; // Haupt-Diagonale
    if ([0, 1, 2, 3, 4].every(i => grid[i][4 - i])) bingoLines++; // Neben-Diagonale

    return bingoLines >= 2; // Doppel-Bingo, wenn 2 oder mehr Linien
}

// Event-Listener für Klicks auf Zellen
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'TD' && !event.target.classList.contains('highlight')) {
        event.target.classList.toggle('highlighted');
        const table = event.target.closest('table');
        const index = Array.from(document.querySelectorAll('table')).indexOf(table);
        saveHighlights(index);

        // Prüfe auf Doppel-Bingo
        if (checkForBingo(table)) {
            alert('Doppel-Bingo! Herzlichen Glückwunsch!');
            // Optional: Füge eine visuelle Meldung hinzu (siehe unten)
        }
    }
});

// Funktion zum Speichern der Hervorhebungen (angepasst für serverseitige Speicherung, falls gewünscht)
function saveHighlights(tableIndex) {
    const tables = document.querySelectorAll('table');
    const highlights = [];
    tables.forEach((table, idx) => {
        if (idx === tableIndex) {
            const cells = table.getElementsByTagName('td');
            const highlighted = Array.from(cells).map(cell => cell.classList.contains('highlighted'));
            highlights.push(highlighted);
        }
    });
    // Hier könntest du die Daten serverseitig speichern, z. B. mit fetch (siehe vorherige Antwort)
    localStorage.setItem(`highlights_${tableIndex}`, JSON.stringify(highlights[0]));
}

// CSS für visuelle Hervorhebung (in styles.css hinzufügen)
.highlighted {
    background-color: yellow !important;
}