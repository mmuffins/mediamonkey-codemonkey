window.configInfo = {
    customizableColors: [
        {
            Name: 'highlightColor',
            DisplayName: 'Highlight 1 Color',
            DefaultValue: '#1c97ea',
            InvalidSimilarColor: '#dcdcdc'
        },
        {
            Name: 'highlight2Color',
            DisplayName: 'Highlight 2 Color',
            DefaultValue: '#007acc',
            InvalidSimilarColor: '#dcdcdc'
        },
        {
            Name: 'selectedColor',
            DisplayName: 'selected Color',
            DefaultValue: '#264f78',
            InvalidSimilarColor: '#dcdcdc'
        },
    ],

	load: function (pnlDiv, addon) {
        this.customizableColors.forEach(color =>{
            pnlDiv.innerHTML += this.getPickerHtml(color.DisplayName, color.Name, color.DefaultValue);
        });

        initializeControls(pnlDiv);
        var UI = getAllUIElements(pnlDiv);
        
        var pickerInt = 1;
        this.customizableColors.forEach(color =>{
            this.initColorPicker(UI, color.Name, color.DefaultValue, pickerInt++);
        });
	},

	save: function(pnlDiv, addon) {
        var UI = getAllUIElements(pnlDiv);

        this.customizableColors.forEach(color =>{
            this.saveColor(UI, addon, color.Name, color.DisplayName, color.InvalidSimilarColor);
        });
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

    saveColor: function(UI, addon, colorName, displayName, invalidSimilarColor){
        var userColor = UI[`${colorName}Picker`].controlClass.value;

        if (UI[`${colorName}Picker`].controlClass.isSimilarTo(invalidSimilarColor)) {
            messageDlg(_(`The value you chose for color ${displayName} would result in text being unreadable. Please choose a different value.`), 
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
    },
}
