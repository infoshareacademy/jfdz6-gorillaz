$(document).ready(function () {

    // Flag is animation has been played
    var numbersShown = false;
    var $numbersRow = $('#numbers');

    // Show numbers if refreshed on focus
    if (!numbersShown && isInViewport($numbersRow)) showNumbers();

    // Show numbers if hidden and in viewport area
    $(window).scroll(function () {
        if (!numbersShown && isInViewport($numbersRow)) showNumbers();
    });

    function isInViewport(element) {

        // Current distance from origin
        var boundingBox = element[0].getBoundingClientRect();

        // Check if entire element is in viewport
        return (
            boundingBox.top >= 0 &&
            boundingBox.left >= 0 &&
            boundingBox.bottom <= $(window).height() &&
            boundingBox.right <= $(window).width()
        );
    }

    function showNumbers() {

        $('.counter').each(function () {
            $(this).css('visibility', 'visible');
            $(this).prop('targetValue', 0).animate({
                targetValue: $(this).text()
            }, {
                duration: 2000,
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
        numbersShown = true;
    }
});