$(document).ready(function () {
    var myCanvas = new fabric.Canvas('drawing-area', {
        backgroundColor: 'yellow'
    });

    var $section = $('#generator');
    var $wishType = $section.find('input[name="wishes-type"]');
    var $bgcColor = $section.find('#background-color');
    var $downloadBtn = $section.find('#download-canvas');
    var $window = $(window);

    function changeWishes(wishType) {
        switch (wishType) {
            case 'traditional':
                changeContent('Happy Valentines Day!', 'Happy\nValentines Day!', 'assets//images/generator/heart.png');
                break;
            case 'funny':
                changeContent('Have a great pizza day!', 'Happy\npizza day!', 'assets//images/generator/pizza-slice.png');
                break;
            case 'custom':
                changeContent('Have a great celebration of your own!', 'Have a\n happy celebration!', 'assets//images/generator/sun.png');
                break;
        }
    }

    function changeContent(header, text, imgPath) {
        var backgroundColor = myCanvas.backgroundColor;
        myCanvas.clear();
        myCanvas.backgroundColor = backgroundColor;

        var wishesHeader = new fabric.Textbox(header, {
            width: 0.65 * myCanvas.getWidth(),
            left: 0.1 * myCanvas.getWidth(),
            top: 0.1 * myCanvas.getHeight(),
            fontSize: 0.12 * myCanvas.getHeight(),
            fontFamily: 'Century Gothic',
            textAlign: 'center'
        });

        var wishesText = new fabric.Textbox(text, {
            width: 0.65 * myCanvas.getWidth(),
            left: 0.1 * myCanvas.getWidth(),
            top: 0.5 * myCanvas.getHeight(),
            fontSize: 0.1 * myCanvas.getHeight(),
            fontFamily: 'Century Gothic',
            textAlign: 'center'
        });

        myCanvas.add(wishesHeader);
        myCanvas.add(wishesText);

        var image;
        fabric.Image.fromURL(imgPath, function (img) {
            image = img;
            img.scaleToWidth(0.2 * myCanvas.getWidth());
            img.set({left: 0.75 * myCanvas.getWidth(), top: 0.1 * myCanvas.getHeight()});
            myCanvas.add(img);
        });
    }

    function scaleContent(desiredWidth, actualWidth, canvas) {
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

    function downloadContent() {
        this.href = myCanvas.toDataURL('image/png');
    }

    $wishType.click(function () {
        changeWishes($(this).val());
    });

    $bgcColor.change(function () {
        myCanvas.setBackgroundColor($(this).val());
        myCanvas.renderAll();
    });

    $downloadBtn.click(downloadContent);

    $window.resize(function () {
        var desiredWidth = $('.canvas-wrapper').width();
        var actualWidth = myCanvas.getWidth();

        if (actualWidth != desiredWidth) {
            scaleContent(desiredWidth, actualWidth, myCanvas);
        }
    });

    myCanvas.setWidth($('.canvas-wrapper').width());
    myCanvas.setHeight(0.5 * myCanvas.getWidth());
    changeContent('Happy Birthday!', 'We wish You\nall the best!', 'assets//images/cookie-monster.png');
});

