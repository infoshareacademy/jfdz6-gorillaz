$(document).ready(function () {
    const scrollDuration = 500;
    const showNavButtonThreshold = 20;

    let $navButton = $('#nav-button');
    let $window = $(window);

    function checkScrollPosition() {
        if ($window.scrollTop() > showNavButtonThreshold) {
            $navButton.show();
        } else {
            $navButton.hide();
        }
    }

    function moveToTop() {
        $('html, body').animate({scrollTop: 0}, scrollDuration);
    }

    $window.on('resize, scroll', checkScrollPosition);
    $navButton.click(moveToTop);

    checkScrollPosition();
});