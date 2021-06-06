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
        // console.log(cachedColors);
    }
    else {
        clr = colorThief.getColor(img);
        cachedColors[path] = clr;
    }
    
    var backclr = 'rgb(' + clr[0] + ', ' + clr[1] + ', ' + clr[2] + ')';
    div.style.backgroundColor = backclr;
    LV.createPopupIndicator().style.fill = backclr;

    // change background color	
    if(Math.round(((parseInt(clr[0]) * 299) + (parseInt(clr[1]) * 587) + (parseInt(clr[2]) * 114)) / 1000) <= 128) {
        var nowplayingClr = [0, 210, 255]
        var hClr = getShiftedRGB(-20, nowplayingClr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'white',
            hover: hClr,
            select: getShiftedRGB(-50, nowplayingClr),
            hoverSelect: getShiftedRGB(-70, nowplayingClr),
            nowplaying: 'rgb(' + nowplayingClr[0] + ', ' + nowplayingClr[1] + ', ' + nowplayingClr[2] + ') !important',
            iconsHover: hClr,
            textHover: 'rgb(0, 255, 255)'
        }, div.parentElement.controlClass.uniqueID);
    } else {
        var nowplayingClr = [0, 9, 228]
        var hClr = getShiftedRGB(60, nowplayingClr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'black',
            hover: hClr,
            select: getShiftedRGB(80, nowplayingClr),
            hoverSelect: getShiftedRGB(100, nowplayingClr),
            nowplaying: 'rgb(' + nowplayingClr[0] + ', ' + nowplayingClr[1] + ', ' + nowplayingClr[2] + ') !important',
            iconsHover: hClr,
            textHover: 'rgb(0, 106, 255)'
        }, div.parentElement.controlClass.uniqueID);
    }
};