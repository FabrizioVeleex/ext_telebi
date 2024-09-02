/**
 * Created by luke on 16/09/22.
 */
Ext.define('rec.view.forms.reso.upload.Attach', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.layout.container.Fit',
        'Ext.layout.container.VBox',
        'rec.view.forms.reso.upload.AttachController'
    ],
    controller: 'v1-rec-attachimg',
    bodyStyle: 'background-color:trasparent;',
    bodyPadding: 15,
    modal:true,
    width: 400,
    maxHeight: 400,
    layout:'fit',
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
                        fieldLabel:'Immagine',
                        margin: 0,
                        listeners: {
                            'change': 'onChangeBtnUpload'
                        }
                    }]
                }
            ]
        }
    ]
});