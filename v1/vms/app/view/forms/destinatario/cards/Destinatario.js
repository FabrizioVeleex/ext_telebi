/**
 * Created by luke on 28/09/22.
 */
Ext.define('vms.view.forms.destinatario.cards.Destinatario', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('vms.forms.destinatario.fields.nome'),
                    flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.nome}'}
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('vms.forms.destinatario.fields.stabilimento'),
                    width: 600, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    displayField: 'nome', valueField: 'id',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboSedi}', value: '{record.stabilimento}', readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});