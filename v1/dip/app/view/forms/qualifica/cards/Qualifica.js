Ext.define('dip.view.forms.qualifica.cards.Qualifica', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.TextField',
    ],
    scrollable:'y',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: Locale.t('dip.forms.qualifica.fields.qualifica'),
            anchor: '100%',allowBlank: false, blankText: Locale.t('global.form.blanktext'),
            maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {
                readOnly: '{readOnly}',
                value: '{record.qualifica}'
            }
        },
    ],
});