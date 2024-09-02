/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.giustificativo.Panel', {
    extend: 'Ext.panel.Panel',
    margin: 10,
    ui:'presenze',
    border:true,
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Date',
        'Ext.form.field.Display',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'home.view.dashboard.widgets.wpre.view.giustificativo.Controller',
        'home.view.dashboard.widgets.wpre.view.giustificativo.Grid',
        'home.view.dashboard.widgets.wpre.view.giustificativo.Model'
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
    viewModel:'v1-widgetgiust',
    controller:'v1-wpregridgiust',
    layout: {
        type: 'vbox',
        align: 'stretch'

    },
    header: {
        itemPosition: 1,
        items: [
            {
                xtype: 'button',
                tooltip: Locale.t('global.btn.save.text'),
                iconCls: 'x-fas fa-edit',
                ui: 'green',
                handler: 'onCloseSaveGiust',
                hidden: true,
                bind:{
                    hidden:'{readOnly}'
                }
            },
            {
                xtype: 'button',
                ui: 'red',
                tooltip: Locale.t('global.btn.delete.text'),
                iconCls: 'x-fas fa-trash',
                handler: 'onRemoveGiust',
                hidden: true,
                bind:{
                    hidden:'{btndelete}'
                }
            },
            {
                xtype: 'button',
                tooltip: Locale.t('global.btn.close.text'),
                iconCls: 'x-fas fa-window-close',
                handler: 'onCloseGiust',
            },
        ]
    },
    items: [
        {
            xtype:'v1-wpre-gridGiust',
            width: 510,
            height:Ext.global.Vars.infoUser.theme==='big'?80:70,
            bind:{
                store:'{storeGiust}'
            },
        },
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
                        value: '{nota.notedal}',
                        disabled:'{readOnly}'
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
                        value: '{nota.noteal}',
                        disabled:'{readOnly}'
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
                value: '{nota.note}',
                disabled:'{readOnly}'
            }
        }

    ],
    listeners: {}
});
