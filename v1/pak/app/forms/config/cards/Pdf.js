/**
 * Created by fabrizio on 08/03/2022.
 */

Ext.define('pak.view.forms.config.cards.Pdf', {
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
          xtype: 'textfield', fieldLabel: Locale.t('pak.forms.config.fields.mittente'),
          flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.mittente}' }
        }
      ]
    },
  ]
});