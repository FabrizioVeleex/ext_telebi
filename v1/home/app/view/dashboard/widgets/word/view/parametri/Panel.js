/**
 * Created by luke on 27/10/21.
 */
Ext.define('home.view.dashboard.widgets.word.view.parametri.Panel', {
    extend: 'Ext.panel.Panel',
    ui:'viola',
    border:true,
    requires: [
        'Ext.container.Container',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'home.view.dashboard.widgets.word.view.parametri.Controller',
        'home.view.dashboard.widgets.word.view.parametri.Model'
    ],
    flex: 1,
    viewModel:'v1-wordparametri',
    controller:'v1-wordparametri',
    layout: {
        type: 'vbox',
        align: 'stretch'

    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                text: Locale.t('global.btn.close.text'),
                iconCls: 'x-fas fa-window-close',
                ui:'ocra',
                handler: 'onClosePannello',
            },
            {
                text: Locale.t('global.btn.save.text'),
                iconCls: 'x-fas fa-check-square',
                ui: 'green',
                handler: 'onSaveParam'
            }
        ]
    }],
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {msgTarget: 'under', labelAlign: 'top', margin: 5},
            items: [
                {xtype: 'numberfield', fieldLabel: Locale.t('word.parametri.anno'),
                    width:150, hideTrigger: true,allowDecimals:false,minValue:0,
                    bind: {value: '{record.anno}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('word.parametri.mese'),
                    width:150, hideTrigger: true,allowDecimals:false,minValue:0,
                    bind: {value: '{record.mese}'}
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onAfterRender'
    }
});