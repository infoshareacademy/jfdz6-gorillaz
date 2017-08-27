$(document).ready(function () {
    var $contactForm = $('#contactForm');
    var $submitBtn = $contactForm.find('button[type="submit"]');
    var $status = $contactForm.find('#status');

    $submitBtn.on('click', function(event){
        event.preventDefault();
        $status.show();
    });
});