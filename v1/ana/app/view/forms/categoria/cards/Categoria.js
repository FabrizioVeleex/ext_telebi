/**
 * Created by luke on 12/02/21.
 */
Ext.define("ana.view.forms.categoria.cards.Categoria", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.TextField",
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
  ],
  scrollable: "y",
  items: [
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {
          xtype: "textfield",
          fieldLabel: Locale.t("ana.forms.categoria.fields.categoria"),
          flex: 1,
          allowBlank: false,
          blankText: Locale.t("global.form.blanktext"),
          maxLength: 250,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnlyCat}", value: "{record.categoria}" },
        },
      ],
    },
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {
          xtype: "textfield",
          fieldLabel: Locale.t("ana.forms.categoria.fields.categoria_en"),
          flex: 1,
          maxLength: 250,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnlyCat}", value: "{record.categoria_en}" },
        },
      ],
    },
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {
          xtype: "textfield",
          fieldLabel: Locale.t("ana.forms.categoria.fields.categoria_fr"),
          flex: 1,
          maxLength: 250,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnlyCat}", value: "{record.categoria_fr}" },
        },
      ],
    },
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {
          xtype: "textfield",
          fieldLabel: Locale.t("ana.forms.categoria.fields.categoria_es"),
          flex: 1,
          maxLength: 250,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnlyCat}", value: "{record.categoria_es}" },
        },
      ],
    },
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox" },
      frame: true,
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {
          xtype: "textarea",
          scrollable: true,
          overflow: "auto",
          fieldLabel: Locale.t("ana.forms.categoria.fields.descrizione"),
          flex: 1,
          padding: "0 0 10 0",
          bind: { value: "{record.descrizione}", readOnly: "{readOnly}" },
        },
      ],
    },
  ],
});
