/**
 * Created by piotrek on 2017-08-06.
 */

$('.count').each(function () {
    var $this = $(this);
    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
            $this.text(Math.ceil(this.Counter));
        }
    });
});