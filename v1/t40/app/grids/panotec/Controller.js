/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("t40.grids.panotec.Controller", {
  extend: "t40.grids.GridBase",
  alias: "controller.v1-grids-panotec",
  requires: [
    "t40.grids.panotec.Columns",
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
    ];

    // Inserisco tasto Invia-email
    // if (this.checkRuoli(["99", "10"])) {
    //   this.listBtnTop.push(
    //     Ext.create("t40.global.invia.BtnInvia", { scope: this })
    //   );
    // }

    // Inserisco tasto Stampa
    // this.listBtnTop.push(
    //   Ext.create("t40.global.stampa.Btn", { scope: this })
    // );

    this.callParent(arguments);
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("t40.grids.documenti.column." + value) + '"';
    }
  },
  onitemdblclick: function (view, record) {
    this.getView().fireEvent('apriFooter', record)
    //this.callParent(arguments);
  },
  onafterrendergrid: function (grid) {
    const g = this.getView().west.down('grid')


    grid.myColumns = Ext.create("t40.grids.panotec.Columns").myColumns;
    this.callParent(arguments);
  },
});
