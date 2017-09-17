$(document).ready(function () {
    if (!document.cookie.match(/entryDate/)) {
        const $cookieBar = $('<div id="cookie"></div>');
        const $closeBtn = $('<a href="#">x</a>');

        const cookieHeader = `Me not take cookies, me eat the cookies.`;
        const cookieInfo = `The cookies we use do not store personally identifiable information nor can they harm your computer.
            We want our website to be informative, personal, and as user friendly as possible and cookies help us to achieve that goal.
            By using our website you consent to all cookies in accordance with our Cookie Policy.`;

        $cookieBar.append('<h6 class="cookie-alert">' + cookieHeader + '</h6>');
        $cookieBar.append('<img src="assets/images/cookie-monster.png" alt="cookie-monster" class="cookie-monster"/>');
        $cookieBar.append('<p class="cookie-info">' + cookieInfo + '</p>');
        $cookieBar.append($closeBtn);

        $closeBtn.on('click', function (event) {
            const entryDate = new Date();

            event.preventDefault();
            $cookieBar.remove();
            document.cookie = `entryDate=${entryDate}`;
        });

        $('body').append($cookieBar);
    }
});