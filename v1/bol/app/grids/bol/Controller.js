
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("bol.grids.bol.Controller", {
  extend: "bol.grids.GridBase",
  alias: "controller.v1-bol-grids-bol",
  requires: [
    "bol.grids.bol.Columns",
    "bol.global.invia.Btn",
    "bol.global.firma.Btn",
    "bol.global.stampa.Btn",
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
    ];

    // Iserisco tasto Firma
    this.listBtnTop.push(
      Ext.create("bol.global.firma.Btn", { scope: this })
    );

    // Inserisco tasto Invia-email
    if (this.checkRuoli(["99", "10"])) {
      this.listBtnTop.push(
        Ext.create("bol.global.invia.Btn", { scope: this })
      );
    }

    // Inserisco tasto Stampa
    this.listBtnTop.push(
      Ext.create("bol.global.stampa.Btn", { scope: this })
    );

    this.callParent(arguments);
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("bol.grids.documenti.column." + value) + '"';
    }
  },
  onafterrendergrid: function (grid) {
    const g = this.getView().west.down('grid'),
      storeTrasp = this.getViewModel().getStore('storeTrasp');
    g.setStore(storeTrasp);
    storeTrasp.load();

    grid.myColumns = Ext.create("bol.grids.bol.Columns").myColumns;
    this.callParent(arguments);
  },


  reloadGrid: function () {
    this.callParent(arguments)
  },
});
