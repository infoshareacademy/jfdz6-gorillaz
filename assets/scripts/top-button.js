/**
 * Created by piotrkramarz on 06.08.17.
 */
// When the user scrolls down 20px from the top of the document, show the button

$(document).ready(function () {
    $("#my-Btn").click(topFunction)
    {

        window.onscroll = function () {
            scrollFunction()
        };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("my-Btn").style.display = "block";
            } else {
                document.getElementById("my-Btn").style.display = "none";
            }
        }
    }
});
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}