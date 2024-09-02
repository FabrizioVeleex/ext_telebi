/**
 * Created by fabrizio on 24/02/2024.
 */
Ext.define('prd.global.cdl.cards.dashboard.gridProps.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: "global-cdl-cards-dashboard-gridprops-grid",
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions'
  ],
  minHeight: 250,
  selModel: {
    selType: "checkboxmodel",
    mode: "MULTI",
    checkOnly: true,
    showHeaderCheckbox: false,
    listeners: {

    },
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      items: [
        {
          text: Locale.t("prd.forms.cdl.btn.getOrders.text"),
          ui: "ocra",
          iconCls: "fas fa-sync bd-color-blue",
          loadRemote: true,
          handler: "onLoadProps"
        },
        {
          text: `${Locale.t("prd.forms.cdl.btn.sendOrder.text")}...`,
          iconCls: "fas fa-paper-plane bd-color-blue",
          ui: "green",
          handler: "onSendOrd",
          bind: {
            disabled: "{disableBtnNewOrd}"
          }
        }
      ]
    }
  ],
  scrollable: true,
  viewConfig: {
    emptyText: Locale.t("global.grid.empty")
  },
  columns: [
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      dataIndex: "info_blocco",
      resizable: false,
      items: [
        {
          getClass: function (v, metadata, r) {
            if (r.data.info_blocco !== "") {
              metadata.tdAttr = `data-qtip="${r.data.info_blocco}"`;
              return "bd-action-null x-fas fa-ban bd-color-red";
            } else if (r.get("idOrder") !== "") {
              metadata.tdAttr = `data-qtip="Lavoriazione già effettuata:<hr>${r.get("idOrder")}"`;
              return "bd-action-null x-fas fa-link bd-color-blue";
            }
            return "bd-action-null x-fas y-action-no";
          },
        },
      ],
    },
    { text: Locale.t('prd.forms.cdl.columns.lab'), dataIndex: 'lab', minWidth: 200, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.partNo'), dataIndex: 'cdArt', minWidth: 100, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.operation'), dataIndex: 'operation', minWidth: 100, width: 200 },
    { text: Locale.t('prd.forms.cdl.columns.operStatusCode'), dataIndex: 'oper_status_code', minWidth: 100, width: 180 },
    {
      text: Locale.t('prd.forms.cdl.columns.description'), dataIndex: 'description', minWidth: 200, flex: 1,
      renderer: function (value, metadata, record) {
        metadata.tdAttr = 'data-qtip="' + value + '"';
        return value
      },
    },
  ]
});