let SuccessModalComponent = function (httpsService, statisticsService) {
    const $successModal = $('#modal-success');
    const $gameScore = $successModal.find('#game-score');
    const $btnRestart = $successModal.find('#btn-restart');
    const $btnLogout = $successModal.find('#btn-log-out');
    let newScore = '';

    function saveBestScore() {
        httpsService.put('/users/bestScore', {token: localStorage.token, bestScore: newScore})
            .then(showSuccessModal).catch(showErrorMessage);
    }

    function showSuccessModal() {
        $successModal.modal();
        animateScore();
    }

    function animateScore() {
        const loadingDuration = 2000;

        $gameScore.text(newScore);

        $gameScore.prop('targetValue', 0).animate({
            targetValue: $gameScore.text()
        }, {
            duration: loadingDuration,
            step: function (now) {
                $gameScore.text(Math.ceil(now));
            }
        });
    }

    function showErrorMessage(errorMessage) {
        alert(errorMessage.error);
    }

    statisticsService.finishedGame.subscribe((gameResult) => {
        newScore = gameResult.actualScore;

        if (gameResult.isNewBestScore) {
            saveBestScore();
        } else {
            showSuccessModal();
        }
    });

    $btnRestart.on('click', () => {
        statisticsService.restartGame();
        $successModal.modal('hide');
    });
    $btnLogout.on('click', () => {
        statisticsService.logoutUser();
        $successModal.modal('hide');
    });
};