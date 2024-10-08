/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("ord.global.firma.Btn", {
  extend: "Ext.button.Button",
  xtype: "ord-global-btn-firma",
  requires: [
    "ord.global.firma.Windows"
  ],
  tooltip: Locale.t("ord.grids.documenti.btn.firma.tooltip"),
  text: Locale.t("ord.grids.documenti.btn.firma.text"),
  ui: "blue",
  iconCls: "x-fas fa-pen-square",
  handler: function () {
    let records = this.getView().getSelectionModel().getSelection();
    if (records.length === 0) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        msg: Locale.t("ord.grids.documenti.winfirma.erroreselect"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
      });
      return;
    }

    // Recupero solo valori data
    let recordsGood = records.map((record) => record.data);

    // deselezioni record seleziona sulla vista
    this.getView().getSelectionModel().deselectAll();
    let win = Ext.create("ord.global.firma.Windows", {
      recordsGood: recordsGood,
    });
    win.show();
    win.on("closeFirmaOk", this.onCloseFirmaOk, this);
  },
});
