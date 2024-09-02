/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.forms.comune.cards.Comune', {
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
                    xtype: 'combo', fieldLabel: Locale.t('ana.forms.comune.fields.regione'),
                    width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    displayField: 'regione', valueField: 'regione',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboRegione}', value: '{record.regione}', readOnly: '{readOnly}'}
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('ana.forms.comune.fields.idprovincia'),
                    width: 300,  allowBlank: false,blankText: Locale.t('global.form.blanktext'),
                    displayField: 'provincia', valueField: 'id',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboProvincia}', value: '{record.idprovincia}', readOnly: '{readOnly}'}
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('ana.forms.comune.fields.comune'),
                    flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.comune}'}
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('ana.forms.comune.fields.cap'),
                    width: 250, allowBlank: false, maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.cap}'}
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('ana.forms.comune.fields.codfis'),
                    width: 250, maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codfis}'}
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('ana.forms.comune.fields.codistat'),
                    width: 250, maxLength: 10, maxLengthText: Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.codistat}'}
                }
            ]
        }
    ]
});