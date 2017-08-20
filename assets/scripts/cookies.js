/**
 * Created by piotrek on 2017-07-18.
 * Edited by wojtrawi on 2017-07-21.
 */
// If cookie is empty
if (!document.cookie.match(/entryDate/)) {
    // Make container for cookie message
    var container = document.createElement('div');
    container.setAttribute('id', 'cookie');
    container.innerHTML = '<h6 class="cookie-alert">Me not take cookies, me eat the cookies.</h6>' +
        '<img src="assets/images/cookie-monster.png" alt="cookie-monster" class="cookie-monster"/>' +
        '<p class="cookie-info">The cookies we use do not store personally identifiable information nor can they harm your computer. We want our website to be informative, personal, and as user friendly as possible and cookies help us to achieve that goal.</p>';
    // Make closing link
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    link.setAttribute('title', 'Zamknij');
    link.innerHTML = 'x';
    // Add click event listener to link
    link.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.removeChild(container);
        // Set cookie
        var entryDate = new Date();
        document.cookie = "entryDate" + "=" + entryDate;
    });
    // Add link to container and container to body
    container.appendChild(link);
    document.body.appendChild(container);

}