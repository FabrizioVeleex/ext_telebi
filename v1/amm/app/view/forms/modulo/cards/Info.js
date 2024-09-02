/**
 * Created by luke on 23/08/21.
 */
Ext.define('amm.view.forms.modulo.cards.Info', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.TextField',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    margin: 15,
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulo.fields.tagapp'),
                    width:250, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 10,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnlyTag}', value: '{record.tagapp}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulo.fields.ui'),
                    width:250, maxLength: 10,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.ui}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulo.fields.titolo'),
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
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulo.fields.descrizione'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulo.fields.modulo'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.modulo}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.modulo.fields.version'),
                    width:100, maxLength: 3,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.version}'}
                }
            ]
        }
    ]
});