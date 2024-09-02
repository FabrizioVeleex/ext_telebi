Ext.define('home.view.imp.cards.upload.WindowUpload', {
    extend: 'Ext.Window',
    layout: 'form',
    requires: [
        'home.view.imp.cards.upload.WindowUploadController',
        'home.view.imp.cards.upload.WindowUploadModel',
        'Ext.container.Container',
        'Ext.layout.container.*',
        'Ext.form.*',
        'Ext.Button'
    ],
    title:Locale.t('home.impostazioni.sfondo'),
    controller: 'v1-imp-windowuplad',
    viewModel: 'v1-imp-windowuplad',
    bodyPadding: 15,
    modal: true,
    width: 600,
    maxHeight: 400,
    dockedItems: [{
        xtype: 'toolbar', dock: 'bottom', items: [
            {
                xtype: 'button', iconCls: 'fas fa-times', text: Locale.t('home.impostazioni.btn.cancel.text'),
                handler: 'onCloseWindow'
            },
            {
                reference: 'btnconfirm',
                xtype: 'button',
                iconCls: 'x-fas fa-check-square',
                text: Locale.t('home.impostazioni.btn.confirm.text'),
                handler: 'onSave'
            }
        ]
    }],
    items: [
        {
            xtype: 'container',
            scrollable: true,
            defaults: {
                labelWidth: 70
            },
            items: [
                {
                    reference: 'uploadfile',
                    xtype: 'form',
                    id: "formUpload",
                    fileUpload: true,
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 150,
                            width: 500,
                            reference: 'attachfield',
                            hidden: true,
                            fieldLabel: Locale.t('home.impostazioni.nomefile'),
                            name: 'nomefile'
                        },
                        {
                            xtype: 'fileuploadfield',
                            labelWidth: 150,
                            width: 500,
                            fieldLabel: Locale.t('home.impostazioni.btn.carica.text'),
                            name: 'bpfile',
                            buttonConfig: {text: '', iconCls: 'fas fa-upload'},
                            listeners: {
                                afterrender:function(cmp){
                                    cmp.fileInputEl.set({
                                        accept:'image/*' // or w/e type
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'progress',
                            shadow: true,
                            height: 25,
                            bind: {
                                text: '{textProgress}',
                                value: '{progress}'
                            }

                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        render: 'managerView'
    }
});