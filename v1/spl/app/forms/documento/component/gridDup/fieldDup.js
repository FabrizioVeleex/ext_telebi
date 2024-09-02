/**
 * Created by fabrizio on 19/02/2022.
 */
Ext.define("spl.forms.documento.component.gridDup.fieldDup", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-spl-forms-documento-fieldDup",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
    "spl.forms.documento.component.gridDup.Grid"
  ],
  cls: "app-container",
  items: [
    {
      xtype: "container",
      bind: { hidden: "{record.duplicato}" },
      items: [
        {
          xtype: "box",
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          html: Locale.t("spl.forms.documento.cards.infodoc.griddocs.titleempty")
        },
      ]
    },
    {
      xtype: 'panel',
      bind: { hidden: "{!record.duplicato}" },
      items: [
        {
          xtype: "container",
          layout: { type: "hbox" },
          cls: "all-font-medium",
          style: { "text-align": "center" },
          flex: 1,
          html: Locale.t("spl.forms.documento.cards.infodoc.griddocs.titledup")
        },
        {
          xtype: "container",
          layout: { type: "hbox" },
          items: [
            { xtype: "v1-spl-forms-documento-griddup" },
          ],
        }
      ]
    }

  ],
});
