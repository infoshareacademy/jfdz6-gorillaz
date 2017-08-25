$(document).ready(function () {

    // cache DOM
    var $contactForm = $('#contactForm');
    var $submitBtn = $contactForm.find('button[type="submit"]');
    var $status = $contactForm.find('#status');

    // bind events
    $submitBtn.on('click', function(event){
        event.preventDefault();
        $status.show();
    });
});