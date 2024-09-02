/**
 * Created by fabrizio on 27/06/22.
 */
let SpcUser = [];
Ext.define("bofpub.view.main.Controller", {
  extend: "portal.v1.public.main.Controller",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.main",
  requires: [
    "bofpub.view.grid.ddt.Grid",
    "bofpub.view.grid.fat.Grid",
    "bofpub.view.grid.ntc.Grid",
    "bofpub.view.grid.pak.Grid",
    'Ext.panel.Panel',
    'Ext.toolbar.Toolbar',
    'bofpub.view.grid.cont.Grid',
    'bofpub.view.grid.ord.Grid'
  ],
  onAfterRender: function () {
    const me = this;
    //inizializzo tasti nascosti
    this.panels = {
      ddt: Ext.create("bofpub.view.grid.ddt.Grid", { itemId: "ddt", setCfgPer: false, opened: false, hidden: true }),
      fat: Ext.create("bofpub.view.grid.fat.Grid", { itemId: "fat", setCfgPer: false, opened: false, hidden: true }),
      pak: Ext.create("bofpub.view.grid.pak.Grid", { itemId: "pak", setCfgPer: false, opened: false, hidden: true }),
      ntc: Ext.create("bofpub.view.grid.ntc.Grid", { itemId: "ntc", setCfgPer: false, opened: false, hidden: true }),
      ord: Ext.create("bofpub.view.grid.ord.Grid", { itemId: "ord", setCfgPer: false, opened: false, hidden: true }),
      cont: Ext.create("bofpub.view.grid.cont.Grid", { itemId: "cont", setCfgPer: false, opened: false, hidden: true }),
    };

    this.toolbar = Ext.create("Ext.toolbar.Toolbar", {
      border: 2,
      style: {
        borderColor: "#bfbfbf",
        borderStyle: "solid",
        "border-width": "1px !important",
        "background-color": "#E4E5E4",
      },
      items: [
        {
          ui: "acblue",
          itemId: "ddt",
          text: Locale.t("bofpub.grids.ddt.text"),
          handler: "openGrid",
          bind: { hidden: "{btn.ddt}" },
        },
        {
          ui: "acblue",
          itemId: "fat",
          text: Locale.t("bofpub.grids.fat.text"),
          handler: "openGrid",
          bind: { hidden: "{btn.fat}" },
        },
        {
          ui: "acblue",
          itemId: "ntc",
          text: Locale.t("bofpub.grids.ntc.text"),
          handler: "openGrid",
          bind: { hidden: "{btn.ntc}" },
        },
        {
          ui: "acblue",
          itemId: "pak",
          text: Locale.t("bofpub.grids.pak.text"),
          handler: "openGrid",
          bind: { hidden: "{btn.pak}" },
        },
        {
          ui: "acblue",
          itemId: "ord",
          text: Locale.t("bofpub.grids.ord.text"),
          handler: "openGrid",
          bind: { hidden: "{btn.ord}" },
        },
        {
          ui: "acblue",
          itemId: "cont",
          text: Locale.t("bofpub.contabile.title"),
          handler: "openGrid",
          bind: { hidden: "{btn.cont}" },
        }
      ],
    });

    Ext.Ajax.request({
      url: Backend.REST_API + "getpanels/",
      method: "GET",
      success: function (record) {
        let res = Ext.decode(record.responseText);
        me.checkPanels(res);
      },
      failure: function (response) {
        let resp = Ext.decode(response.responseText);
        let notPanels = Ext.create("Ext.panel.Panel", {
          title: "Server error",
          items:[
              {xtype:'box',html:'<br>Following error received from server:<br><br><div style="color:blue;font-size:20px;font-weight:bold">'+resp['msg']+'</div>'}
          ]
        });
        me.getView().setActiveItem(notPanels);
      },
    });
  },

  // Verifico attivazione view e tasto
  checkPanels: function (res) {
    let me = this,
      vm = me.getViewModel(),
      btn = vm.get("btn");
    //imposto i pannelli nascosti
    btn['ddt'] = true
    btn['fat'] = true
    btn['pak'] = true
    btn['ntc'] = true
    btn['ord'] = true
    btn['cont'] = true
    if (res.length > 0) {
      for (let x = 0; x < res.length; x++) {
        if (this.panels[res[x]]) {
          me.panels[res[x]].hidden = false;
          btn[res[x]] = false;
        }
      }
      // Abilito toolbar shelta viste
      this.getView().addDocked(this.toolbar);

      // Attivo primo pannello
      this.getView().add(this.panels[res[0]]);
  //    this.panels.pak.opened = true;
      this.getView().setActiveItem(this.panels[res[0]]);
      this.panels[res[0]].on("dwnDocument", "onDwnDocument", this);

      // setto colore tasto attivo
      this.btnActive = res[0];
      this.toolbar.down("#" + res[0]).setUI("ocra");
    } else {
      //TODO open panel not autorizzed
      let notPanels = Ext.create("Ext.panel.Panel", {
        title: "ACCESSO NEGATO",
        html: "<br><h3>Sessione scaduta o utenza non abilitata a questa vista</h3>",
      });
      this.getView().add(notPanels);
      this.getView().setActiveItem(notPanels);
    }
  },
  onafterrendergrid: function (grid) { },

  // Azione tasto gestione viste
  openGrid: function (panel) {
    if (this.panels[panel.itemId]) {
      if (this.panels[panel.itemId].opened === false) {
        this.panels[panel.itemId].opened = true;
        this.getView().add(this.panels[panel.itemId]);
        this.panels[panel.itemId].on("dwnDocument", "onDwnDocument", this);
      }
      this.getView().setActiveItem(this.panels[panel.itemId]);
      this.toolbar.down("#" + this.btnActive).setUI("acblue");
      this.toolbar.down("#" + panel.itemId).setUI("ocra");
      this.btnActive = panel.itemId;
    }
  },
  onDwnDocument: function (row) {
    let me=this
    if (row.typeFile === "xlsx" || row.typeFile === "pdf") {
      me.view.el.mask(Locale.t('global.actions.incorso'));
      let firma=0 //default firma = -1 vale solo x le bolle
      if (row.tag==='BOL') {
        firma=row.data.firma
      }
      Ext.Ajax.request({
        url: Backend.REST_API + "get" + row.typeFile + "/",
        method: "POST",
        binary: true,
        jsonData: {
          id: row.id, //id record testata
          tag: row.tag, // tag app (bol, fat, ord, pck)
          typeFile: row.typeFile, //tipo file
          firma:firma, //firma (x la bolla)
          nomefile:row.data.num_doc+'_'+row.data.year
        },
        success: function (response) {
          me.view.el.unmask();
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          let headers = response.getAllResponseHeaders();
          let fileName = response.getResponseHeader("Content-Disposition").split("filename=")[1];
          if (fileName === "") {
            //se non ho filename di ritorno (eccezione) do un nome generico
            fileName = "Download_file." + row.typeFile;
          }
          let blob = new Blob([response.responseBytes], { type: headers["content-type"] });
          let binaryFile = window.URL.createObjectURL(blob);
          a.href = binaryFile;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(binaryFile);
        },
        failure: function () {
          me.view.el.unmask();
          Ext.Msg.alert("ATTENZIONE", "Errore, file non trovato...");
        },
      });
    }
  },
});
