$(document).ready(function () {
    const httpsService = HttpsService('https://white-frog-7647.getsandbox.com');
    const timerService = TimerService();
    const statisticsService = StatisticsService(httpsService, timerService);

    if (!localStorage.token) {
        const loginModalComponent = LoginModalComponent(httpsService, statisticsService, timerService);
    } else {
        httpsService.post('/users/verify', {token: localStorage.token})
            .then((userBestScore) => {
                statisticsService.changedBestScore.next(userBestScore.bestScore);
                statisticsService.retrievedUser.next(userBestScore.username);
                timerService.startTimer();
            });
    }

    const dashboardComponent = DashboardComponent(statisticsService);
    const boardComponent = BoardComponent(statisticsService);
    const succesModalComponent = SuccessModalComponent(httpsService, statisticsService);
});

