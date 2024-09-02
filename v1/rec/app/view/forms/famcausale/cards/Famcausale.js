/**
 * Created by luke on 03/03/21.
 */
Ext.define('rec.view.forms.famcausale.cards.Famcausale', {
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
                { xtype: 'combo', fieldLabel: Locale.t('rec.forms.famcausale.fields.pfcaus'),
                    width: 300, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    displayField: 'psdesc', valueField: 'pscaus',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboCausale}', value: '{record.pfcaus}', readOnly: '{readOnly}'}
                },
                {
                    xtype: 'combo', fieldLabel: Locale.t('rec.forms.famcausale.fields.pffami'),
                    width: 300, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    displayField: 'famiglia', valueField: 'famiglia',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboFamiglia}', value: '{record.pffami}', readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.famcausale.fields.pftecn'),
                    width:300, maxLength: 4, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.pftecn}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.famcausale.fields.pffunz'),
                    width:300, maxLength: 4, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.pffunz}'}
                }
            ]
        }
    ]
});