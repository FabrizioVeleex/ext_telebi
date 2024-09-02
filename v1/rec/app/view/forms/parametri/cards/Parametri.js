/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.parametri.cards.Parametri', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {xtype: 'numberfield', labelWidth:200,fieldLabel:Locale.t('rec.forms.parametri.fields.giorni'),
                    width:400,hideTrigger: true, allowDecimals:false,
                    bind: {readOnly: '{readOnly}',value: '{record.giorni}'}}
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('rec.forms.parametri.fields.commerciale1'), width:600,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente}',
                        value: '{record.commerciale1}',
                        readOnly: '{readOnly}'
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('rec.forms.parametri.fields.commerciale2'), width:600,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente2}',
                        value: '{record.commerciale2}',
                        readOnly: '{readOnly}'
                    }
                }
            ]
        }
    ]
});