Ext.define('dip.view.forms.parametro.cards.Parametro', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.TextField',
    ],
    scrollable:'y',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: Locale.t('dip.forms.parametro.fields.pswstd'),
            width: 250,
            maxLength: 10,
            maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {
                readOnly: '{readOnly}',
                value: '{record.pswstd}'
            }
        },
    ],
});