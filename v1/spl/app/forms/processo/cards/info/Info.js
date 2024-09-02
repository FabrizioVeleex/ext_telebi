/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define("spl.forms.processo.cards.Info", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
  ],

  scrollable: "y",
  bodyPadding: 15,
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: {
        xtype: 'displayfield',
        margin: 5,
        labelWidth: 150,
        felx: 1
      },
      items: [
        {
          fieldLabel: Locale.t('spl.forms.processo.cards.dashboard.fields.filename'),
          bind: { value: '{record.json.nameFile}' }
        },

      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: {
        xtype: 'displayfield',
        margin: 5,
        labelWidth: 150,
        felx: 1
      },
      items: [
        {
          fieldLabel: Locale.t('spl.forms.processo.cards.dashboard.fields.status'),
          bind: { value: '{record.json.status}' }
        },

      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: {
        xtype: 'displayfield',
        margin: 5,
        labelWidth: 150,
        felx: 1
      },
      items: [
        {
          fieldLabel: Locale.t('spl.forms.processo.cards.dashboard.fields.tag'),
          bind: { value: '{record.json.tag}' }
        }
      ]
    }
  ]

});
