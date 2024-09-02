/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.note.Nota', {
    extend: 'Ext.panel.Panel',
    margin: 10,
    ui:'presenze',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],
    flex: 1,
    bodyStyle: {
       'background-color':'#24c018',

    },
    style: {
        'webkit-border-radius': '15px',
        '-moz-border-radius': '15px',
        'border-radius': '15px !important'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'

    },
    header: {
        itemPosition: 1,
        items: [
            {
                xtype: 'button',
                tooltips: Locale.t('global.btn.save.text'),
                iconCls: 'x-fas fa-edit',
                ui:'green',
                handler: 'onCloseSaveGiust',
            },
            {
                xtype: 'button',
                tooltips: Locale.t('global.btn.delete.text'),
                iconCls: 'x-fas fa-trash',
                ui:'red',
                handler: 'onCloseDelGiust',
            },
        ]
    },
    items: [
        {
            xtype: 'container', layout: 'hbox',
            margin: 5,
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: Locale.t('wpre.giustificativi.dal'),
                    editable: false,
                    labelWidth: 50,
                    width: 200,
                    allowBlank: false,
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    bind: {
                        value: '{nota.notedal}'
                    }
                },
                {xtype: 'displayfield', value: '', width: 10},
                {
                    xtype: 'datefield',
                    fieldLabel: Locale.t('wpre.giustificativi.al'),
                    editable: false,
                    labelWidth: 50,
                    width: 200,
                    allowBlank: false,
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    bind: {
                        value: '{nota.notedal}'
                    }
                }
            ]
        },
        {
            xtype: 'textarea',
            margin: 5,
            labelAlign: 'top',
            fieldLabel: Locale.t('wpre.giustificativi.nota'),
            autoScroll: true,
            overflow: 'auto',
            height: 120,
            bind: {
                value: '{nota.note}'
            }
        }

    ],
    listeners: {}
});
