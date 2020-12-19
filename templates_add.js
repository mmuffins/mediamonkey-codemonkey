window.templates.findLVStyleColorTypes = function () {
    selectedStyle = 'background';
    hoverStyle = 'background';
    tbHoverStyle = 'background';
};

window.templates.setLVPopupStyles = function (img, div) {
    templates.findLVStyleColorTypes();
    var LV = div.parentListView;
    var clr = colorThief.getColor(img);
    var backclr = 'rgb(' + clr[0] + ', ' + clr[1] + ', ' + clr[2] + ')';
    div.style.backgroundColor = backclr;
    LV.createPopupIndicator().style.fill = backclr;

    // change background color
    if ((clr[0] + clr[1] + clr[2]) / 3 < 128) {
        var hClr = getShiftedRGB(20, clr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'red',
            hover: hClr,
            select: getShiftedRGB(50, clr),
            nowplaying: 'rgb(255, 255, 150)',
            iconsHover: hClr,
            textHover: 'rgb(255, 215, 70)'
        }, div.parentElement.controlClass.uniqueID);
    } else {
        var hClr = getShiftedRGB(-20, clr);
        templates.setPopupListColors(div.controlClass.uniqueID, {
            text: 'black',
            hover: hClr,
            select: getShiftedRGB(-50, clr),
            nowplaying: 'rgb(128, 128, 0)',
            iconsHover: hClr,
            textHover: 'rgb(90, 90, 0)'
        }, div.parentElement.controlClass.uniqueID);
    }
};