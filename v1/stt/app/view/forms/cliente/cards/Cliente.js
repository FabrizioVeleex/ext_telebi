/**
* Created by fabri on 10/01/2023.
 */
Ext.define('stt.view.forms.cliente.cards.Cliente', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    'stt.view.forms.cliente.components.comboSoggetto.Combo'
  ],
  scrollable: 'y',
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'container', flex: 1,
          layout: { type: "hbox" },
          defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
          items: [
            {
              xtype: 'v1-stt-form-cliente-combosoggetto'
            },
            {
              xtype: 'textfield', fieldLabel: Locale.t('stt.forms.cliente.fields.ragsoc'),
              minWidth: 250,
              readOnly: true,
              flex: 1,
              bind: {
                value: '{record.ragsoc}'
              }
            }
          ]
        },

      ]
    },
  ]
});