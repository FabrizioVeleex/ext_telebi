/**
 * Created by luke on 03/03/21.
 */
Ext.define('rec.view.forms.causale.cards.Causale', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelWidth:150,msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.causale.fields.pscaus'),
                    width:300, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 3, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnlyCausale}', value: '{record.pscaus}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelWidth:150,msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.causale.fields.psdesc'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.psdesc}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.causale.fields.psdesi'),
                    flex:1, maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.psdesi}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelWidth:150,msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.causale.fields.psdesf'),
                    flex:1, maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.psdesf}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('rec.forms.causale.fields.psdess'),
                    flex:1, maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.psdess}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelWidth:150,msgTarget: 'side'},
            items: [
                {xtype: 'numberfield', fieldLabel: Locale.t('rec.forms.causale.fields.giorni'),
                    width:300, hideTrigger: true, allowDecimals:false,
                    bind: {readOnly: '{readOnly}', value: '{record.giorni}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelWidth:150,msgTarget: 'side'},
            items: [
                {xtype: 'checkboxfield', boxLabel:Locale.t('rec.forms.causale.fields.sito'),
                    width:500,
                    bind: {readOnly: '{readOnly}',value: '{record.sito}'}
                },
                {xtype: 'checkboxfield', boxLabel:Locale.t('rec.forms.causale.fields.obbfornitore'),
                    width:500,
                    bind: {readOnly: '{readOnly}',value: '{record.obbfornitore}'}
                }
            ]
        }
    ]
});