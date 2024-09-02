/**
 * Created by luke on 03/03/21.
 */
Ext.define('rec.view.forms.famiglia.cards.Famiglia', {
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
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.famiglia.fields.famiglia'),
                    width:100, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.famiglia}'}
                }
            ]
        }
    ]
});