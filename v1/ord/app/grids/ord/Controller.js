/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("ord.grids.ord.Controller", {
  extend: "ord.grids.GridBase",
  alias: "controller.v1-grids-ord",
  requires: [
    "ord.global.invia.Btn",
    "ord.global.stampa.Btn",
    "ord.grids.ord.Columns",
    'ord.global.esporta.Btn',
    'ord.grids.ord.component.filtri.comboAzienda'
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
    ];
    //filtro azienda
    this.listBtnTop.push(
        Ext.create("ord.grids.ord.component.filtri.comboAzienda", { scope: this })
    );
    // Inserisco tasto Invia-email
    if (this.checkRuoli(["99", "2"])) {
      this.listBtnTop.push(
          Ext.create("ord.global.invia.Btn", { scope: this })
      );
    }
    // Inserisco tasto Stampa
    this.listBtnTop.push(
        Ext.create("ord.global.stampa.Btn", { scope: this })
    );
    // Inserisco tasto esportazione fabbisogno componenti
    if (this.checkRuoli(["99", "10"])) {
      this.listBtnTop.push(
          Ext.create("ord.global.esporta.Btn", { scope: this })
      );
    }
    this.callParent(arguments);
  },
  //filtri azienda
  onFiltraAzienda: function(cmb) {
    let me=this
    let grid = me.getViewModel().getView(); //grid
    if (grid) {
      let store = grid.getStore(); //store
      if (store) {
        store.getProxy().extraParams.azienda = cmb.value
        store.load();
      }
    }
  },
  onSpecialkeyFiltroAzienda: function (item, e) {
    let me=this
    if (e.getKey() === e.ENTER) {
      if (!item.getValue()) {
        let grid = me.getViewModel().getView(); //grid
        if (grid) {
          let store = grid.getStore(); //store
          if (store) {
            store.getProxy().extraParams.azienda = ''
            store.load();
          }
        }
      }
    }
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("ord.grids.documenti.column." + value) + '"';
    }
  },
  onafterrendergrid: function (grid) {
    const g = this.getView().west.down('grid'),
      storeAge = this.getViewModel().getStore('storeAge');
    g.setStore(storeAge);
    storeAge.load();
    grid.myColumns = Ext.create("ord.grids.ord.Columns").myColumns;
    this.callParent(arguments);
  }
});
