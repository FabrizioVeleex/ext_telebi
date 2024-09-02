Ext.define('sdc.view.forms.sdconfig.cards.Sdconfig', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.field.Number',
    'Ext.form.field.Text',
    'Ext.layout.container.HBox'
  ],
  scrollable: 'y',
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { msgTarget: 'under', labelAlign: 'top', margin: 5 },
      items: [{
        xtype: 'textfield', fieldLabel: Locale.t('sdc.forms.configurazione.fields.labelfrom'),
        maxLength: 150, flex: 1,
        bind: { readOnly: '{readOnly}', value: '{record.labelfrom}' }
      }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { msgTarget: 'under', labelAlign: 'top', margin: 5 },
      items: [
        {
          xtype: 'textfield', vtype:'email',fieldLabel: Locale.t('sdc.forms.configurazione.fields.mailfrom'),
          maxLength: 150, flex: 1,
          bind: { readOnly: '{readOnly}', value: '{record.mailfrom}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { msgTarget: 'under', labelAlign: 'top', margin: 5 },
      items: [
        {
          xtype: 'numberfield', labelWidth: 150, fieldLabel: Locale.t('sdc.forms.configurazione.fields.ggscadenza'),
          width: 350, hideTrigger: true, allowDecimals: false, minValue: 0,
          bind: { value: '{record.ggscadenza}', readOnly: '{readOnly}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { msgTarget: 'under', labelAlign: 'top', margin: 5 },
      items: [{
        xtype: 'textfield', fieldLabel: Locale.t('sdc.forms.configurazione.fields.mailto'),
        maxLength: 150, flex: 1,
        bind: { readOnly: '{readOnly}', value: '{record.mailto}' }
      }
      ]
    },
  ]
});