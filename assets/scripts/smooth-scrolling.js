$(document).ready(function () {
    const scrollTime = 500;

    var $navItem = $('.navbar a');
    var $heroBtn = $('.hero-content').find('a');
    var $body = $('html, body');

    function scrollSmoothly(event) {
        if (this.hash !== "") {
            var hash = this.hash;
            var $section = $(hash);

            event.preventDefault();
            $body.animate({
                scrollTop: $section.offset().top
            }, scrollTime, function () {
                window.location.hash = hash;
            });
        }
    }

    $navItem.on('click', scrollSmoothly);
    $heroBtn.on('click', scrollSmoothly);
});