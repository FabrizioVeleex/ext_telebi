/**
 * Created by luke on 27/09/22.
 */
Ext.define('itm.forms.kit.cards.Kit', {
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
          xtype: 'textfield', fieldLabel: Locale.t('itm.forms.kit.fields.cd_kit'),
          width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 20, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.cd_kit}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('itm.forms.kit.fields.cd_comp1'),
          width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 20, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.cd_comp1}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('itm.forms.kit.fields.cd_comp2'),
          width: 400, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 20, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.cd_comp2}' }
        }
      ]
    }
  ]
});