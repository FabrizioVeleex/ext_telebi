/**
 * Created by fabrizio on 14/10/21.
 */
Ext.define('sdc.view.forms.dominio.cards.Dominio', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {
                msgTarget: 'under',
                labelAlign: 'top',
                margin: 5
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: Locale.t('sdc.forms.dominio.fields.valore'),
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    flex:1,
                    maxLength: 250,
                    maxLengthText: Locale.t('global.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.valore}'}
                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {
                msgTarget: 'under',
                labelAlign: 'top',
                margin: 5
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: Locale.t('sdc.forms.dominio.fields.tipo'),
                    flex:1,
                    displayField: 'valore',
                    valueField: 'id',
                    queryMode: 'local',
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    forceSelection: true,
                    bind: {
                        store: '{comboDominio}',
                        value: '{record.tipo}',
                        readOnly: '{readOnly}'
                    }
                }
            ]
        }
    ]
});