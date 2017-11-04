$(document).ready(function() {

    $(window).scroll(function (event) {
        var y_pos = $(this).scrollTop();
        var current_title = document.title;

        $('.section-header').each(function() {
            if (y_pos > $(this).offset().top -85) {
                current_title = $(this).text() + " | Wish Generator";
            }
        });

        document.title = current_title;
    });
});