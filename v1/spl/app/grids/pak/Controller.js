
/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("spl.grids.pak.Controller", {
  extend: "spl.grids.GridBase",
  alias: "controller.v1-spl-grids-pak",
  mixins: [
    "spl.grids.fat.mixin.FiltroController"
  ],
  requires: [
    "spl.grids.pak.Columns",
    "spl.global.invia.Btn",
    "spl.global.firma.Btn",
    "spl.global.stampa.Btn",
    "spl.global.filtri.stato_invio.Fieldset",
    "spl.global.filtri.stato_doc.Fieldset"
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
    ];

    // Inserisco tasto Invia-email
    if (this.checkRuoli(["99", "10", "11"])) {
      this.listBtnTop.push(
        Ext.create("spl.global.invia.Btn", { scope: this })
      );
    }

    // Inserisco tasto Stampa
    this.listBtnTop.push(
      Ext.create("spl.global.stampa.Btn", { scope: this })
    );

    this.callParent(arguments);

    this.initFiltri();

    this.filtriStatoInvio = Ext.create("spl.global.filtri.stato_invio.Fieldset", {
      listeners: {
        scope: this,
        afterRender: "afterRenderStatusMail"
      }
    })
    this.filtriStatoDoc = Ext.create("spl.global.filtri.stato_doc.Fieldset", {
      listeners: {
        scope: this,
        afterRender: "afterRenderStatusDoc"
      }
    })
    this.panelWest = Ext.create("Ext.panel.Panel", {
      tag: "pak",
      items: [
        this.filtriStatoInvio,
        this.filtriStatoDoc
      ]
    })
  },
  onLoadStore: function (store) {
    this.onUpdateWest(store, this);
    this.callParent(arguments)
  },
  onBeforeload: function (store) {
    let vm = this.getViewModel(),
      pattern = vm.get("pattern")

    // Filtro stato mail
    let status_mail = this.filtriStatoInvio.down("checkboxgroup").getChecked();
    Ext.global.Vars.confMod.grids[this.modelFiltri].filtri.status_mail = {}
    if (status_mail.length > 0) {
      for (const i of status_mail) {
        Ext.global.Vars.confMod.grids[this.modelFiltri].filtri.status_mail[i.name] = i.value
      }
    }

    // Filtro stato documento
    let status_doc = this.filtriStatoDoc.down("checkboxgroup").getChecked();
    Ext.global.Vars.confMod.grids[this.modelFiltri].filtri.status_doc = {}
    if (status_doc.length > 0) {
      for (const i of status_doc) {
        Ext.global.Vars.confMod.grids[this.modelFiltri].filtri.status_doc[i.name] = i.value
      }
    }

    //FTOP Gestione filtri top
    if (this.modelFiltri) {
      store.getProxy().extraParams = {
        filtri: JSON.stringify(Ext.global.Vars.confMod.grids[this.modelFiltri].filtri),
        pattern: pattern
      }
    }
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("spl.grids.documenti.column." + value) + '"';
    }
  },
  onafterrendergrid: function (grid) {
    // const g = this.getView().west.down('grid'),
    //   storeTrasp = this.getViewModel().getStore('storeTrasp');
    // g.setStore(storeTrasp);
    // storeTrasp.load();

    grid.myColumns = Ext.create("spl.grids.pak.Columns").myColumns;
    this.callParent(arguments);

    this.getView().fireEvent("updateWest", this.panelWest)

  },

  reloadGrid: function () {
    this.callParent(arguments)
  },
  onUpdateWest: function (store) {
    // let dati = "Dati da passare in aggiornamento";
    // if (!this.panelWest) {
    //   this.panelWest = Ext.create("Ext.panel.Panel", {
    //     title: "PAK",
    //     tag: "pak"
    //   })
    //   this.getView().fireEvent("updateWest", this.panelWest)
    // }
    // if (store) {
    //   // Gestione caricamento dati west
    //   this.panelWest.setTitle("reload-" + Math.random(4))
    // }
  }
});
