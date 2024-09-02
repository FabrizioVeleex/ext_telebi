/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.queue.Grid', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions',
  ],
  minHeight: 150,
  dockedItems: [
    {
      xtype: 'toolbar',
      items: [
        {
          text: Locale.t("prd.forms.cdl.btn.reload.text"),
          ui: "ocra",
          iconCls: "fas fa-sync bd-color-blue",
          handler: "onLoadQueue"
        }
      ]
    }
  ],
  viewConfig: {
    emptyText: Locale.t("global.grid.empty")
  },
  bind: {
    store: "{storeQueue}"
  },
  plugins: {
    widget: {
      ptype: 'rowwidget',
      widget: {
        xtype: "panel",
        title: "Json",
      },
      onWidgetAttach: function (plugin, bodyComponent, record) {
        console.log(record.data.info)
        bodyComponent.setHtml("<PRE>" + JSON.stringify(record.data.info, null, 2) + "</PRE>")
      }
    }
  },
  columns: [
    {
      text: Locale.t('prd.forms.cdl.columns.dateImport'), dataIndex: 'dateImport',
      xtype: "datecolumn",
      format: "d/m/Y H:i:s",
      width: 180
    },
    { text: Locale.t('prd.forms.cdl.columns.status'), dataIndex: 'status', width: 120 },
    { text: Locale.t('prd.forms.cdl.columns.message'), dataIndex: 'message', minWidth: 200, flex: 1 },
  ]
});

