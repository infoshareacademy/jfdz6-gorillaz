$(document).ready(function () {
    // Add initial greeting card
    var myCanvas = new fabric.Canvas('drawing-area', {
        backgroundColor: 'yellow'
    });
    myCanvas.setWidth($('.canvas-wrapper').width());
    myCanvas.setHeight(0.5 * myCanvas.getWidth());
    canvasContent('Happy Birthday!', 'We wish You\nall the best!', 'assets//images/cookie-monster.png');

    function canvasContent(header, text, imgPath) {
        var backgroundColor = myCanvas.backgroundColor;
        myCanvas.clear();
        myCanvas.backgroundColor = backgroundColor;
        // Add wishes header
        var wishesHeader = new fabric.Textbox(header, {
            width: 0.65 * myCanvas.getWidth(),
            left: 0.1 * myCanvas.getWidth(),
            top: 0.1 * myCanvas.getHeight(),
            fontSize: 0.12 * myCanvas.getHeight(),
            fontFamily: 'Century Gothic',
            textAlign: 'center'
        });
        myCanvas.add(wishesHeader);
        // Add wishes content
        var wishesText = new fabric.Textbox(text, {
            width: 0.65 * myCanvas.getWidth(),
            left: 0.1 * myCanvas.getWidth(),
            top: 0.5 * myCanvas.getHeight(),
            fontSize: 0.1 * myCanvas.getHeight(),
            fontFamily: 'Century Gothic',
            textAlign: 'center'
        });
        myCanvas.add(wishesText);
        // Add image
        var image;
        fabric.Image.fromURL(imgPath, function (img) {
            image = img;
            img.scaleToWidth(0.2 * myCanvas.getWidth());
            img.set({left: 0.75 * myCanvas.getWidth(), top: 0.1 * myCanvas.getHeight()});
            myCanvas.add(img);
        });
    }

    // Download greeting card
    function downloadCanvas() {
        this.href = myCanvas.toDataURL('image/png');
    }

    $('#download-canvas').click(downloadCanvas);

    // Change wishes
    function changeWishes(wishType) {
        switch (wishType) {
            case 'traditional':
                canvasContent('Happy Valentines Day!', 'Happy\nValentines Day!', 'assets//images/generator/heart.png');
                break;
            case 'funny':
                canvasContent('Have a great pizza day!', 'Happy\npizza day!', 'assets//images/generator/pizza-slice.png');
                break;
            case 'custom':
                canvasContent('Have a great celebration of your own!', 'Have a\n happy celebration!', 'assets//images/generator/sun.png');
                break;
        }
    }

    $('input[name="wishes-type"]').click(function () {
        changeWishes($(this).val());
    });

    // Change background color
    $('#background-color').change(function () {
        myCanvas.setBackgroundColor($(this).val());
        myCanvas.renderAll();
    });

    // Canvas resize
    function scaleCanvas(desiredWidth, actualWidth, canvas) {
        var scaleMultiplier = desiredWidth / actualWidth;
        var objects = canvas.getObjects();
        for (var i in objects) {
            objects[i].scaleX = objects[i].scaleX * scaleMultiplier;
            objects[i].scaleY = objects[i].scaleY * scaleMultiplier;
            objects[i].left = objects[i].left * scaleMultiplier;
            objects[i].top = objects[i].top * scaleMultiplier;
            objects[i].setCoords();
        }
        canvas.setWidth(desiredWidth);
        canvas.setHeight(0.5 * desiredWidth);
        canvas.renderAll();
        canvas.calcOffset();
    }

    $(window).resize(function () {
        var desiredWidth = $('.canvas-wrapper').width();
        var actualWidth = myCanvas.getWidth();

        if (actualWidth != desiredWidth) {
            scaleCanvas(desiredWidth, actualWidth, myCanvas);
        }
    });
});

