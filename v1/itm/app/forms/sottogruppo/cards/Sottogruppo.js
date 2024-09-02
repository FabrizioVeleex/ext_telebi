/**
 * Created by luke on 27/09/22.
 */
Ext.define('itm.forms.sottogruppo.cards.Sottogruppo', {
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
            layout: { type: "hbox" },
            defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('itm.forms.sottogruppo.fields.cd_sottogruppo'),
                    width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 4, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: { readOnly: '{readOnly}', value: '{record.cd_sottogruppo}' }
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: { type: "hbox" },
            defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
            items: [
                {
                    xtype: 'combobox', fieldLabel: Locale.t('itm.forms.sottogruppo.fields.cd_clm'), minChars: 3,
                    flex: 1, forceSelection: true,
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'), autoLoadOnValue: true,
                    bind: {
                        store: '{storeClassi}',
                        readOnly: '{readOnly}',
                        value: '{record.cd_clm}'
                    },
                    valueField: 'cd_clm', displayField: 'descr_clm', queryMode: 'local'
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: { type: "hbox" },
            defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
            items: [
                {
                    xtype: 'combobox', fieldLabel: Locale.t('itm.forms.sottogruppo.fields.cd_fam'), minChars: 3,
                    flex: 1, forceSelection: true,
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'), autoLoadOnValue: true,
                    bind: {
                        store: '{storeFamiglie}',
                        readOnly: '{readOnly}',
                        value: '{record.cd_fam}'
                    },
                    valueField: 'cd_fam', displayField: 'descr_fam', queryMode: 'local'
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: { type: "hbox" },
            defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
            items: [
                {
                    xtype: 'combobox', fieldLabel: Locale.t('itm.forms.sottogruppo.fields.cd_gruppo'), minChars: 3,
                    flex: 1, forceSelection: true,
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'), autoLoadOnValue: true,
                    bind: {
                        store: '{storeGruppi}',
                        readOnly: '{readOnly}',
                        value: '{record.cd_gruppo}'
                    },
                    valueField: 'cd_gruppo', displayField: 'descr_gruppo', queryMode: 'local'
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: { type: "hbox" },
            defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('itm.forms.sottogruppo.fields.descr_sottogruppo'),
                    flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: { readOnly: '{readOnly}', value: '{record.descr_sottogruppo}' }
                }
            ]
        }
    ]
});