$(document).ready(function () {
    var $window = $(window);
    var $numbersRow = $('#numbers');
    var $counters = $numbersRow.find('.counter');
    var numbersShown = false;

    function isInViewport(element) {
        var boundingBox = element[0].getBoundingClientRect();

        return (
            boundingBox.top >= 0 &&
            boundingBox.left >= 0 &&
            boundingBox.bottom <= $window.height() &&
            boundingBox.right <= $window.width()
        );
    }

    function showNumbers() {
        $counters.each(function () {
            var $counter =  $(this);
            $counter.css('visibility', 'visible');
            $counter.prop('targetValue', 0).animate({
                targetValue: $counter.text()
            }, {
                duration: 2000,
                step: function (now) {
                    $counter.text(Math.ceil(now));
                }
            });
        });
        numbersShown = true;
    }

    $window.scroll(function () {
        if (!numbersShown && isInViewport($numbersRow)) showNumbers();
    });

    if (!numbersShown && isInViewport($numbersRow)) showNumbers();
});