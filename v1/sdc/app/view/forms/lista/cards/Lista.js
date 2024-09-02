/**
 * Created by fabrizio on 14/10/21.
 */
Ext.define('sdc.view.forms.lista.cards.Lista', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {xtype: 'container',
            flex: 1,
            layout: {type: "hbox"},
            defaults: {
                msgTarget: 'under', labelAlign: 'top', margin: 5
            },
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('sdc.forms.lista.fields.nome'), flex:1,
                    allowBlank: false,maxLength: 250, maxLengthText: Locale.t('global.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        }
    ]
});