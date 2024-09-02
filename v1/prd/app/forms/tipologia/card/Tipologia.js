/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.forms.tipologia.cards.Tipologia', {
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
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.tipologia.fields.cd_tip'),
          width: 300,
          // maxLength: 5,
          // maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: {
            readOnly: '{readOnly}',
            value: '{record.cd_tip}'
          }
        },

      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.tipologia.fields.descr_tip'),
          flex: 1,
          bind: {
            readOnly: '{readOnly}',
            value: '{record.descr_tip}'
          }
        }
      ]
    },
  ]
});