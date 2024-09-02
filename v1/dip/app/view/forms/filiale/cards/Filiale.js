Ext.define('dip.view.forms.filiale.cards.Filiale', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.TextField',
    ],
    scrollable:'y',
    items: [
        {
            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.filiale.fields.codice'),
            width: 250,allowBlank: false, blankText: Locale.t('global.form.blanktext'),
            maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.codice}'}
        },
        {
            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.filiale.fields.numero'),
            width: 250, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
            maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.numero}'}
        },
        {
            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.filiale.fields.filiale'),
            anchor: '100%', allowBlank: false, blankText: Locale.t('global.form.blanktext'),
            maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.filiale}'}
        },
        {
            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.filiale.fields.indirizzo'),
            anchor: '100%', maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.indirizzo}'}
        },
        {
            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.filiale.fields.telefono'),
            width: 250, maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.telefono}'}
        },
        {
            xtype: 'textfield', fieldLabel: Locale.t('dip.forms.filiale.fields.breve'),
            width: 250, maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.breve}'}
        },
        {
            xtype: 'textfield',
            fieldLabel: Locale.t('dip.forms.filiale.fields.fax'),
            width: 250, maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
            bind: {readOnly: '{readOnly}', value: '{record.fax}'}
        }
    ],
});