/**
 * Created by piotrkramarz on 06.08.17.
 */
// When the user scrolls down 20px from the top of the document, show the button

$(document).ready(function () {

    // Monitor scroll position
    checkScrollPosition();
    $(window).on('resize, scroll', checkScrollPosition);

    // Move to page top
    $("#nav-button").click(moveToTop);

    function checkScrollPosition() {
        if ($('body').scrollTop() > 20) {
            $("#nav-button").show();
        } else {
            $("#nav-button").hide();
        }
    }

    function moveToTop() {
        $('body').scrollTop(0);
    }
});
