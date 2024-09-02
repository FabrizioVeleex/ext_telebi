/**
 * Created by luke on 27/09/22.
 */
Ext.define('itm.forms.classe.cards.Classe', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
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
                    xtype: 'textfield', fieldLabel: Locale.t('itm.forms.classe.fields.cd_clm'),
                    width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 4, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: { readOnly: '{readOnly}', value: '{record.cd_clm}' }
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: { type: "hbox" },
            defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('itm.forms.classe.fields.descr_clm'),
                    flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: { readOnly: '{readOnly}', value: '{record.descr_clm}' }
                }
            ]
        }
    ]
});