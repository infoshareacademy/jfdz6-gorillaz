$(document).ready(function () {
    const scrollTime = 500;

    const $selectedElements = $('.navbar a, .hero-content a');
    const $body = $('html, body');

    function scrollSmoothly(event) {
        if (this.hash !== '') {
            const hash = this.hash;
            const $section = $(hash);

            event.preventDefault();
            $body.animate({
                scrollTop: $section.offset().top
            }, scrollTime, function () {
                window.location.hash = hash;
            });
        }
    }

    $selectedElements.on('click', scrollSmoothly);
});