let TimerService = function () {
    let currentTime = 0;
    let interval = null;

    let changedCurrentTime = Observable();

    function startTimer() {
        changedCurrentTime.next(getFormattedCurrentTime());

        interval = setInterval(() => {
            currentTime++;
            changedCurrentTime.next(getFormattedCurrentTime());
        }, 1000);
    }

    function restartTimer() {
        stopTimer();
        currentTime = 0;
        startTimer();
    }

    function stopTimer() {
        clearInterval(interval);
    }

    function getCurrentTime() {
        return currentTime;
    }

    function getFormattedCurrentTime() {
        let seconds = Math.floor(currentTime % 60);
        return `${Math.floor(currentTime / 60)} : ${(seconds > 9) ? seconds : '0' + seconds}`;
    }

    return {
        changedCurrentTime: changedCurrentTime,
        startTimer: startTimer,
        restartTimer: restartTimer,
        stopTimer: stopTimer,
        getCurrentTime: getCurrentTime
    }
};