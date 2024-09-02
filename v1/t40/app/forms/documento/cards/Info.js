/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("t40.forms.documento.cards.Info", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "t40.forms.documento.component.fieldStatus.Status0",
    "t40.forms.documento.component.fieldStatus.StatusNeg1",
    "t40.forms.documento.component.fieldStatus.StatusPos",
    't40.forms.documento.component.comboSoggetto.Combo',
    "t40.forms.documento.component.radioTipoSogg.radioTipoSogg",
    "t40.forms.documento.component.gridDup.fieldDup",
    "t40.forms.documento.component.gridDup.fieldDup0"
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
        { xtype: 'v1-t40-form-documento-radiotiposoggetto' },
        { xtype: 'v1-t40-form-documento-combosoggetto' },
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
          fieldLabel: Locale.t("t40.forms.documento.fields.seznote"),
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
    // Container visibile se emailstatus == -1 (no email, non inviata)
    { xtype: "v1-t40-forms-documento-statusNeg1" },
    // Container visibile se emailstatus === 0 (non inviata)
    { xtype: "v1-t40-forms-documento-status0" },
    // Container visibile se emailstatus > 0 (inviata)
    { xtype: "v1-t40-forms-documento-statusPos" },

    // Vista lista reord stampati in precedenza
    { xtype: "v1-t40-forms-documento-fieldDup" },
    { xtype: "v1-t40-forms-documento-fieldDup0" },
  ],

});
