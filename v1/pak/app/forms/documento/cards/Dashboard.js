/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("pak.forms.documento.cards.Dashboard", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "pak.forms.documento.component.formDocumento.PanelDocumento"
  ],

  scrollable: "y",
  bodyPadding: 15,
  items: [
    {
      xtype: "container",
      layout: { type: "hbox" },
      defaults: { msgTarget: "side" },
      items: [{ xtype: "box", flex: 1, bind: { html: "{record.log}" } }],
    },
    {
      xtype: "container",
      layout: { type: "hbox" },
      defaults: { msgTarget: "side" },
      hidden: true,
      bind: {
        hidden: '{noIdSoggetto}'
      },
      items: [
        { xtype: 'v1-pak-form-documento-radiotiposoggetto' },
        { xtype: 'v1-pak-form-documento-combosoggetto' },
      ],
    },
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
      xtype: "panel",
      layout: { type: "hbox" },
      defaults: { margin: 5, msgTarget: "side" },
      items: [
        {
          fieldLabel: Locale.t("pak.forms.documento.fields.seznote"),
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
    {
      xtype: 'fieldset',
      cls: "app-container",
      style: { "background-color": "red" },
      bind: {
        hidden: "{record.spool}"
      },
      items: [
        {
          xtype: "box",
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          html: Locale.t("pak.forms.documento.cards.dashboard.notprintedyet"),
        },
      ]
    },
    {
      xtype: 'fieldset',
      cls: "app-container",
      style: { "background-color": "#008000bf" },
      items: [
        {
          xtype: "box",
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          bind: {
            html: Locale.t("pak.forms.documento.cards.dashboard.details"),
            hidden: "{!record.imported}"
          },
        },
        {
          xtype: 'v1-pak-forms-documento-paneldocumento',
          bind: {
            hidden: "{!record.imported}"
          },
        },
        {
          xtype: "box",
          bind: {
            hidden: "{record.imported}"
          },
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          html: Locale.t("pak.forms.documento.cards.dashboard.waitingdata"),
        },
      ]
    },
  ],

});
