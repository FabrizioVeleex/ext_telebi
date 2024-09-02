/**
 * Created by luke on 15/06/21.
 */
Ext.define('amm.view.forms.ruolo.cards.Info', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.TextField',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    margin: 15,
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.ruolo.fields.codice'),
                    width:500, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codice}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.ruolo.fields.nome'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 100,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.ruolo.fields.descrizione'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', vtype:'email', fieldLabel: Locale.t('amm.forms.ruolo.fields.email'),
                    flex:1, maxLength: 100,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.email}'}
                }
            ]
        }
    ]
});