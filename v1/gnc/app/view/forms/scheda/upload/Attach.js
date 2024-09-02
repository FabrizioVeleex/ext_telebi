/**
 * Created by luke on 16/09/22.
 */
Ext.define('gnc.view.forms.scheda.upload.Attach', {
    extend: 'Ext.Container',
    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.layout.container.VBox',
        'gnc.view.forms.scheda.upload.AttachController'
    ],
    controller: 'v1-attachgnc',
    layout: {type: "vbox", align: "stretch"},
    bodyStyle: 'background-color:trasparent;',
    margin: '8px,0,0',
    height: 80,
    width: 150,
    items: [
        {
            xtype:'container',
            layout: {type: "vbox", align: "stretch"},
            items:[
                {
                    xtype: 'form',
                    layout: {type: "vbox", align: "stretch"},
                    padding: 0,
                    items: [{
                        xtype: 'filefield',
                        hideLabel: true,
                        margin: 0,
                        buttonConfig: {
                            width: 150
                        },
                        buttonOnly: true,
                        buttonText: Locale.t('gnc.forms.scheda.istituzionalize.updattach'),
                        listeners: {
                            'change': 'onChangeBtnUpload'
                        }
                    }]
                }
            ]
        }
    ]
});