/**
 * Created by luke on 27/09/22.
 */
Ext.define('bolfor.forms.tipologia.cards.Tipologia', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('bolfor.forms.tipologia.fields.codice'),
                    width:250, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 2, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codice}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('bolfor.forms.tipologia.fields.descrizione'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        }
    ]
});