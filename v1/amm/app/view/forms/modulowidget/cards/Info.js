/**
 * Created by luke on 23/08/21.
 */
Ext.define('amm.view.forms.modulowidget.cards.Info', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.TextField',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    margin: 15,
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulowidget.fields.tagapp'),
                    width:250, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 10,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnlyTag}', value: '{record.tagapp}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulowidget.fields.ui'),
                    width:250, maxLength: 10,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.ui}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulowidget.fields.titolo'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 100,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.titolo}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulowidget.fields.descrizione'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulowidget.fields.userCls'),
                    width:250, maxLength: 20,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.userCls}'}
                },
                {xtype: 'numberfield', fieldLabel: Locale.t('amm.forms.modulowidget.fields.height'),
                    width: 250, hideTrigger: true,allowDecimals:false,minValue:0,
                    bind: {readOnly: '{readOnly}', value: '{record.height}'}
                }
            ]
        }
    ]
});