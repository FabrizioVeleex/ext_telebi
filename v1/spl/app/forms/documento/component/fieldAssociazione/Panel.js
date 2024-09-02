/**
 * Created by fabrizio on 27/11/2023.
 */
Ext.define("spl.forms.documento.component.fieldAssociazione.Panel", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-spl-forms-documento-fieldassiciazione",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    "spl.forms.documento.component.fieldAssociazione.radioTipoSogg",
    "spl.forms.documento.component.fieldAssociazione.ComboSoggetto"
  ],

  layout: { type: "hbox" },
  defaults: { msgTarget: "side" },
  hidden: true,
  bind: {
    hidden: '{noIdSoggetto}'
  },
  items: [
    { xtype: 'v1-spl-form-documento-radiotiposoggetto' },
    { xtype: 'v1-spl-form-documento-combosoggetto' },
  ],
});
