/**
 * Created by fabrizio on 27/11/2023.
 */
Ext.define("spl.forms.documento.component.fieldException.Panel", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-spl-forms-documento-fieldexception",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    "spl.forms.documento.component.fieldException.Panel"
  ],

  hidden: true,
  title: "",
  bind: {
    hidden: "{exception}",
    title: "{record.exception}"
  },
  items: [
    {
      xtype: "container",
      layout: { type: "hbox" },
      defaults: { msgTarget: "side" },
      hidde: true,
      items: [{
        xtype: "box", flex: 1,
        bind: {
          html: "{record.log}",
        }
      }],
    },
  ],
});
