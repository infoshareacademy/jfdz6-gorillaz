var runShowNumbers;
$(document).ready(function () {
    const loadingDuration = 1000;
    let areNumbersVisible = false;

    const $window = $(window);
    const $numbersRow = $('#numbers');
    const $counters = $numbersRow.find('.counter');

    function isInViewport(element) {
        const boundingBox = element[0].getBoundingClientRect();

        return (
            boundingBox.top >= 0 &&
            boundingBox.left >= 0 &&
            boundingBox.bottom <= $window.height() &&
            boundingBox.right <= $window.width()
        );
    }

    function showNumbers() {
        $counters.each(function () {
            let $counter = $(this);
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
        areNumbersVisible = true;
    }

    $window.on('load', function () {
        if (!areNumbersVisible && isInViewport($numbersRow)) showNumbers();
    });

    if (!areNumbersVisible && isInViewport($numbersRow)) showNumbers();

    runShowNumbers = function(){ showNumbers(); }
});