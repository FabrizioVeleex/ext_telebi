/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.forms.paese.cards.Paese', {
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
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.paese.fields.alpha2'),
                    width:200, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 2,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.alpha2}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.paese.fields.alpha3'),
                    width:200, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 3,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.alpha3}'}
                },
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('ana.forms.paese.fields.langit'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 60,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.langit}'}
                },
            ]
        }
    ]
});