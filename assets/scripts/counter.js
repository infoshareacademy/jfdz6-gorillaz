$(document).ready(function () {
    const loadingDuration = 1000;
    var numbersShown = false;

    var $window = $(window);
    var $numbersRow = $('#numbers');
    var $counters = $numbersRow.find('.counter');

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
            var $counter = $(this);
            $counter.css('visibility', 'visible');
            $counter.prop('targetValue', 0).animate({
                targetValue: $counter.text()
            }, {
                duration: loadingDuration,
                step: function (now) {
                    $counter.text(Math.ceil(now));
                }
            });
        });
        numbersShown = true;
    }

    $window.on('scroll', function () {
        if (!numbersShown && isInViewport($numbersRow)) showNumbers();
    });

    if (!numbersShown && isInViewport($numbersRow)) showNumbers();
});