/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("orf.grids.orf.Controller", {
  extend: "orf.grids.GridBase",
  alias: "controller.v1-grids-orf",
  requires: [
    "orf.global.invia.Btn",
    "orf.global.stampa.Btn",
    "orf.grids.orf.Columns",
    'orf.global.esporta.Btn'
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
    ];
    // Inserisco tasto Invia-email
    if (this.checkRuoli(["99", "2"])) {
      this.listBtnTop.push(
        Ext.create("orf.global.invia.Btn", { scope: this })
      );
    }
    // Inserisco tasto Stampa
    this.listBtnTop.push(
      Ext.create("orf.global.stampa.Btn", { scope: this })
    );
    // Inserisco tasto esportazione fabbisogno componenti
    if (this.checkRuoli(["99", "10"])) {
      this.listBtnTop.push(
        Ext.create("orf.global.esporta.Btn", { scope: this })
      );
    }
    this.callParent(arguments);
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("orf.grids.documenti.column." + value) + '"';
    }
  },
  onafterrendergrid: function (grid) {
    grid.myColumns = Ext.create("orf.grids.orf.Columns").myColumns;
    this.callParent(arguments);
  }
});
