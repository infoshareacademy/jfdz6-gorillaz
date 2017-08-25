$(document).ready(function () {
    if (!document.cookie.match(/entryDate/)) {
        var $cookieBar = $('<div id="cookie"></div>');
        var $closeBtn = $('<a href="#">x</a>');

        var cookieHeader = 'Me not take cookies, me eat the cookies.';
        var cookieInfo = 'The cookies we use do not store personally identifiable information nor can they harm your computer.' +
            'We want our website to be informative, personal, and as user friendly as possible and cookies help us to achieve that goal.' +
            'By using our website you consent to all cookies in accordance with our Cookie Policy.';

        $cookieBar.append('<h6 class="cookie-alert">' + cookieHeader + '</h6>');
        $cookieBar.append('<img src="assets/images/cookie-monster.png" alt="cookie-monster" class="cookie-monster"/>');
        $cookieBar.append('<p class="cookie-info">' + cookieInfo + '</p>');
        $cookieBar.append($closeBtn);

        $closeBtn.on('click', function (event) {
            event.preventDefault();
            $cookieBar.remove();
            var entryDate = new Date();
            document.cookie = "entryDate" + "=" + entryDate;
        });

        $('body').append($cookieBar);
    }
});