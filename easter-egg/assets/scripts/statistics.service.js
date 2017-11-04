let StatisticsService = function (httpsService, timerService) {
    const totalHeroes = 1;
    let bestScore = 0;
    let guessed = 0;
    let attempts = 0;

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

    function setBestScore(newBestScore) {
        bestScore = newBestScore;
        changedBestScore.next(bestScore);
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



