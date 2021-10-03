window.configInfo = {
	load: function (pnlDiv, addon) {
        pnlDiv.innerHTML += this.getPickerHtml("warning 2 Color", "warning2Color", "#007acc")
        pnlDiv.innerHTML += this.getPickerHtml("selected Color", "selectedColor", "#264f78")
        pnlDiv.innerHTML += this.getPickerHtml("warning 1 Color", "warningColor", "#1c97ea")
        initializeControls(pnlDiv);

        var UI = getAllUIElements(pnlDiv);
        
        var pickerInt = 1;
        this.initColorPicker(UI, "warning2Color", "#007acc", pickerInt++);
        this.initColorPicker(UI, "selectedColor", "#264f78", pickerInt++);
        this.initColorPicker(UI, "warningColor", "#1c97ea", pickerInt++);
	},

	save: function(pnlDiv, addon) {
        
        var UI = getAllUIElements(pnlDiv);
        this.saveColor(UI, addon, "selectedColor", "#FFFFFF");
        this.saveColor(UI, addon, "warningColor", "#FFFFFF");
        this.saveColor(UI, addon, "warning2Color", "#FFFFFF");
        // var warningColor = UI.warningColorPicker.controlClass.value;
        // app.setValue('CodeMonkey_warningColor', warningColor);

        // var warning2Color = UI.warning2ColorPicker.controlClass.value;
        // app.setValue('CodeMonkey_warning2Color', warning2Color);

        // var selectedColor = UI.selectedColorPicker.controlClass.value;
        // app.setValue('CodeMonkey_selectedColor', selectedColor);
        
        // if (UI.warningColorPicker.controlClass.isSimilarTo('#FFFFFF')) {
        //     messageDlg(_('The color combination you chose would result in text being unreadable. Please choose a different color combination.'), 
        //     'Error',
        //     ['btnOK'], 
        //     {defaultButton: 'btnOK'},
        //     undefined);
        // }
        // else {
        //     setLessValues({'warningColor': warningColor}, addon.ext_id);
        //     setLessValues({'warning2Color': warning2Color}, addon.ext_id);
        //     setLessValues({'selectedColor': selectedColor}, addon.ext_id);
        // }
       // setLessValues({'warningColor': '#FFFFFF'}, addon.ext_id);
        //setLessValues({'warning2Color': '#FFFFFF'}, addon.ext_id);
        //setLessValues({'selectedColor': '#FFFFFF'}, addon.ext_id);
	},

    initColorPicker: function (UI, colorName, defaultValue, pickerInt){
        var userColor = app.getValue(`CodeMonkey_${colorName}`, defaultValue);

        var pickerName = `${colorName}Picker`;
        UI[pickerName].controlClass.value = userColor;

        localListen(UI[`btnReset${colorName}`], 'click', () => {
            UI[pickerName].controlClass.value = defaultValue;
        });

        window[`picker${pickerInt}`] = UI[pickerName];
    },

    saveColor: function(UI, addon, colorName, similarColor){
        var userColor = UI[`${colorName}Picker`].controlClass.value;

        if (UI[`${colorName}Picker`].controlClass.isSimilarTo(similarColor)) {
            messageDlg(_('The color combination you chose would result in text being unreadable. Please choose a different color combination.'), 
            'Error',
            ['btnOK'], 
            {defaultButton: 'btnOK'},
            undefined);
        }
        else {
            app.setValue(`CodeMonkey_${colorName}`, userColor);

            var colorObj = {};
            colorObj[colorName] = userColor;
            setLessValues(colorObj, addon.ext_id);
        }
    },

    getPickerHtml: function(displayName, colorName, defaultValue){
        return `
        <div class="padding flex row">
            <label>${displayName}:</label>
        </div>
        <div class="paddingLeft">
            <div data-id="${colorName}Picker" data-control-class="ColorPicker" data-init-params="{size: 200, value: '${defaultValue}'}"></div>
        </div>
        <div class="padding">
            <div data-id="btnReset${colorName}" data-control-class="Button">Reset changes</div>
        </div>
        `;
    }


}