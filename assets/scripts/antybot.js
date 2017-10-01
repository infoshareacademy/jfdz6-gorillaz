document.getElementById('buttonOnBlock').disabled = true;

function enableBtn(){
    document.getElementById('buttonOnBlock').disabled = false;
}

function scaleCaptcha(elementWidth) {

    var reCaptchaWidth = 304;
    var containerWidth = $('.container').width();


    if(reCaptchaWidth > containerWidth) {

        var captchaScale = containerWidth / reCaptchaWidth;

        $('.g-recaptcha').css({
            'transform':'scale('+captchaScale+')'
        });
    }
}

$(function() {

    scaleCaptcha();

    $(window).resize( $.throttle( 100, scaleCaptcha ) );

});