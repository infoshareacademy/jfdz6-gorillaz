/**
 * Created by piotrek on 2017-07-18.
 * Edited by wojtrawi on 2017-07-21.
 */
// If cookie is empty
if (!document.cookie) {
    // Make container for cookie message
    var container = document.createElement('div');
    container.setAttribute('id', 'cookieinfo');
    container.setAttribute('class', 'cookie-alert');
    container.innerHTML = '<h6>Ta strona wykorzystuje pliki cookie</h6><p>Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu. Jeżeli wyrażasz zgodę na zapisywanie informacji zawartej w cookies kliknij na x w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody, ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.</p>';
    // Make closing link
    var link = document.createElement('a');
    link.setAttribute('href', '#');
    link.setAttribute('title', 'Zamknij');
    link.innerHTML = 'x';
    // Add click event listener to link
    link.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.removeChild(container);
    });
    // Add link to container and container to body
    container.appendChild(link);
    document.body.appendChild(container);
    // Set cookie
    var entryDate = new Date();
    document.cookie = "entryDate" + "=" + entryDate;
}