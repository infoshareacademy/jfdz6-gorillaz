let DashboardComponent = function (statisticsService) {
    const $statistics = $('.bar-item');
    const $btnRestart = $statistics.find('#btnRestart');
    const $btnLogout = $statistics.find('#btnLogout');
    const $attempts = $statistics.find('#attempts');
    const $guessed = $statistics.find('#guessed');
    const $gameTime = $statistics.find('#timer');
    const $bestScore = $statistics.find('#bestScore');

    statisticsService.retrievedUser.subscribe((user) => $btnRestart.text('Restart ' + user));
    statisticsService.madeAttempt.subscribe((attemptsNo) => $attempts.text(attemptsNo));
    statisticsService.guessedHero.subscribe((guessedNo) => $guessed.text(guessedNo));
    statisticsService.changedTime.subscribe((currentTime) => $gameTime.text(currentTime));
    statisticsService.changedBestScore.subscribe((bestScore) => $bestScore.text(bestScore));

    $btnRestart.on('click', () => statisticsService.restartGame());
    $btnLogout.on('click', () => statisticsService.logoutUser());
    $bestScore.text(statisticsService.getBestScore());
};

