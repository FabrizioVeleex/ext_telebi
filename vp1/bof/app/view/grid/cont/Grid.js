/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.cont.Grid", {
  extend: "portal.v1.view.grids.DefaultGrid",
  requires: [
    "Ext.grid.column.Date",
    'Ext.util.Format',
    'bofpub.view.grid.cont.Controller',
    'bofpub.view.grid.cont.ViewModel'
  ],
  controller: "cont",
  viewModel: "cont",
  minHeight: 150,
  title: Locale.t("bofpub.contabile.title"),
  height: 600,
  bind: {
    store: "{store}",
    title: "{titolo}",
  },
  columns: [
    { text: Locale.t("bofpub.contabile.columns.datae4"),dataIndex: "datae4", width: 120, xtype: "datecolumn", format: "d/m/Y", filter: { type: "date", dateFormat: "Ymd" }},
    { text: Locale.t("bofpub.contabile.columns.aarif4"), dataIndex: "aarif4", width: 100},
    { text: Locale.t("bofpub.contabile.columns.nurif4"), dataIndex: "nurif4", width: 120, filter: { type: "string" } },
    {text: Locale.t("bofpub.contabile.columns.dadoc4"),dataIndex: "dadoc4", width: 150, xtype: "datecolumn", format: "d/m/Y", filter: { type: "date", dateFormat: "Ymd" }},
    {text: Locale.t("bofpub.contabile.columns.dasca4"),dataIndex: "dasca4", width: 150, xtype: "datecolumn", format: "d/m/Y", filter: { type: "date", dateFormat: "Ymd" }},
    {text: Locale.t('bofpub.contabile.columns.impre4'), dataIndex: 'impre4',width:150, filter: {type: 'number'},
      renderer: function (v) {
        return Ext.util.Format.currency(v, '€ ', 2);
      }
    },
    { text: Locale.t("bofpub.contabile.columns.esito4"), dataIndex: "esito4", flex: 1, filter: { type: "string" } },
  ],
  listeners: {},
});
