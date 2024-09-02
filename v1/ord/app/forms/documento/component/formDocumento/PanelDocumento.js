/**
 * Created by fabrizio on 17/04/2023.
 */
Ext.define("ord.forms.documento.component.formDocumento.PanelDocumento", {
  extend: "Ext.form.Panel",
  xtype: "v1-ord-forms-documento-paneldocumento",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.panel.Panel',
    "Ext.form.field.TextArea",
    "Ext.layout.container.HBox",
    "ord.forms.documento.component.formDocumento.GridDettaglio"
  ],

  scrollable: "y",
  bodyPadding: 15,
  items: [
    {
      xtype: 'v1-ord-forms-documento-griddettaglio'
    }
  ],

});
