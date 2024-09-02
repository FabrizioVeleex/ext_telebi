/**
 * Created by luke on 27/09/22.
 */
Ext.define('itm.forms.gomma.cards.Gomma', {
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
          xtype: 'textfield', fieldLabel: Locale.t('itm.forms.gomma.fields.cd_rotolo'),
          width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 20, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.cd_rotolo}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('itm.forms.gomma.fields.cd_spezzone'),
          width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 20, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.cd_spezzone}' }
        }
      ]
    }
  ]
});