$(document).ready(function () {
    const httpsService = HttpsService('https://white-frog-7647.getsandbox.com');
    const timerService = TimerService();
    const statisticsService = StatisticsService(httpsService, timerService);
    const loginModalComponent = LoginModalComponent(httpsService, statisticsService, timerService);
    const instructionsModalComponent = InstructionsModalComponent();
    const dashboardComponent = DashboardComponent(statisticsService);
    const boardComponent = BoardComponent(statisticsService);
    const succesModalComponent = SuccessModalComponent(httpsService, statisticsService);
});

