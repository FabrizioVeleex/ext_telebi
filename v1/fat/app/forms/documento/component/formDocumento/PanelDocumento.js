/**
 * Created by fabrizio on 17/04/2023.
 */
Ext.define("fat.forms.documento.component.formDocumento.PanelDocumento", {
  extend: "Ext.form.Panel",
  xtype: "v1-fat-forms-documento-paneldocumento",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "fat.forms.documento.component.formDocumento.GridDettaglio"
  ],

  scrollable: "y",
  bodyPadding: 15,
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'fieldset', flex: 1,
          title: Locale.t('fat.forms.documento.cards.dashboard.destinazione'),
          // layout: { type: "hbox" },
          // defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
          items: [
            {
              xtype: 'displayfield',
              width: 150,
              bind: { value: '{record.destinatario.ragsoc}' }
            },
            {
              xtype: 'displayfield',
              width: 150,
              bind: { value: '{record.destinatario.indirizzo}' }
            },
            {
              xtype: 'displayfield',
              width: 150,
              bind: { value: '{record.destinatario.cap} {record.destinatario.comune} {record.destinatario.provincia}' }
            },
          ]
        },
      ]
    },
    {
      xtype: 'v1-fat-forms-documento-griddettaglio'
    }
  ],

});
