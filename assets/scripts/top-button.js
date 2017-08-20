/**
 * Created by piotrkramarz on 06.08.17.
 */
// When the user scrolls down 20px from the top of the document, show the button

$(document).ready(function () {
    var $navButton = $("#nav-button");
    var scrollDuration = 800;
    var showNavButtonThreshold = 20;

    $(window).on('resize, scroll', checkScrollPosition);

    function checkScrollPosition() {
        if ($(window).scrollTop() > showNavButtonThreshold) {
            $navButton.show();
        } else {
            $navButton.hide();
        }
    }

    function moveToTop() {
        $('html, body').animate({scrollTop:0}, scrollDuration);
    }

    $navButton.click(moveToTop);
    checkScrollPosition();
});
