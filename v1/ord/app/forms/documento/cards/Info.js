/**
 * Created by fabrizio on 15/02/2022.
 */
Ext.define("ord.forms.documento.cards.Info", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "ord.forms.documento.component.fieldStatus.Status0",
    "ord.forms.documento.component.fieldStatus.StatusNeg1",
    "ord.forms.documento.component.fieldStatus.StatusPos",
    'ord.forms.documento.component.comboSoggetto.Combo',
    "ord.forms.documento.component.radioTipoSogg.radioTipoSogg",
    "ord.forms.documento.component.gridDup.fieldDup",
    "ord.forms.documento.component.gridDup.fieldDup0"
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
    { xtype: "v1-ord-forms-documento-statusPos" },

    // Vista lista reord stampati in precedenza
    { xtype: "v1-ord-forms-documento-fieldDup" },
    { xtype: "v1-ord-forms-documento-fieldDup0" },
  ],

});
