/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("spl.forms.documento.cards.Info", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "spl.forms.documento.component.fieldAssociazione.Panel",
    "spl.forms.documento.component.gridMail.Panel",
    "spl.forms.documento.component.indirizzoSpedizione.Panel"
  ],

  scrollable: "y",
  bodyPadding: 15,
  items: [
    { xtype: "v1-spl-forms-documento-fieldexception" },
    { xtype: "v1-spl-forms-documento-fieldassiciazione" },
    {
      xtype: "container",
      cls: "app-container",
      style: { "text-align": "center" },
      items: [
        {
          xtype: "box",
          flex: 1,
          bind: {
            html: "{htmlDoc}",
          },
        },
        {
          xtype: "box",
          flex: 1,
          bind: {
            html: "{htmlSogg}",
          },
        },
      ],
    },
    {
      xtype: "v1-spl-forms-documento-indirizzospedizione"
    },
    {
      xtype: "panel",
      layout: { type: "hbox" },
      defaults: { margin: 5, msgTarget: "side" },
      items: [
        {
          fieldLabel: Locale.t("spl.forms.documento.fields.seznote"),
          labelAlign: "top",
          xtype: "textarea",
          scrollable: true,
          overflow: "auto",
          flex: 1,
          padding: "0 0 10 0",
          bind: { value: "{record.note}", readOnly: "{readOnly}" },
        },
      ],
    },

    // tab invio mail
    { xtype: "v1-spl-forms-documento-gridmail-panel" },

    // tab lista record stampati in precedenza
    { xtype: "v1-spl-forms-documento-fieldDup" },
  ],

});
