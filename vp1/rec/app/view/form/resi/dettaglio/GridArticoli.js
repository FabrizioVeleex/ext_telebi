/**
 * Created by luca on 17/03/2017.
 */
Ext.define("recpub.view.form.resi.dettaglio.GridArticoli", {
  extend: "Ext.grid.Panel",
  requires: ["Ext.grid.column.Date"],
  minHeight: 120,
  bind: {
    store: "{storearticoli}",
  },
  minWidth: 700,
  xtype: "gridarticoli",
  columns: [
    //FIXME gestisci larghezza colonne in base alla finestra!!!
    { text: Locale.t("recpub.grids.articoli.columns.cdars"), width: 100, menuDisabled: true, dataIndex: "cdars" },
    { text: Locale.t("recpub.grids.articoli.columns.depar"), cls: "clsdepar", flex: 1, menuDisabled: true, dataIndex: "depar" },
    { text: Locale.t("recpub.grids.articoli.columns.causale"), cls: "clscausale", flex: 1, menuDisabled: true, dataIndex: "causale" },
    { text: Locale.t("recpub.grids.articoli.columns.nrbos"), width: 70, menuDisabled: true, dataIndex: "nrbos" },
    {
      text: Locale.t("recpub.grids.articoli.columns.dtbos"),
      width: 100,
      menuDisabled: true,
      dataIndex: "dtbos",
      xtype: "datecolumn",
      format: "d/m/Y",
    },
    // {text: Locale.t('recpub.gridarticoli.qta'), width:30, menuDisabled: true, dataIndex: 'qta'},
    { text: Locale.t("recpub.grids.articoli.columns.dossier"), width: 100, menuDisabled: true, dataIndex: "pcdos" },
  ],
});
