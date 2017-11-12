let LoginModalComponent = function (httpsService, statisticsService, timerService) {
    const $modalLogin = $('#modal-login');
    const $username = $modalLogin.find('#username');
    const $password = $modalLogin.find('#password');
    const $topScores = $modalLogin.find('#topScores');
    const $btnSignIn = $modalLogin.find('#btn-sign-in');
    const $btnSignUp = $modalLogin.find('#btn-sign-up');

    const showErrorThreshold = 100;
    const hideErrorThreshold = 100;

    function startGame(userData) {
        localStorage.token = userData.token;
        statisticsService.setBestScore(userData.bestScore);
        statisticsService.retrievedUser.next(userData.username);
        statisticsService.restartGame();
        statisticsService.loggedoutUser.subscribe(reloadLoginModal);

        $modalLogin.modal('hide');
    }

    function showErrorMessage(errorMessage) {
        alert(errorMessage.error);
    }

    function signIn() {
        if ($username.val().length === 0 || $password.val().length === 0) {
            return;
        } else {
            httpsService.post('/users/login', getUserObject()).then(startGame).catch(showErrorMessage);
        }
    }

    function signUp() {
        let isInputCorrect = true;

        if (!isWordLengthCorrect($username)) {
            $username.parent().parent().find('.modal__text--error').show(showErrorThreshold);
            isInputCorrect = false;
        } else {
            $username.siblings('.modal__text--error').hide(hideErrorThreshold);
        }

        if (!isWordLengthCorrect($password) || !isWordWithoutSpecialCharacters($password)) {
            $password.parent().parent().find('.modal__text--error').show(showErrorThreshold);
            isInputCorrect = false;
        } else {
            $password.siblings('.modal__text--errorr').hide(hideErrorThreshold);
        }

        if (isInputCorrect) {
            httpsService.post('/users', getUserObject()).then(startGame).catch(showErrorMessage);
        }
    }

    function isWordLengthCorrect(word) {
        return word.val().length > 4 && word.length < 8;
    }

    function isWordWithoutSpecialCharacters(word) {
        return !/[!@#$%^&*]/.test(word.val());
    }

    function getTopScores() {
        httpsService.get('/users/top3').then(renderTopScores);
    }

    function getUserObject() {
        return {username: $username.val(), password: $password.val()};
    }

    function renderTopScores(users) {
        let topScores = '| ';

        for (let user of users) {
            topScores += `${user.username}: ${user.bestScore} | `;
        }

        $topScores.text(topScores);
    }

    function reloadLoginModal() {
        $username.val('');
        $password.val('');

        $username.siblings('.modal__text--error').hide(hideErrorThreshold);
        $password.siblings('.modal__text--error').hide(hideErrorThreshold);

        getTopScores();
        $modalLogin.modal();
    }

    $btnSignIn.on('click', signIn);
    $btnSignUp.on('click', signUp);

    function authenticateUser() {
        if (!localStorage.token) {
            getTopScores();
            $modalLogin.modal();
        } else {
            httpsService.post('/users/verify', {token: localStorage.token})
                .then((userBestScore) => {
                    statisticsService.setBestScore(userBestScore.bestScore);
                    statisticsService.retrievedUser.next(userBestScore.username);
                    statisticsService.loggedoutUser.subscribe(reloadLoginModal);
                    statisticsService.restartGame();
                });
        }
    }

    return {
        authenticateUser: authenticateUser
    }
};


