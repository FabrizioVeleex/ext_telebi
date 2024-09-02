/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("spl.global.firma.Btn", {
  extend: "Ext.button.Button",
  xtype: "spl-global-btn-firma",
  requires: [
    "spl.global.firma.Windows"
  ],
  tooltip: Locale.t("spl.grids.documenti.btn.firma.tooltip"),
  text: Locale.t("spl.grids.documenti.btn.firma.text"),
  ui: "blue",
  iconCls: "x-fas fa-pen-square",
  handler: function () {
    let records = this.getView().getSelectionModel().getSelection();
    if (records.length === 0) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        msg: Locale.t("spl.grids.documenti.winfirma.erroreselect"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
      });
      return;
    }

    // Recupero solo valori data
    let totDocOK = 0, totDocKo = 0, recordPrint = []
    for (const r of records) {
      if (r.data.cd_sogg_fat === "" || r.data.spool === -2 || r.data.spool === 0) {
        totDocKo++;
      } else {
        totDocOK++;
        recordPrint.push(r.data);
      }
    }
    let recordsGood = records.map((record) => {
      let r = record.data;
      return r;
    });

    // deselezioni record seleziona sulla vista
    this.getView().getSelectionModel().deselectAll();
    let win = Ext.create("spl.global.firma.Windows", {
      recordPrint: recordPrint,
      recordsGood: recordsGood,
      totDocOK: totDocOK,
      totDocKo: totDocKo
    });
    win.show();
    win.on("closeFirmaOk", this.onCloseFirmaOk, this);
  },
});
