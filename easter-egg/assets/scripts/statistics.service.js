let StatisticsService = function (httpsService, timerService) {
    const totalHeroes = 8;
    let bestScore = 0;
    let guessed = 0;
    let attempts = 0;

    let madeAttempt = Observable();
    let guessedHero = Observable();
    let finishedGame = Observable();
    let changedBestScore = Observable();
    let restartedGame = Observable();
    let retrievedUser = Observable();
    let changedTime = Observable();

    function initialize() {
        timerService.changedCurrentTime.subscribe((currentTime) => changedTime.next(currentTime));
    }

    function makeAttempt() {
        madeAttempt.next(++attempts);
    }

    function guessHero() {
        guessedHero.next(++guessed);

        if (guessed === totalHeroes) {
            timerService.stopTimer();
            saveBestScore();
            finishedGame.next(bestScore);
        }
    }

    function saveBestScore() {
        let actualScore = getResult();

        bestScore = (actualScore > bestScore) ? actualScore : bestScore;
        changedBestScore.next(bestScore);
    }

    function getResult() {
        return Math.floor(1000 / (0.7 * attempts + 0.3 * timerService.getCurrentTime()));
    }

    function getBestScore() {
        return bestScore;
    }

    function restartGame() {
        guessed = 0;
        attempts = 0;
        madeAttempt.next(attempts);
        guessedHero.next(guessed);
        restartedGame.next();
        timerService.restartTimer();
    }

    initialize();

    return {
        madeAttempt: madeAttempt,
        guessedHero: guessedHero,
        finishedGame: finishedGame,
        changedBestScore: changedBestScore,
        restartedGame: restartedGame,
        retrievedUser: retrievedUser,
        changedTime: changedTime,
        getBestScore: getBestScore,
        makeAttempt: makeAttempt,
        guessHero: guessHero,
        restartGame: restartGame
    };
};



