/**
 * Created by fabrizio on 31/12/23.
 */
Ext.define("spl.grids.pak.mixin.FiltroController", {
  extend: "portal.v1.view.filtri.DefaultController",
  requires: [
    "portal.v1.view.filtri.datarange.Fieldset",
    "portal.v1.view.filtri.Fitro"
  ],
  initFiltri: function () {
    try {
      this.modelFiltri = "pak"
      this.filtri_checkconfig();
      this.filtri_popolateData()
      //-------------------------------------------------
      // Genero oggetto per il controller
      this.filtriPanel = {
        btn: { text: "Filtri", handler: "filtri_onTogglePannel", bind: { iconCls: "{filtri.btn.icon}" }, enableToggle: true },
        panel: Ext.create("portal.v1.view.filtri.Fitro"),
        filtri: {
          data_doc: {
            fs: Ext.create("portal.v1.view.filtri.datarange.Fieldset", { myTag: "bol", myName: "data_doc", title: Locale.t('spl.grids.documenti.column.data_doc') }),
          },
        }
      }

      this.filtriPanel.panel.add(
        this.filtriPanel.filtri.data_doc.fs,
      )

      this.toolbar.add(['->', this.filtriPanel.btn]);
      this.getView().addDocked(this.filtriPanel.panel);

    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },


  filtri_checkconfig: function () {

    // Verifico se ho gia gli oggetti per il salvataggio delle configurazioni
    try {
      if (Ext.global.Vars.confMod.grids[this.modelFiltri] === undefined) {
        Ext.global.Vars.confMod.grids[this.modelFiltri] = {}
      }
      let filtri = Ext.global.Vars.confMod.grids[this.modelFiltri].filtri;
      if (filtri === undefined) {
        filtri = { pressed: false }
      }

      if (filtri.status_mail === undefined) {
        filtri.status_mail = {}
      }

      if (filtri.status_doc === undefined) {
        filtri.status_doc = {}
      }

      if (filtri.data_doc === undefined) {
        filtri.data_doc = { type: 'date', start: "", end: "" }
      }

      Ext.global.Vars.confMod.grids[this.modelFiltri].filtri = filtri

    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },
  filtri_popolateData: function () {
    try {
      let me = this,
        vm = me.getViewModel(),
        getFiltri = Ext.global.Vars.confMod.grids[this.modelFiltri].filtri;


      if (getFiltri.data_doc.start) {
        let dd = new Date(getFiltri.data_doc.start);
        if (!isNaN(dd)) getFiltri.data_doc.start = dd;

      }
      if (getFiltri.data_doc.end) {
        let dd = new Date(getFiltri.data_doc.end);
        if (!isNaN(dd)) getFiltri.data_doc.end = dd;
      }
      vm.set("filtri", {
        btn: {
          icon: "fas fa-caret-square-down",
        },
        params: Ext.global.Vars.confMod.grids[this.modelFiltri].filtri
      })

    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },
  afterRenderStatusDoc: function (pnl) {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get("filtri");

    if (filtri.params.status_doc.status_doc_0) {
      pnl.items.items[0].items.items[0].setValue(true)
    }
    if (filtri.params.status_doc.status_doc_1) {
      pnl.items.items[0].items.items[1].setValue(true)
    }
  },
  afterRenderStatusMail: function (pnl) {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get("filtri");

    if (filtri.params.status_mail.status_mail_N1) {
      pnl.items.items[0].items.items[0].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_0) {
      pnl.items.items[0].items.items[1].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_1) {
      pnl.items.items[0].items.items[2].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_3) {
      pnl.items.items[0].items.items[3].setValue(true)
    }
    if (filtri.params.status_mail.status_mail_4) {
      pnl.items.items[0].items.items[4].setValue(true)
    }
  }
})
