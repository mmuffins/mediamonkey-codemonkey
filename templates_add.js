window.templates.findLVStyleColorTypes = function () {
    selectedStyle = 'background';
    hoverStyle = 'background';
    tbHoverStyle = 'background';
};

//JL: Save colors in memory so that repeatedly-opened albums do not need to repeatedly calculate colors.
var cachedColors = {};

window.templates.setLVPopupStyles = function (img, div) {
    templates.findLVStyleColorTypes();
    var LV = div.parentListView;
    
    var clr;
    var path = img.getAttribute('src');
    if (cachedColors[path]) {
        clr = cachedColors[path];
        console.log(cachedColors);
    }
    else {
        clr = colorThief.getColor(img);
        cachedColors[path] = clr;
    }
    
    var backclr = 'rgb(' + clr[0] + ', ' + clr[1] + ', ' + clr[2] + ')';
    div.style.backgroundColor = backclr;
    LV.createPopupIndicator().style.fill = backclr;

	var nowPlayingClr = ''; //nowPlaying color is !important by default in skin
	if (clr[0] > 110 && (clr[1] + clr[2]) / 2 < clr[0] * 0.75) // r > 110 and avg of g&b < 0.75*r
		nowPlayingClr = 'rgb(214, 227, 255)!important'; // if the background color is red, set the now playing color to a contrasting color (b/c pink blends in with it)

    // change background color	
    if ((clr[0] + clr[1] + clr[2]) / 3 < 128) {
        var hClr = getShiftedRGB(20, clr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'white',
            hover: hClr,
            select: getShiftedRGB(50, clr),
            hoverSelect: getShiftedRGB(70, clr),
            nowplaying: nowPlayingClr,
            iconsHover: hClr,
            textHover: 'rgb(255, 215, 70)'
        }, div.parentElement.controlClass.uniqueID);
    } else {
        var hClr = getShiftedRGB(-20, clr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'black',
            hover: hClr,
            select: getShiftedRGB(-50, clr),
            hoverSelect: getShiftedRGB(-70, clr),
            nowplaying: nowPlayingClr,
            iconsHover: hClr,
            textHover: 'rgb(90, 90, 0)'
        }, div.parentElement.controlClass.uniqueID);
    }
};