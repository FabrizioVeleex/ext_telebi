
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("pak.grids.pak.Controller", {
  extend: "pak.grids.GridBase",
  alias: "controller.v1-pak-grids-pak",
  requires: [
    "pak.grids.pak.Columns",
    "pak.global.invia.Btn",
    "pak.global.firma.Btn",
    "pak.global.stampa.Btn",
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
    ];

    // Iserisco tasto Firma
    this.listBtnTop.push(
      Ext.create("pak.global.firma.Btn", { scope: this })
    );

    // Inserisco tasto Invia-email
    if (this.checkRuoli(["99", "10"])) {
      this.listBtnTop.push(
        Ext.create("pak.global.invia.Btn", { scope: this })
      );
    }

    // Inserisco tasto Stampa
    this.listBtnTop.push(
      Ext.create("pak.global.stampa.Btn", { scope: this })
    );

    this.callParent(arguments);
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("pak.grids.documenti.column." + value) + '"';
    }
  },
  onafterrendergrid: function (grid) {
    // const g = this.getView().west.down('grid'),
    //   storeTrasp = this.getViewModel().getStore('storeTrasp');
    // g.setStore(storeTrasp);
    // storeTrasp.load();

    grid.myColumns = Ext.create("pak.grids.pak.Columns").myColumns;
    this.callParent(arguments);
  },


  reloadGrid: function () {
    this.callParent(arguments)
  },
});
