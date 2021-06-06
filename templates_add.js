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
        var hClr = getShiftedRGB(20, clr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'white',
            hover: hClr,
            select: getShiftedRGB(50, clr),
            hoverSelect: getShiftedRGB(70, clr),
            nowplaying: '#00d2ff !important',
            iconsHover: hClr,
            textHover: 'rgb(0, 255, 255)'
        }, div.parentElement.controlClass.uniqueID);
    } else {
        var hClr = getShiftedRGB(-20, clr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'black',
            hover: hClr,
            select: getShiftedRGB(-50, clr),
            hoverSelect: getShiftedRGB(-70, clr),
            nowplaying: '#0039ff !important',
            iconsHover: hClr,
            textHover: 'rgb(0, 106, 255)'
        }, div.parentElement.controlClass.uniqueID);
    }
};