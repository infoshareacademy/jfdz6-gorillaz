let LoginModalComponent = function (httpsService, statisticsService, timerService) {
    const $loginModal = $('#loginModal');
    const $username = $loginModal.find('#username');
    const $password = $loginModal.find('#password');
    const $topScores = $loginModal.find('#topScores');
    const $btnSignIn = $loginModal.find('#btnSignIn');
    const $btnSignUp = $loginModal.find('#btnSignUp');

    function startGame(userData) {
        localStorage.token = userData.token;
        statisticsService.setBestScore(userData.bestScore);
        statisticsService.retrievedUser.next(userData.username);
        statisticsService.loggedoutUser.subscribe(reloadLoginModal);

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

    function reloadLoginModal() {
        $username.val('');
        $password.val('');

        getTopScores();
        $loginModal.modal();
    }

    $btnSignIn.on('click', signIn);
    $btnSignUp.on('click', signUp);

    // getTopScores();
    // $loginModal.modal();

    if (!localStorage.token) {
        getTopScores();
        $loginModal.modal();
    } else {
        httpsService.post('/users/verify', {token: localStorage.token})
            .then((userBestScore) => {
                statisticsService.setBestScore(userBestScore.bestScore);
                statisticsService.retrievedUser.next(userBestScore.username);
                statisticsService.loggedoutUser.subscribe(reloadLoginModal);
                timerService.startTimer();
            });
    }

    function validate(element) {
        var $element = $(element);
        return $element.val().length > 3 && $element.val().length < 11;
    }

    $("#hidden-paragraph").hide();

    $username.on('change keyup', function () {
        this.value = this.value.replace(/[^a-z0-9]/gi, '');
        if(validate(this) && validate($password)) {
            $btnSignIn.add($btnSignUp).attr('disabled', false);
            $("#hidden-paragraph").hide();
        } else if( $username.val().length > 0 && $password.val().length > 0 ){
            $btnSignIn.add($btnSignUp).attr('disabled', true);
            $("#hidden-paragraph").show( 100 ).css("color", "red");

        }
    });

    $password.on('change keyup', function () {
        this.value = this.value.replace(/[^a-z0-9]/gi, '');
        if(validate(this) && validate($username)) {
            $btnSignIn.add($btnSignUp).attr('disabled', false);
            $("#hidden-paragraph").hide();

        } else if( $username.val().length > 0 && $password.val().length > 0 ){
            $btnSignIn.add($btnSignUp).attr('disabled', true);
            $("#hidden-paragraph").show( 100 ).css("color", "red");
        }
    });
};