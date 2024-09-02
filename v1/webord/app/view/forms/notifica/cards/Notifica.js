/**
 * Created by luke on 28/09/22.
 */
Ext.define('webord.view.forms.notifica.cards.Notifica', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.notifica.fields.codice'),
                    width:200, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 5, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codice}'}
                },
                {xtype: 'textfield', fieldLabel: Locale.t('webord.forms.notifica.fields.nome'),
                    flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {xtype: 'container', flex: 1, layout: { type: "hbox" },
            defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
            items: [
                {
                    xtype: 'textarea', scrollable: true, overflow: 'auto', fieldLabel: Locale.t('webord.forms.notifica.fields.descrizione'),
                    flex: 1, padding: '0 0 10 0',
                    bind: { readOnly: '{readOnly}', value: '{record.descrizione}' }
                }
            ]
        }
    ]
});