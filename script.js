// Create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    if (!heartsContainer) return;
    
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }, 500);
}

// Create floating stars
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;
    
    const stars = ['⭐', '✨', '🌟', '💫'];
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 8 + 8) + 's';
        starsContainer.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 20000);
    }, 800);
}

// Navigation functions
function goToNextPage() {
    window.location.href = 'video.html';
}

function goToMessagePage() {
    window.location.href = 'message.html';
}

function goToGamePage() {
    window.location.href = 'game.html';
}

function goToHome() {
    window.location.href = 'index.html';
}

// Photo frame click handler
document.addEventListener('DOMContentLoaded', function() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    
    photoFrames.forEach(frame => {
        frame.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const frameContent = frame.querySelector('.frame-content');
                        frameContent.style.backgroundImage = `url(${event.target.result})`;
                        frameContent.innerHTML = '';
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    });
});

// Game functionality
let gameScore = 0;
let gameTimer = 30;
let gameInterval = null;
let heartInterval = null;
let isGameRunning = false;

function startGame() {
    if (isGameRunning) return;
    
    isGameRunning = true;
    gameScore = 0;
    gameTimer = 30;
    
    const gameArea = document.getElementById('gameArea');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const finalMessage = document.getElementById('finalMessage');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    
    gameArea.innerHTML = '';
    startButton.style.display = 'none';
    resetButton.style.display = 'none';
    finalMessage.style.display = 'none';
    
    // Update score display
    scoreDisplay.textContent = gameScore;
    timerDisplay.textContent = gameTimer;
    
    // Create hearts
    heartInterval = setInterval(() => {
        if (!isGameRunning) return;
        
        const heart = document.createElement('div');
        heart.className = 'game-heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
        heart.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
        
        heart.addEventListener('click', function() {
            gameScore++;
            scoreDisplay.textContent = gameScore;
            this.style.animation = 'appear 0.3s reverse';
            setTimeout(() => {
                this.remove();
            }, 300);
        });
        
        gameArea.appendChild(heart);
        
        // Remove heart after 3 seconds if not clicked
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 3000);
    }, 800);
    
    // Timer
    gameInterval = setInterval(() => {
        gameTimer--;
        timerDisplay.textContent = gameTimer;
        
        if (gameTimer <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isGameRunning = false;
    
    clearInterval(gameInterval);
    clearInterval(heartInterval);
    
    const gameArea = document.getElementById('gameArea');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const finalMessage = document.getElementById('finalMessage');
    const finalScore = document.getElementById('finalScore');
    
    gameArea.innerHTML = '';
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    finalMessage.style.display = 'block';
    
    let message = '';
    if (gameScore >= 50) {
        message = 'Wah, kamu luar biasa! Skor: ' + gameScore + ' 🏆';
    } else if (gameScore >= 30) {
        message = 'Bagus sekali! Skor: ' + gameScore + ' 🎉';
    } else if (gameScore >= 15) {
        message = 'Lumayan! Skor: ' + gameScore + ' 👍';
    } else {
        message = 'Coba lagi ya! Skor: ' + gameScore + ' 💪';
    }
    
    finalScore.textContent = message;
}

function resetGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearInterval(heartInterval);
    
    const gameArea = document.getElementById('gameArea');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const finalMessage = document.getElementById('finalMessage');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    
    gameArea.innerHTML = '<p class="start-message">Klik tombol di bawah untuk mulai! 🎮</p>';
    startButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
    finalMessage.style.display = 'none';
    scoreDisplay.textContent = '0';
    timerDisplay.textContent = '30';
}

// Game Selector
function switchGame(gameType) {
    // Hide all games
    document.querySelectorAll('.game-content').forEach(game => {
        game.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.game-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected game
    const selectedGame = document.getElementById(gameType + 'Game');
    if (selectedGame) {
        selectedGame.style.display = 'block';
    }
    
    // Add active class to selected tab
    const clickedTab = event ? event.target : document.querySelector(`[data-game="${gameType}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Quiz Game
let quizQuestions = [
    {
        question: "Apa yang membuat seseorang istimewa di hari ulang tahunnya?",
        answers: ["Hadiah mahal", "Kehadiran orang terkasih", "Pesta besar", "Semua benar"],
        correct: 1
    },
    {
        question: "Apa yang paling penting dalam merayakan ulang tahun?",
        answers: ["Makanan enak", "Kebersamaan dan cinta", "Dekorasi mewah", "Hadiah banyak"],
        correct: 1
    },
    {
        question: "Apa harapan terbaik untuk ulang tahun?",
        answers: ["Kesehatan", "Kebahagiaan", "Kesuksesan", "Semua di atas"],
        correct: 3
    },
    {
        question: "Momen terindah di ulang tahun adalah?",
        answers: ["Menerima hadiah", "Tiup lilin", "Bersama orang tersayang", "Makan kue"],
        correct: 2
    },
    {
        question: "Apa yang membuat ulang tahun berkesan?",
        answers: ["Pesta besar", "Kenangan indah", "Hadiah mahal", "Semua benar"],
        correct: 1
    }
];

let currentQuestion = 0;
let quizScore = 0;
let isQuizRunning = false;

function startQuiz() {
    if (isQuizRunning) return;
    
    isQuizRunning = true;
    currentQuestion = 0;
    quizScore = 0;
    
    const startButton = document.getElementById('startQuizButton');
    const resetButton = document.getElementById('resetQuizButton');
    const finalMessage = document.getElementById('quizFinalMessage');
    
    startButton.style.display = 'none';
    resetButton.style.display = 'none';
    finalMessage.style.display = 'none';
    
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    const questionText = document.getElementById('questionText');
    const answersDiv = document.getElementById('answers');
    const questionNum = document.getElementById('questionNum');
    const quizScoreDisplay = document.getElementById('quizScore');
    
    questionText.textContent = question.question;
    questionNum.textContent = `${currentQuestion + 1}/${quizQuestions.length}`;
    quizScoreDisplay.textContent = quizScore;
    
    answersDiv.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersDiv.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (!isQuizRunning) return;
    
    const question = quizQuestions[currentQuestion];
    const answerButtons = document.querySelectorAll('.answer-button');
    
    answerButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('wrong');
        }
    });
    
    if (selectedIndex === question.correct) {
        quizScore++;
        document.getElementById('quizScore').textContent = quizScore;
    }
    
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function endQuiz() {
    isQuizRunning = false;
    
    const resetButton = document.getElementById('resetQuizButton');
    const finalMessage = document.getElementById('quizFinalMessage');
    const finalScore = document.getElementById('quizFinalScore');
    
    resetButton.style.display = 'inline-block';
    finalMessage.style.display = 'block';
    
    let message = '';
    const percentage = (quizScore / quizQuestions.length) * 100;
    if (percentage === 100) {
        message = `Sempurna! Kamu benar ${quizScore}/${quizQuestions.length} pertanyaan! 🏆`;
    } else if (percentage >= 60) {
        message = `Bagus! Kamu benar ${quizScore}/${quizQuestions.length} pertanyaan! 🎉`;
    } else {
        message = `Kamu benar ${quizScore}/${quizQuestions.length} pertanyaan. Coba lagi! 💪`;
    }
    
    finalScore.textContent = message;
}

function resetQuiz() {
    isQuizRunning = false;
    currentQuestion = 0;
    quizScore = 0;
    
    const startButton = document.getElementById('startQuizButton');
    const resetButton = document.getElementById('resetQuizButton');
    const finalMessage = document.getElementById('quizFinalMessage');
    const questionText = document.getElementById('questionText');
    const answersDiv = document.getElementById('answers');
    const quizScoreDisplay = document.getElementById('quizScore');
    const questionNum = document.getElementById('questionNum');
    
    startButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
    finalMessage.style.display = 'none';
    questionText.textContent = 'Siap untuk mulai?';
    answersDiv.innerHTML = '';
    quizScoreDisplay.textContent = '0';
    questionNum.textContent = '1/5';
}

// Memory Game
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let isMemoryRunning = false;
let canFlip = true;

const memoryEmojis = ['💖', '💕', '💗', '💓', '💝', '💞'];

function startMemoryGame() {
    if (isMemoryRunning) return;
    
    isMemoryRunning = true;
    matchedPairs = 0;
    memoryMoves = 0;
    flippedCards = [];
    canFlip = true;
    
    const startButton = document.getElementById('startMemoryButton');
    const resetButton = document.getElementById('resetMemoryButton');
    const finalMessage = document.getElementById('memoryFinalMessage');
    const memoryBoard = document.getElementById('memoryBoard');
    
    startButton.style.display = 'none';
    resetButton.style.display = 'none';
    finalMessage.style.display = 'none';
    
    // Create cards
    memoryCards = [...memoryEmojis, ...memoryEmojis].sort(() => Math.random() - 0.5);
    
    memoryBoard.innerHTML = '';
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.innerHTML = '<span class="card-back">?</span>';
        card.onclick = () => flipCard(index);
        memoryBoard.appendChild(card);
    });
    
    updateMemoryStats();
}

function flipCard(index) {
    if (!isMemoryRunning || !canFlip) return;
    
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    card.innerHTML = `<span class="card-front">${card.dataset.emoji}</span>`;
    
    flippedCards.push({ index, emoji: card.dataset.emoji, element: card });
    
    if (flippedCards.length === 2) {
        canFlip = false;
        memoryMoves++;
        updateMemoryStats();
        
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.emoji === card2.emoji) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === memoryEmojis.length) {
            setTimeout(() => {
                endMemoryGame();
            }, 500);
        }
    } else {
        card1.element.classList.remove('flipped');
        card2.element.classList.remove('flipped');
        card1.element.innerHTML = '<span class="card-back">?</span>';
        card2.element.innerHTML = '<span class="card-back">?</span>';
    }
    
    flippedCards = [];
    canFlip = true;
}

function updateMemoryStats() {
    document.getElementById('memoryMoves').textContent = memoryMoves;
    document.getElementById('memoryPairs').textContent = `${matchedPairs}/${memoryEmojis.length}`;
}

function endMemoryGame() {
    isMemoryRunning = false;
    
    const resetButton = document.getElementById('resetMemoryButton');
    const finalMessage = document.getElementById('memoryFinalMessage');
    const finalScore = document.getElementById('memoryFinalScore');
    
    resetButton.style.display = 'inline-block';
    finalMessage.style.display = 'block';
    
    let message = '';
    if (memoryMoves <= 12) {
        message = `Luar biasa! Kamu menang dengan ${memoryMoves} percobaan! 🏆`;
    } else if (memoryMoves <= 20) {
        message = `Bagus! Kamu menang dengan ${memoryMoves} percobaan! 🎉`;
    } else {
        message = `Kamu menang dengan ${memoryMoves} percobaan! 💪`;
    }
    
    finalScore.textContent = message;
}

function resetMemoryGame() {
    isMemoryRunning = false;
    matchedPairs = 0;
    memoryMoves = 0;
    flippedCards = [];
    
    const startButton = document.getElementById('startMemoryButton');
    const resetButton = document.getElementById('resetMemoryButton');
    const finalMessage = document.getElementById('memoryFinalMessage');
    const memoryBoard = document.getElementById('memoryBoard');
    
    startButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
    finalMessage.style.display = 'none';
    memoryBoard.innerHTML = '';
    updateMemoryStats();
}

// Audio Player Controls
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    createStars();
    initAudioPlayer();
});

function initAudioPlayer() {
    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const volumeControl = document.getElementById('volumeControl');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    const audioContainer = document.querySelector('.audio-player-container');
    
    if (!audio || !playPauseBtn) return;
    
    // Update duration when metadata loads
    audio.addEventListener('loadedmetadata', function() {
        durationSpan.textContent = formatTime(audio.duration);
        audio.volume = volumeControl.value / 100;
    });
    
    // Update current time
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = isNaN(progress) ? 0 : progress;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });
    
    // Play/Pause button
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            audioContainer.classList.add('playing');
            playPauseBtn.querySelector('.play-icon').style.display = 'none';
            playPauseBtn.querySelector('.pause-icon').style.display = 'inline';
        } else {
            audio.pause();
            audioContainer.classList.remove('playing');
            playPauseBtn.querySelector('.play-icon').style.display = 'inline';
            playPauseBtn.querySelector('.pause-icon').style.display = 'none';
        }
    });
    
    // Progress bar
    progressBar.addEventListener('input', function() {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });
    
    // Volume control
    volumeControl.addEventListener('input', function() {
        audio.volume = volumeControl.value / 100;
        const volumeIcon = document.querySelector('.volume-icon');
        if (volumeControl.value == 0) {
            volumeIcon.textContent = '🔇';
        } else if (volumeControl.value < 50) {
            volumeIcon.textContent = '🔉';
        } else {
            volumeIcon.textContent = '🔊';
        }
    });
    
    // When audio ends
    audio.addEventListener('ended', function() {
        audioContainer.classList.remove('playing');
        playPauseBtn.querySelector('.play-icon').style.display = 'inline';
        playPauseBtn.querySelector('.pause-icon').style.display = 'none';
        progressBar.value = 0;
        currentTimeSpan.textContent = '0:00';
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
