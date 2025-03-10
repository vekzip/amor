const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = "turno de juanpa"; // X empieza
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    options[index] = currentPlayer;
    const img = document.createElement("img");
    img.src = currentPlayer === "X" ? "x.png" : "o.png";
    img.style.width = "75%"; // Ajusta al tamaño de la celda
    img.style.height = "75%";
    cell.innerHTML = ""; // Limpia antes de insertar la imagen
    cell.appendChild(img);

}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `turno de ${currentPlayer === "X" ? "juanpa" : "vero"}`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === "X") {
            statusText.textContent = "¡¡ganaste!! mwaaaah. toca al gato";
            showFloatingImage(); // Llamar a la función SOLO cuando gana X (Juanpa)
        } else {
            statusText.textContent = "perdiste. dale un beso a vero para intentarlo de nuevo";
        }
        running = false;
    
    } else if (!options.includes("")) {
        statusText.textContent = "empate!! feliz cum. inténtalo de nuevo";
        running = false;
    } else {
        changePlayer();
    }
}

function showFloatingImage() {
    const floatingImage = document.getElementById("floatingImage");
    floatingImage.style.visibility = "visible"; 

    function moveImage() {
        floatingImage.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        floatingImage.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    }

    const moveInterval = setInterval(moveImage, 1000);

    floatingImage.addEventListener("click", () => {
        clearInterval(moveInterval);
        floatingImage.style.visibility = "hidden";
        document.getElementById("customModal").style.display = "flex"; // Muestra el modal
    });

    moveImage();
}

// Para cerrar el modal
function closeModal() {
    document.getElementById("customModal").style.display = "none";
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "turno de juanpa";
    cells.forEach(cell => cell.innerHTML = ""); 
    running = true;
}

/*particlesJS("particles-js", {
    particles: {
        number: { value: 100 },
        shape: { type: "circle" },
        opacity: { value: 0.7 },
        size: { value: 3 },
        move: { enable: true, speed: 1 },
        color: { value: "#ffffff" },
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "repulse" },
        },
    },
});*/

