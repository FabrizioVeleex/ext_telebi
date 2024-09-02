/**
 * Created by luke on 28/09/22.
 */
Ext.define('cde.view.forms.notifica.cards.Notifica', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.notifica.fields.codice'),
                    width:150, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 2, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnlyNew}', value: '{record.codice}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('cde.forms.notifica.fields.nome'),
                    flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {xtype: 'textarea',scrollable:true,overflow:'auto',minHeight: 100,
                    flex:1,padding:'0 0 10 0',hideLabel: true,
                    bind: {value: '{record.descrizione}',readOnly: '{readOnly}'}
                }
            ]
        },

    ]
});