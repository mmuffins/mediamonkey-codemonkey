window.configInfo = {
    customizableColors: [
        {
            Name: 'highlightColor',
            DisplayName: 'Highlight color',
            DefaultValue: '#1c97ea',
            InvalidSimilarColor: '#dcdcdc'
        },
        {
            Name: 'highlight2Color',
            DisplayName: 'Secondary highlight color',
            DefaultValue: '#007acc',
            InvalidSimilarColor: '#dcdcdc'
        },
        {
            Name: 'selectedColor',
            DisplayName: 'Selection color',
            DefaultValue: '#264f78',
            InvalidSimilarColor: '#dcdcdc'
        },
    ],

    addon: null,
    UI: null,

	load: function (pnlDiv, addon) {
        this.addon = addon;
        var pickerContainer = qeid(pnlDiv, 'Colors')
        this.customizableColors.forEach(color =>{
            pickerContainer.innerHTML += this.getPickerHtml(color.DisplayName, color.Name, color.DefaultValue);
        });

        initializeControls(pickerContainer);
        this.UI = getAllUIElements(pnlDiv);
        
        this.customizableColors.forEach(color =>{
            this.initColorPicker(color.Name, color.DefaultValue);
        });
        this.UI = getAllUIElements(pnlDiv);

        this.UI.chbVs2019Tabs.controlClass.checked = app.getValue(`${addon.ext_id}_vs2019tabs`, false);
	},

	save: function(pnlDiv, addon) {
        this.UI = getAllUIElements(pnlDiv);

        this.customizableColors.forEach(color =>{
            this.saveColorPicker(color.Name, color.DisplayName, color.InvalidSimilarColor);
        });

        var vs2019Tabs = this.UI.chbVs2019Tabs.controlClass.checked;
        var tabColor;
        
        if(vs2019Tabs){
            tabColor = '@highlight2Color';
            app.setValue(`${addon.ext_id}_tabColor`, tabColor);
        } else {
            tabColor = '';
            app.removeValue(`${addon.ext_id}_tabColor`);
        }

        app.setValue(`${addon.ext_id}_vs2019Tabs`, vs2019Tabs);
        setLessValues({'tabColor': tabColor}, addon.ext_id);
	},

    initColorPicker: function (colorName, defaultValue){
        var userColor = app.getValue(`${this.addon.ext_id}_${colorName}`, defaultValue);

        var pickerName = `${colorName}Picker`;
        this.UI[pickerName].controlClass.value = userColor;

        localListen(this.UI[`btnReset${colorName}`], 'click', () => {
            this.UI[pickerName].controlClass.value = defaultValue;
        });
    },

    saveColorPicker: function(colorName, displayName, invalidSimilarColor){
        var userColor = this.UI[`${colorName}Picker`].controlClass.value;

        if (this.UI[`${colorName}Picker`].controlClass.isSimilarTo(invalidSimilarColor)) {
            messageDlg(_(`The value you chose for color ${displayName} would result in text being unreadable. Please choose a different value.`), 
            'Error',
            ['btnOK'], 
            {defaultButton: 'btnOK'},
            undefined);
        }
        else {
            app.setValue(`${this.addon.ext_id}_${colorName}`, userColor);

            var colorObj = {};
            colorObj[colorName] = userColor;
            setLessValues(colorObj, this.addon.ext_id);
        }
    },

    getPickerHtml: function(displayName, colorName, defaultValue){
        return `
        <fieldset>
            <legend>${displayName}</legend>
            <div class="paddingLeft">
                <div data-id="${colorName}Picker" data-control-class="ColorPicker" data-init-params="{size: 200, value: '${defaultValue}'}"></div>
            </div>
            <div class="padding">
                <div data-id="btnReset${colorName}" data-control-class="Button">Reset to default</div>
            </div>
        </fieldset>
        `;
    },
}
