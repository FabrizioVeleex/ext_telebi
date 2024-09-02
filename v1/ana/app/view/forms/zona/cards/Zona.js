/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.forms.zona.cards.Zona', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.zona.fields.codice'),
                    width:200, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codice}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.zona.fields.descrizione'), flex:1,
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'combo', fieldLabel: Locale.t('ana.forms.zona.fields.iduser'), flex:1,
                    displayField:'nomecognome', minChars:3,forceSelection:true,valueField:'id',autoLoadOnValue:true,
                    bind: {
                        store: '{comboUtente}',
                        value: '{record.iduser}',
                        readOnly: '{readOnly}'
                    }
                }
            ]
        }
    ]
});