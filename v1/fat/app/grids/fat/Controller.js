/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("fat.grids.fat.Controller", {
  extend: "fat.grids.GridBase",
  alias: "controller.v1-grids-fat",
  requires: [
    "fat.grids.fat.Columns",
    "fat.global.invia.Btn",
    "fat.global.stampa.Btn",
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
    ];

    // Inserisco tasto Invia-email
    if (this.checkRuoli(["99", "10"])) {
      this.listBtnTop.push(
        Ext.create("fat.global.invia.Btn", { scope: this })
      );
    }

    // Inserisco tasto Stampa
    this.listBtnTop.push(
      Ext.create("fat.global.stampa.Btn", { scope: this })
    );

    this.callParent(arguments);
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("fat.grids.documenti.column." + value) + '"';
    }
  },
  onafterrendergrid: function (grid) {
    grid.myColumns = Ext.create("fat.grids.fat.Columns").myColumns;
    this.callParent(arguments);
  },
});
