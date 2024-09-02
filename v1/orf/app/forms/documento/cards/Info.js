/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("orf.forms.documento.cards.Info", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "orf.forms.documento.component.fieldStatus.Status0",
    "orf.forms.documento.component.fieldStatus.StatusNeg1",
    "orf.forms.documento.component.fieldStatus.StatusPos",
    'orf.forms.documento.component.comboSoggetto.Combo',
    "orf.forms.documento.component.radioTipoSogg.radioTipoSogg",
    "orf.forms.documento.component.gridDup.fieldDup",
    "orf.forms.documento.component.gridDup.fieldDup0"
  ],

  scrollable: "y",
  bodyPadding: 15,
  items: [
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
    // Container visibile se emailstatus == -1 (no email, non inviata)
    // Container visibile se emailstatus === 0 (non inviata)
    // Container visibile se emailstatus > 0 (inviata)
    { xtype: "v1-orf-forms-documento-statusPos" },

    // Vista lista reord stampati in precedenza
    { xtype: "v1-orf-forms-documento-fieldDup" },
    { xtype: "v1-orf-forms-documento-fieldDup0" },
  ],

});
