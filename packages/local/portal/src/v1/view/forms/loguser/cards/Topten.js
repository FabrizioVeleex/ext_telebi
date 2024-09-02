/**
 * Created by fabrizio on 19/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.cards.Topten', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'portal.util.Locale',
        'portal.v1.view.forms.loguser.cards.topten.ChartTopTen',
        'portal.v1.view.forms.loguser.cards.topten.GridDetRequest',
        'portal.v1.view.forms.loguser.cards.topten.GridDetType',
        'portal.v1.view.forms.loguser.cards.topten.GridTopTen'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: true,
    items: [
        {
            xtype: 'container',
            height: 40,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                msgTarget: 'side',
                labelAlign: 'right',
                labelWidth:60,
                margin: 5
            },
            items: [
                // {
                //     xtype: 'combo',
                //     fieldLabel: Locale.t('global.loguser.topten.fields.user'),
                //     listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.form.combo.empty')},
                //     width: 300,
                //     displayField: 'cognomenome',
                //     valueField: 'id',
                //     queryMode: 'remote',
                //     forceSelection: true,
                //     autoLoadOnValue:true,
                //     bind: {
                //         store: '{comboUtente}',
                //         value: '{record.iduser}'
                //     }
                // },
                {
                    xtype: 'datefield',
                    fieldLabel: Locale.t('global.loguser.topten.fields.fromdate'),
                    width: 240, format: 'd/m/Y', submitFormat: 'Y-m-d',
                    itemId: 'fromDate',
                    bind: {
                        value: '{record.fromdate}'
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: Locale.t('global.loguser.topten.fields.todate'),
                    width: 240, format: 'd/m/Y', submitFormat: 'Y-m-d',
                    itemId: 'todate',
                    bind: {
                        value: '{record.todate}'
                    }
                },
                {
                    xtype:'button',
                    text:'Go',
                    handler:'onLoafTopten'
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            height: 300,
            defaults: {
                msgTarget: 'side',
                labelAlign: 'left',
                margin: 5,
            },
            items: [
                {
                    xtype: 'v1-global-gridtopten',
                    itemId:'gridtopten',
                    flex:1,
                    height:300
                },
                {
                    xtype: 'v1-global.pie-basic',
                    itemId:'charttopten',
                    flex:1,
                    margin:20,
                    height:300,
                },
            ]
        },
        {
            xtype: 'v1-global-griddettype',
            height: 140,
            margin:5
        },
        {
            xtype: 'v1-global-griddetrequest',
            flex:1,
            margin:5,
            minHeight: 200
        },
    ]
});