Ext.define('dip.view.forms.ruolo.cards.Ruolo', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.TextField',
    ],
    scrollable:'y',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: Locale.t('dip.forms.ruolo.fields.ruolo'),
            anchor: '100%', maxLength: 100,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
            maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.ruolo}'}
        },
    ],
});