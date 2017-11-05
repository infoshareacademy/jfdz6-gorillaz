$(document).ready(function () {
    function scaleReCaptcha() {
        const reCaptchaWidth = 304;
        const containerWidth = $('#contact').width();

        if (reCaptchaWidth > containerWidth) {
            const reCaptchaScale = containerWidth / reCaptchaWidth;

            $('.g-recaptcha').css({'transform': 'scale(' + reCaptchaScale + ')'});
        }
    }

    scaleReCaptcha();
    $(window).resize(scaleReCaptcha);
});

function enableBtnSendMessage() {
    $('#btn-send-message').attr("disabled", false).addClass('enabled');
}