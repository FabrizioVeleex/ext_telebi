/**
 * Created by luke on 04/05/21.
 */
Ext.define('rec.view.forms.step.cards.Step', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'numberfield', fieldLabel: Locale.t('rec.forms.step.fields.valore'),
                    width:150, hideTrigger: true, allowDecimals:false,
                    bind: {readOnly: '{readOnly}', value: '{record.valore}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.step.fields.descit'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descit}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.step.fields.descen'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descen}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.step.fields.desces'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.desces}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.step.fields.descfr'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descfr}'}
                }
            ]
        }
    ]
});