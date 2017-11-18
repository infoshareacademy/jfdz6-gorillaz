let StatisticsService = function (httpsService, timerService) {
    const totalHeroes = 8;
    let bestScore = 0;
    let actualScore = 0;
    let guessed = 0;
    let attempts = 0;
    let isNewBestScore = false;

    let madeAttempt = Observable();
    let guessedHero = Observable();
    let finishedGame = Observable();
    let changedBestScore = Observable();
    let restartedGame = Observable();
    let loggedoutUser = Observable();
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
            finishedGame.next({actualScore: actualScore, isNewBestScore: isNewBestScore});
        }
    }

    function saveBestScore() {
        actualScore = getResult();

        if (actualScore > bestScore) {
            bestScore = actualScore;
            isNewBestScore = true;
            changedBestScore.next(bestScore);
        }
    }

    function getResult() {
        return Math.floor(1000 / (0.7 * attempts + 0.3 * timerService.getCurrentTime()));
    }

    function setBestScore(newBestScore) {
        bestScore = newBestScore;
        changedBestScore.next(bestScore);
    }

    function getBestScore() {
        return bestScore;
    }

    function resetStatistics() {
        guessed = 0;
        attempts = 0;
        madeAttempt.next(attempts);
        guessedHero.next(guessed);
        restartedGame.next();
    }

    function restartGame() {
        resetStatistics();
        timerService.restartTimer();
    }

    function logoutUser() {
        timerService.stopTimer();

        httpsService.remove('/users/logout', {token: localStorage.token})
            .then(() => {
                localStorage.removeItem('token');
                loggedoutUser.next();
            });
    }

    initialize();

    return {
        madeAttempt: madeAttempt,
        guessedHero: guessedHero,
        finishedGame: finishedGame,
        changedBestScore: changedBestScore,
        restartedGame: restartedGame,
        loggedoutUser: loggedoutUser,
        retrievedUser: retrievedUser,
        changedTime: changedTime,
        setBestScore: setBestScore,
        getBestScore: getBestScore,
        makeAttempt: makeAttempt,
        guessHero: guessHero,
        restartGame: restartGame,
        logoutUser: logoutUser
    };
};



