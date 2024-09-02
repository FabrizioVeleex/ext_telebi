/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("bol.forms.documento.cards.Info", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "bol.forms.documento.component.fieldStatus.Status0",
    "bol.forms.documento.component.fieldStatus.StatusNeg1",
    "bol.forms.documento.component.fieldStatus.StatusPos",
    'bol.forms.documento.component.comboSoggetto.Combo',
    "bol.forms.documento.component.radioTipoSogg.radioTipoSogg",
    "bol.forms.documento.component.gridDup.fieldDup",
    "bol.forms.documento.component.gridDup.fieldDup0"
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
    { xtype: "v1-bol-forms-documento-statusNeg1" },
    // Container visibile se emailstatus === 0 (non inviata)
    { xtype: "v1-bol-forms-documento-status0" },
    // Container visibile se emailstatus > 0 (inviata)
    { xtype: "v1-bol-forms-documento-statusPos" },

    // Vista lista reord stampati in precedenza
    { xtype: "v1-bol-forms-documento-fieldDup" },
    { xtype: "v1-bol-forms-documento-fieldDup0" },
  ],

});
