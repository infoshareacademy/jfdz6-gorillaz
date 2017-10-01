let LoginModalComponent = function (httpsService, statisticsService, timerService) {
    const $loginModal = $('#loginModal');
    const $username = $loginModal.find('#username');
    const $password = $loginModal.find('#password');
    const $topScores = $loginModal.find('#topScores');
    const $btnSignIn = $loginModal.find('#btnSignIn');
    const $btnSignUp = $loginModal.find('#btnSignUp');

    function startGame(userData) {
        localStorage.token = userData.token;
        statisticsService.changedBestScore.next(userData.bestScore);
        statisticsService.retrievedUser.next(userData.username);

        timerService.startTimer();
        $loginModal.modal('hide');
    }

    function showErrorMessage(errorMessage) {
        alert(errorMessage.error);
    }

    function signIn() {
        httpsService.post('/users/login', getUserObject()).then(startGame).catch(showErrorMessage);
    }

    function signUp() {
        httpsService.post('/users', getUserObject()).then(startGame).catch(showErrorMessage);
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


    // dodać warunki && dla dlugosci znaków i bez znaków specjalnych

    function validate() {
        return $username.val().length > 3 && $username.val().length < 11 && $password.val().length > 3 && $password.val().length < 11 && $username.add($password).filter_input({regex:'[a-zA-Z0-9_]'});
    }

    $btnSignIn.on('click', signIn);
    $btnSignUp.on('click', signUp);

    $("#hidden-paragraph").hide();

    $username.on('change', function () {
        if(validate()) {
            $btnSignIn.add($btnSignUp).attr('disabled', false);
            // $btnSignIn.attr('disabled', false);
            // $btnSignUp.attr('disabled', false);

        } else {
            $btnSignIn.add($btnSignUp).attr('disabled', true);
            // $btnSignIn.attr('disabled', true);
            // $btnSignUp.attr('disabled', true);
        }
    });

    $password.on('change', function () {
        if(validate()) {
            $btnSignIn.add($btnSignUp).attr('disabled', false);
            // $btnSignUp.attr('disabled', false);
            //wyedytować jak powy żej
        } else {
            $btnSignIn.add($btnSignUp).attr('disabled', true);
            // $btnSignIn.attr('disabled', true);
            // $btnSignUp.attr('disabled', true);
            //powinno pokazać paragraf z ostrzeżeniem
            $("#hidden-paragraph").show( 100 ).css("color", "red");
        }
    });

    getTopScores();
    $loginModal.modal();
};