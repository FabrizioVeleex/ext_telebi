/**
 * Created by luke on 15/11/2019.
 */
Ext.define('fmc.view.forms.mansione.cards.Mansione', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('fmc.forms.mansione.fields.descrizione'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.blanktext'),
                    maxLength: 250,maxLengthText:Locale.t('global.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        }
    ]
});