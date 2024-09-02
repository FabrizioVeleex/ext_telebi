
/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define("spl.grids.bol.Controller", {
  extend: "spl.grids.GridBase",
  alias: "controller.v1-spl-grids-bol",
  mixins: [
    "spl.grids.bol.mixin.FiltroController"
  ],
  requires: [
    "spl.grids.bol.Columns",
    "spl.global.invia.Btn",
    "spl.global.firma.Btn",
    "spl.global.stampa.Btn",
    "spl.global.filtri.stato_invio.Fieldset",
    "spl.global.filtri.stato_doc.Fieldset"
  ],
  init: function () {
    try {
      this.tagGrid = "bol";
      //gestione menu
      this.listBtnTop = [
        { handler: "reloadGrid", iconCls: "pictos pictos-refresh" },
      ];

      // Inserisco tasto Firma
      this.listBtnTop.push(
        Ext.create("spl.global.firma.Btn", { scope: this })
      );

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

      // verifico presenza oggetto confmod
      if (Ext.global.Vars.confMod.grids.bol === undefined) {
        Ext.global.Vars.confMod.grids.bol = {}
      }

      this.callParent(arguments);

      this.initFiltri(); //FTOP Gestione filtri top

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
        tag: "bol",
        items: [
          this.filtriStatoInvio,
          this.filtriStatoDoc
        ]
      })
    } catch (error) {
      console.log(arguments.callee.name, error);
    }
  },
  onLoadStore: function (store) {
    this.callParent(arguments);
  },
  onBeforeload: function (store) {
    let vm = this.getViewModel(),
      pattern = vm.get("pattern"),
      filtri = ""

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

    if (Ext.global.Vars.confMod.grids[this.modelFiltri]) {
      filtri = Ext.global.Vars.confMod.grids[this.modelFiltri].filtri;
      vm.set("filtri", {
        btn: {
          icon: "fas fa-caret-square-down",
        },
        params: Ext.global.Vars.confMod.grids[this.modelFiltri].filtri
      })
    }
    //FTOP Gestione filtri top
    if (this.modelFiltri) {
      store.getProxy().extraParams = {
        filtri: JSON.stringify(filtri),
        pattern: pattern
      }
    }
    // this.callParent(arguments);
  },
  onRenderTipoDoc: function (value, meta) {
    if (value !== "") {
      meta.css = "bpicongrid " + value + "-16";
      meta.tdAttr =
        'data-qtip="' + Locale.t("spl.grids.documenti.column." + value) + '"';
    }
  },
  onafterrendergrid: function (grid) {
    grid.myColumns = Ext.create("spl.grids.bol.Columns").myColumns;
    this.callParent(arguments);

    this.getView().fireEvent("updateWest", this.panelWest)
  }
});
