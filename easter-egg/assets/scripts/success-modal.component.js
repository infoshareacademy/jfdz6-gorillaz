let SuccessModalComponent = function (httpsService, statisticsService) {
    const $successModal = $('#successModal');
    let newBestScore = '';

    function saveBestScore() {
        httpsService.put('/users/bestScore', {token: localStorage.token, bestScore: newBestScore})
            .then(showSuccessModal).catch(showErrorMessage);
    }

    function showSuccessModal() {
        $successModal.find('.game-score').text(newBestScore);
        $successModal.modal();
    }

    function showErrorMessage(errorMessage) {
        alert(errorMessage.error);
    }

    statisticsService.finishedGame.subscribe((bestScore) => {
        newBestScore = bestScore;
        saveBestScore()
    });
};