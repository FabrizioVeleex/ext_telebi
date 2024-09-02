/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
let SpcUser = [];
Ext.define("skd.view.main.Controller", {
  extend: "portal.v1.view.main.ViewController",
  alias: "controller.main",
  requires: [
    "Ext.container.Container",
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.data.writer.Json",
    "Ext.layout.container.Border",
    "Ext.toolbar.Toolbar",
    "Ext.util.Format",
    "Ext.window.Window",
    "skd.store.forms.cruscotto.Giacenza",
    "skd.store.forms.cruscotto.Previsioni",
    "skd.store.forms.filtri.ComboLab",
    "skd.view.forms.cruscotto.Cruscotto",
    "skd.view.forms.cruscotto.Giacenza",
    "skd.view.forms.cruscotto.PrevisioniForniture",
    "skd.view.forms.footer.Panel",
    "skd.view.forms.pick.Cards",
    "skd.view.forms.setting.Cards",
    "skd.view.forms.top.Filtri",
    "skd.view.forms.top.FiltriCdl",
    "skd.view.forms.top.FiltriMancanti",
    "skd.view.forms.top.Toolbar",
    "skd.view.grids.cdl.Cdl",
    "skd.view.grids.lab.Lab",
    "skd.view.grids.operatore.Operatore",
    "skd.view.grids.partnum.Partnum",
    "skd.view.grids.reparto.Reparto",
    "skd.view.grids.mancanti.Mancanti",
    "skd.view.main.Center",
    "skd.view.main.West",
    "skd.view.main.WestClose",
  ],
  mixins: [
    "portal.v1.global.Util",
    'skd.view.main.mixins.ControllerFiltri',
    'skd.view.main.mixins.ControllerFiltriCdl',
    'skd.view.main.mixins.ControllerFiltriMancanti',
    'skd.view.main.mixins.onSelect',
    'skd.view.main.mixins.GenerateObjects'
  ],

  onAfterRender: function () {
    let vm = this.getViewModel();
    let confMod = Ext.global.Vars.confMod;
    this.panels = {};
    this.polling = {
      scope: this,
      run: function () {
        this.pollingSetting(this);
      },
      interval: 5000, //5 second
    };
    Ext.TaskManager.start(this.polling);


    if (confMod) {
      this.onAfterRender_filtri()
      this.onAfterRender_filtri_cdl()
      this.onAfterRender_filtri_mancanti()
      vm.set("connection", confMod.main.connection);
    }

    //riporto versione
    if (Ext.global.Vars.infoApp.versione) {
      vm.set("versione", Ext.global.Vars.infoApp.version.num);
      vm.set("dataVersione", Ext.global.Vars.infoApp.version.data);
    }
    this.logUser = Ext.create("portal.v1.view.forms.loguser.Panel").on(
      "closeLogUser",
      "onCloseLogUser"
    );

    this.logDev = Ext.create("portal.v1.view.grids.logdev.Panel").on(
      "closeLogDev",
      "onCloseLogDev"
    );

    this.index = Ext.create("portal.v1.view.main.Index", {
      listeners: {
        afterRender: "onAfterRenderIndex",
      },
    });
    this.getView().add(this.index);
    this.getView().setActiveItem(this.index);
  },
  onitemclick: function () { },
  onAfterRenderIndex: function () {
    let me = this,
      vm = this.getViewModel();

    if (Ext.global.Vars.confMod.main.west.collapse === 0) {
      vm.set("westShow", true);
    }
    vm.set("filtri", Ext.global.Vars.confMod.main.filtri);
    vm.set("filtriCdl", Ext.global.Vars.confMod.main.filtriCdl);
    vm.set("filtriMancanti", Ext.global.Vars.confMod.main.filtriMancanti);
    this.generateCenter();
    this.generateCruscotto();
    this.generateFooter();

    this.index.add(this.westClose, this.west, this.center, this.footer);
  },

  onInfoUserApp: function (record) {
    // SpcUser = Ext.decode(record.responseText);
    // this.infoUserApp = Ext.decode(record.responseText);
  },
  onBeforeLoadMenuNode: function (store, operation) {
    if (!operation.node.get("root")) {
    }
  },
  onLoadStoreGrid: function (s) { },
  /* ---------------------------------------------------------------------------------------------------------
   * popolo il tabpanel con le griglie, attivo filtri e toolbar superiore
   * ---------------------------------------------------------------------------------------------------------*/
  generateCenter: function () {
    this.toolBarCenter = Ext.create("skd.view.forms.top.Toolbar");

    this.generateFiltri();
    this.generateGridLab();
    this.generateGridPartnum();
    this.generateGridReparto();
    this.generateGridOperatore();
    this.generateGridCdl();
    this.generateGridMancanti();

    this.containerFiltri = Ext.create("Ext.Container", {
      items: [this.filtri],
    });
    this.containerFiltriCdl = Ext.create("Ext.Container", {
      items: [this.filtriCdl],
    });
    this.containerFiltriMancanti = Ext.create("Ext.Container", {
      items: [this.filtriMancanti],
    });

    this.center = Ext.create("skd.view.main.Center", {
      region: "center",
      dockedItems: [
        this.toolBarCenter,
        this.containerFiltri,
        this.containerFiltriCdl,
        this.containerFiltriMancanti,
      ],
      activeTab: Ext.global.Vars.confMod.main.tabActive,
      items: [
        this.gridLab,
        this.gridPartnum,
        this.gridReparto,
        this.gridOperatore,
        this.gridCdl,
        this.gridMancanti,
      ],
      listeners: {
        tabchange: "onTabChange",
        // vm.set('gridActive',idgrid);
      },
    });
    if (Ext.global.Vars.confMod.main.tabActive !== "") {
      this.center.setActiveTab(Ext.global.Vars.confMod.main.tabActive);
    }
  },

  onTabChange: function (tabPanel, newCard, oldCard) {
    if (oldCard.id === "gridCdl" || newCard.id === "gridCdl") {
      this.onRemoveDataCruscotto();
    }
  },

  /* ---------------------------------------------------------------------------------------------------------
   * attivazione fireEvent sui componenti
   * ---------------------------------------------------------------------------------------------------------*/
  setOnComponent: function (component) {
    component.on("activateGrid", "onActivateGrid", this);
    component.on("toggleFiltri", "onToggleFiltri", this);
    component.on("toggleFiltriCdl", "onToggleFiltriCdl", this);
    component.on("toggleOrderCdl", "onToggleOrderCdl", this);
    component.on("loadDataGrid", "onLoadDataGrid", this);
    component.on("getObjects", "onGetObjects", this);
    component.on("selectCell", "onSelectCell", this);
    component.on("goToGridLab", "onGoToGridLab", this);
    component.on("onResizeNote", "onResizeNote", this);
    component.on("openDettaglioPrep", "onOpenDettaglioPrep", this);

    component.on("openWinMateriali", "onBeforeOpenWinMateriali", this);
  },
  /* ---------------------------------------------------------------------------------------------------------
   * fireEvent: Gestione attivazione tab grid
   * - salvataggio informazione ultima apertura
   * ---------------------------------------------------------------------------------------------------------*/
  onOpenSetting: function (grid) {
    let vm = this.getViewModel();

    this.setting = Ext.create("skd.view.forms.setting.Cards");
    this.setting.on("onCloseSetting", "onCloseSetting", this);
    this.setting.getViewModel().set("connection", vm.get("connection"));
    this.getView().setActiveItem(this.setting);
  },
  onCloseSetting: function () {
    this.getView().setActiveItem(this.index);
  },

  /* ---------------------------------------------------------------------------------------------------------
   * gestione filtri
   * ---------------------------------------------------------------------------------------------------------*/
  onChangeComboProducibilita: function (combo, record) {
    let vm = this.getViewModel(),
      gridActive = vm.get("gridActive"),
      westShow = vm.get("westShow"),
      selectCell = vm.get("selectCell"),
      infoCell = vm.get("infoCell"),
      task = null,
      view = null;

    let grid = this[gridActive.id];
    if (grid.items.items[0] !== undefined) {
      task = new Ext.util.DelayedTask(
        function (grid) {
          let view = grid.items.items[0].getView();
          if (view) {
            grid.fireEvent("reloadGrid");
            if (westShow && typeof infoCell === "object") {
              this.onRemoveDataCruscotto();
              this.onLoadDataCruscotto();
            }
          }
        },
        this,
        [grid]
      );
      task.delay(200);
    }
  },

  onChangeProducibilita: function (field, newValue, eOpts) {
    let vm = this.getViewModel(),
      gridActive = vm.get("gridActive"),
      westShow = vm.get("westShow"),
      selectCell = vm.get("selectCell"),
      infoCell = vm.get("infoCell"),
      grid = null;

    if (gridActive.id === "gridLab") {
      grid = this.gridLab;
    }
    if (gridActive.id === "gridPartnum") {
      grid = this.gridPartnum;
    }
    if (gridActive.id === "gridReparto") {
      grid = this.gridReparto;
    }
    if (gridActive.id === "gridOperatore") {
      grid = this.gridOperatore;
    }

    if (grid) {
      if (grid.items.items[0] !== undefined) {
        let task = new Ext.util.DelayedTask(
          function (grid) {
            let view = grid.items.items[0].getView();
            if (view) {
              grid.fireEvent("reloadGrid");
              if (westShow && typeof infoCell === "object") {
                this.onRemoveDataCruscotto();
                this.onLoadDataCruscotto();
              }
            }
          },
          this,
          [grid]
        );
        task.delay(200);
      }
    }
  },



  /* ---------------------------------------------------------------------------------------------------------
   * gestione attivazione pannello grid
   * ---------------------------------------------------------------------------------------------------------*/
  onActivateGrid: function (grid) {
    let me = this,
      vm = this.getViewModel();
    vm.set("gridActive", grid);
    Ext.global.Vars.confMod.main.tabActive = grid.id;
    if (grid.id === "gridCdl") {
      this.containerFiltri.hide();
      this.containerFiltriMancanti.hide();
      this.containerFiltriCdl.show();
    } else if (grid.id === "gridMancanti") {
      this.containerFiltri.hide();
      this.containerFiltriMancanti.show();
      this.containerFiltriCdl.hide();
    } else {
      this.containerFiltri.show();
      this.containerFiltriMancanti.hide();
      this.containerFiltriCdl.hide();
    }
    this.setConfMod();
  },

  onToggleFiltri: function (btn,) {
    let vm = this.getViewModel();
    if (btn.iconCls === "fas fa-caret-square-down") {
      vm.set("iconFiltri", "fas fa-caret-square-up");
      this.filtri.show();
      Ext.global.Vars.confMod.main.filtri.active = true;
    } else {
      vm.set("iconFiltri", "fas fa-caret-square-down");
      this.filtri.hide();
      Ext.global.Vars.confMod.main.filtri.active = false;
    }
    this.setConfMod();
  },
  onChangeComboProducibilitaCdl: function (combo, record) {
    let grid = this.gridCdl,
      vm = this.getViewModel(),
      westShow = vm.get("westShow"),
      selectCell = vm.get("selectCell"),
      task = null;
    if (grid) {
      task = new Ext.util.DelayedTask(
        function (grid) {
          grid.fireEvent("reloadGrid");
          if (westShow && typeof selectCell === "object") {
            this.onRemoveDataCruscotto();
            this.onLoadDataCruscotto();
          }
        },
        this,
        [grid]
      );
      task.delay(200);
    }
  },
  onToggleFiltriCdl: function (btn) {
    let vm = this.getViewModel();
    if (btn.iconCls === "fas fa-caret-square-down") {
      vm.set("iconFiltriCdl", "fas fa-caret-square-up");
      this.filtriCdl.show();
      Ext.global.Vars.confMod.main.filtri.active_cdl = true;
    } else {
      vm.set("iconFiltriCdl", "fas fa-caret-square-down");
      this.filtriCdl.hide();
      Ext.global.Vars.confMod.main.filtri.active_cdl = false;
    }
    this.setConfMod();
  },
  onToggleOrderCdl: function (btn) {
    let vm = this.getViewModel();
    let v = vm.get("valueOrderCdl")
    if (v === "data_ordine_cliente") {
      vm.set("valueOrderCdl", "data_ini_preparazione");
      vm.set("textOrderCdl", "Ordinato per preparazione");
      Ext.global.Vars.confMod.main.filtri.valueOrderCdl = 'data_ini_preparazione';
    } else {
      vm.set("valueOrderCdl", "data_ordine_cliente");
      vm.set("textOrderCdl", "Ordinato per ordine cliente");
      Ext.global.Vars.confMod.main.filtri.valueOrderCdl = 'data_ordine_cliente';
    }
    this.setConfMod();
    this.onLoadDataGrid('gridCdl', false)
  },
  onChangeProducibilitaCdl: function (field, newValue, eOpts) {
    let grid = this.gridCdl,
      vm = this.getViewModel(),
      selectCell = vm.get("selectCell"),
      westShow = vm.get("westShow");
    if (grid) {
      let task = new Ext.util.DelayedTask(
        function (grid) {
          grid.fireEvent("reloadGrid");
          if (westShow && typeof selectCell === "object") {
            this.onRemoveDataCruscotto();
            this.onLoadDataCruscotto();
          }
        },
        this,
        [grid]
      );
      task.delay(200);
    }
  },


  onLoadOtherStore: function (idgrid) {
    let me = this,
      vm = this.getViewModel(),
      task = null;

    if (idgrid === "gridPartnum" || idgrid === "gridLab") {
      this.onLoadDataGrid("gridReparto", false);
      this.onLoadDataGrid("gridOperatore", false);
    }
    if (idgrid === "gridReparto") {
      this.onLoadDataGrid("gridLab", false);
      this.onLoadDataGrid("gridOperatore", false);
    }
    if (idgrid === "gridOperatore") {
      this.onLoadDataGrid("gridLab", false);
      this.onLoadDataGrid("gridReparto", false);
    }
  },
  onAfterLoadDataGrid: function (idgrid, resp) {
    let vm = this.getViewModel();
    if (idgrid === "gridPartnum" || idgrid === "gridLab") {
      this.gridPartnum.fireEvent("prepareStoreData", resp, idgrid);
      this.gridLab.fireEvent("prepareStoreData", resp, idgrid);
    }
    if (idgrid === "gridReparto") {
      this.gridReparto.fireEvent("prepareStoreData", resp, idgrid);
    }
    if (idgrid === "gridOperatore") {
      this.gridOperatore.fireEvent("prepareStoreData", resp, idgrid);
    }
    this.getView().el.unmask();
  },
  /* ---------------------------------------------------------------------------------------------------------
   * fireEvent : valorizzazione oggetti nei vati componenti figli
   * ---------------------------------------------------------------------------------------------------------*/
  onGetObjects: function (pnl) {
    pnl.getView().toolBarCenter = this.toolBarCenter;
    pnl.getView().cruscotto = this.cruscotto;
    pnl.getView().filtri = this.filtri;
    pnl.getView().filtriCdl = this.filtriCdl;
    pnl.getView().filtriMancanti = this.filtriMancanti;
  },

  /* ---------------------------------------------------------------------------------------------------------
   * fireEvent : su contentmenu di battaglia navale
   * aggiorno filtri lab e ricarico griglia
   * ---------------------------------------------------------------------------------------------------------*/
  onGoToGridLab: function (record) {
    let me = this,
      i,
      vm = this.getViewModel(),
      filtri = vm.get("filtri"),
      storeGridLab = vm.getStore("storeGridLab"),
      storeGridPart = vm.getStore("storeGridPart"),
      storeGridOrder = vm.getStore("storeGridOrder"),
      storeGridReparto = vm.getStore("storeGridReparto"),
      storeGridCdl = vm.getStore("storeGridCdl"),
      storeGridOdp = vm.getStore("storeGridOdp"),
      storeGridOperatore = vm.getStore("storeGridOperatore"),
      storeGridOperazione = vm.getStore("storeGridOperazione"),
      form = this.filtri.getForm(),
      listLab = [],
      listOrder = [],
      listCdl = [],
      listOdp = [],
      listReparto = [],
      listOperatore = [],
      listOperazione = [],
      listPart = [];
    //LAB
    storeGridLab.removeAll();
    storeGridLab.add({ sc_op_lab: record["sc_op_lab"] });

    storeGridPart.removeAll();
    storeGridOrder.removeAll();
    storeGridReparto.removeAll();
    storeGridCdl.removeAll();
    storeGridOdp.removeAll();
    storeGridOperatore.removeAll();
    storeGridOperazione.removeAll();

    filtri.acquisti = Ext.global.Vars.confMod.main.filtriCdl.acquisti;
    filtri.giacenza = Ext.global.Vars.confMod.main.filtriCdl.giacenza;
    filtri.produzione = Ext.global.Vars.confMod.main.filtriCdl.produzione;
    filtri.work_day_al = record["work_day_end"];
    filtri.work_day_dal = record["work_day_start"];

    vm.set("filtri", filtri);

    Ext.global.Vars.confMod.main.tabActive = "gridLab";
    this.center.setActiveTab(Ext.global.Vars.confMod.main.tabActive);

    this.onLoadDataGrid("gridLab", true);
  },
  /* ---------------------------------------------------------------------------------------------------------
   * fireEvent : su prime due colonne battaglia navale
   * apro nuova schermata pick
   * ---------------------------------------------------------------------------------------------------------*/
  onOpenDettaglioPrep: function (record) {
    this.pick = Ext.create("skd.view.forms.pick.Cards", {
      record: record,
    });
    this.pick.on("onCloseSetting", "onCloseSetting", this);
    this.pick.on("openWinMaterialiPick", "onBeforeOpenWinMateriali", this);
    this.getView().setActiveItem(this.pick);
  },
  /* ---------------------------------------------------------------------------------------------------------
   * fireEvent : su selezione cella
   * avvio aggiornamenti index e cell su tutte le grids
   * verifico se devo caricare il cruscotto
   * ---------------------------------------------------------------------------------------------------------*/
  onSelectCell: function (grid, cell, dataIndex, row, infoCell) {
    let me = this,
      vm = this.getViewModel(),
      selectCell = vm.get("selectCell"),
      info = vm.get("infoCell"),
      rowVm = vm.get("row");

    if (row === rowVm) {
      return;
    }

    if (grid.id === "gridCdl") {
      vm.set("infoCell", {
        lab: row["lab"],
        part_no: row["part_no"],
        eng_chg_level: "",
        contract: row["contract"],
        release_no: row["release_no"],
        sequence_no: row["sequence_no"],
        order_no: row["order_no"],
      });
      vm.set("row", row);
      this.onCheckLoadDataCruscotto(cell, row, infoCell);
    } else {
      this.gridPartnum.fireEvent(
        "selectActiveCell",
        cell,
        dataIndex,
        row,
        infoCell
      );
      this.gridLab.fireEvent(
        "selectActiveCell",
        cell,
        dataIndex,
        row,
        infoCell
      );
      this.gridReparto.fireEvent(
        "selectActiveCell",
        cell,
        dataIndex,
        row,
        infoCell
      );
      this.gridOperatore.fireEvent(
        "selectActiveCell",
        cell,
        dataIndex,
        row,
        infoCell
      );
      //caricamento dati su cruscotto se cell differente
      if (
        info === null ||
        info["key"] !== infoCell["key"] ||
        info["data"] !== infoCell["data"] ||
        info["turno"] !== infoCell["turno"]
      ) {
        vm.set("infoCell", infoCell);
        vm.set("selectCell", cell);
        vm.set("row", row);
        this.onCheckLoadDataCruscotto(cell, row, infoCell);
      }
    }
  },

  onResizeNote: function (width) {
    Ext.global.Vars.confMod.main.filtriCdl.widthNote = width;
    this.setConfMod();
  },

  /* ---------------------------------------------------------------------------------------------------------
   * Gestione cruscotto west
   * - onToggleNav: gestione visualizzazione pannllo west
   * - onCheckLoadDataCruscotto: verifica caricamento dati
   * - onLoadDataCruscotto: alimento pannello cruscotto
   * - onRemoveDataCruscotto: ripulisco dati nel pannello cruscotto
   * ---------------------------------------------------------------------------------------------------------*/
  onToggleNav: function (btn) {
    let me = this,
      vm = this.getViewModel(),
      collapse = 1;

    if (btn.action === false) {
      vm.set("westShow", true);
      collapse = 0;
    } else {
      vm.set("westShow", false);
    }
    Ext.global.Vars.confMod.main.west.collapse = collapse;
    this.setConfMod();

    // //caricamento dati su cruscotto
    // this.callParent(arguments)
    this.onCheckLoadDataCruscotto();
  },
  onCheckLoadDataCruscotto: function (cell, row, infoCell) {
    let me = this,
      vm = this.getViewModel(),
      westShow = vm.get("westShow"),
      selectCell = vm.get("selectCell"),
      info = vm.get("infoCell"),
      rowVm = vm.get("row");

    // vm.set('row',row);
    if (westShow && typeof info === "object") {
      this.onRemoveDataCruscotto();
      this.onLoadDataCruscotto();
    }
  },
  onLoadDataCruscotto: function () {
    let me = this,
      vm = this.getViewModel(),
      selectCell = vm.get("selectCell"),
      infoCell = vm.get("infoCell"),
      row = vm.get("row");
    this.panelWest.fireEvent("loadData", selectCell, row, infoCell);
  },
  onRemoveDataCruscotto: function () {
    this.panelWest.fireEvent("removeData");
  },
  onCollapseCruscotto: function (panel) {
    Ext.global.Vars.confMod.main.west.posizione = panel.posizione;
    this.setConfMod();
  },

  onOpenInfo: function () {
    let me = this,
      vm = this.getViewModel(),
      selectCell = vm.get("selectCell"),
      infoCell = vm.get("infoCell"),
      row = vm.get("row");

    Ext.Ajax.request({
      method: "GET",
      params: {
        contract: row["contract"],
        part_no: row["part_no"],
      },
      url: Backend.REST_API + "forms/cruscotto/gettitle/",
      success: function (response) {
        let resp = Ext.decode(response.responseText),
          s = resp["success"];
        if (s === true) {
          vm.set("titleInfo", resp["title"]);
        }
      },
    });

    let storePrevisioniForniture = Ext.create(
      "skd.store.forms.cruscotto.Previsioni",
      {
        autoLoad: true,
        proxy: {
          type: "rest",
          url: Backend.REST_API + "forms/cruscotto/getmaterialiprevpart/",
          extraParams: {
            contract: row["contract"],
            order_no: row["order_no"],
            sc_op_release_no: row["sc_op_release_no"],
            sc_op_sequence_no: row["sc_op_sequence_no"],
            part_no: row["part_no"],
          },
          appendId: false,
          reader: {
            type: "json",
            rootProperty: "data",
          },
          writer: {
            type: "json",
            writeAllFields: true,
          },
        },
      }
    );

    let storeGiacenzaForniture = Ext.create(
      "skd.store.forms.cruscotto.Giacenza",
      {
        autoLoad: true,
        proxy: {
          type: "rest",
          url: Backend.REST_API + "forms/cruscotto/getmaterialimagpart/",
          extraParams: {
            contract: row["contract"],
            order_no: row["order_no"],
            sc_op_release_no: row["sc_op_release_no"],
            sc_op_sequence_no: row["sc_op_sequence_no"],
            part_no: row["part_no"],
          },
          appendId: false,
          reader: {
            type: "json",
            rootProperty: "data",
          },
          writer: {
            type: "json",
            writeAllFields: true,
          },
        },
      }
    );

    //giacenza
    let win = Ext.create("Ext.window.Window", {
      width: Ext.getBody().getViewSize().width - 100,
      height: Ext.getBody().getViewSize().height - 100,
      userCls: "goma-window-materiali",
      modal: true,
      border: false,
      shadow: true,
      scope: me,
      viewModel: {
        parent: me.getViewModel(),
      },
      bodyStyle: "background-color: transparent !important;",
      bind: {
        title: '<div class="goma-window-title">{titleInfo}</div>',
      },
      layout: {
        type: "border",
      },
      items: [
        {
          xtype: "toolbar",
          region: "north",
          dock: "top",
          items: [
            {
              text: "Chiudi",
              handler: function () {
                this.up("window").close();
              },
            },
          ],
        },
        {
          xtype: "giacenzaforniture",
          region: "north",
          resizable: true,
          height: 150,
          split: true,
          title: Locale.t(
            "skd.forms.cruscotto.giacenzacomp.window.giacenza.title"
          ),
          store: storeGiacenzaForniture,
        },
        {
          xtype: "previsioniforniture",
          region: "center",
          title: Locale.t(
            "skd.forms.cruscotto.giacenzacomp.window.forniture.title"
          ),
          store: storePrevisioniForniture,
        },
      ],
    });
    win.show();
  },
  onBeforeOpenWinMateriali: function (view, record) {
    let me = this,
      vm = this.getViewModel();

    Ext.Ajax.request({
      method: "GET",
      params: {
        contract: record.data["contract"],
        part_no: record.data["part_no"],
      },
      url: Backend.REST_API + "forms/cruscotto/gettitle/",
      success: function (response) {
        let resp = Ext.decode(response.responseText),
          s = resp["success"];
        if (s === true) {
          me.onOpenWinMateriali(view, record, resp["title"]);
          // me.win.setTitle(resp['title'])
          // vm.set('titleInfo',resp['title'])
        }
      },
    });
  },
  onOpenWinMateriali: function (view, record, title) {
    let me = this,
      vm = this.getViewModel();

    let id;
    if (view.up().name === "GridPick") {
      id = record.data["id_component"];
    } else {
      id = record.data["id"];
    }
    let storePrevisioniForniture = Ext.create(
      "skd.store.forms.cruscotto.Previsioni",
      {
        autoLoad: true,
        proxy: {
          type: "rest",
          url: Backend.REST_API + "forms/cruscotto/getmaterialiprev/",
          extraParams: {
            id: id, contract: record.data.contract, part_no: record.data.component_part
          },
          appendId: false,
          reader: {
            type: "json",
            rootProperty: "data",
          },
          writer: {
            type: "json",
            writeAllFields: true,
          },
        },
      }
    );

    let storeGiacenzaForniture = Ext.create(
      "skd.store.forms.cruscotto.Giacenza",
      {
        autoLoad: true,
        proxy: {
          type: "rest",
          url: Backend.REST_API + "forms/cruscotto/getmaterialimag/",
          extraParams: { id: id, contract: record.data.contract, part_no: record.data.component_part },
          appendId: false,
          reader: {
            type: "json",
            rootProperty: "data",
          },
          writer: {
            type: "json",
            writeAllFields: true,
          },
        },
      }
    );

    this.giacenzaforniture = Ext.create("skd.view.forms.cruscotto.Giacenza", {
      region: "north",
      resizable: true,
      height: 150,
      split: true,
      title: Locale.t("skd.forms.cruscotto.giacenzacomp.window.giacenza.title"),
      store: storeGiacenzaForniture,
    });
    this.previsioniforniture = Ext.create(
      "skd.view.forms.cruscotto.PrevisioniForniture",
      {
        region: "center",
        title: Locale.t(
          "skd.forms.cruscotto.giacenzacomp.window.forniture.title"
        ),
        store: storePrevisioniForniture,
      }
    );
    //giacenza
    this.win = Ext.create("Ext.window.Window", {
      width: Ext.getBody().getViewSize().width - 100,
      height: Ext.getBody().getViewSize().height - 100,
      userCls: "goma-window-materiali",
      modal: true,
      border: false,
      shadow: true,
      scope: me,
      viewModel: {
        parent: me.getViewModel(),
      },
      bodyStyle: "background-color: transparent !important;",
      animateTarget: view,
      title: '<div class="goma-window-title"> ' + title + "</div>",
      // bind:{
      // },
      x: view.x,
      layout: {
        type: "border",
      },
      items: [
        {
          xtype: "toolbar",
          region: "north",
          dock: "top",
          items: [
            {
              text: "Chiudi",
              handler: function () {
                this.up("window").close();
              },
            },
          ],
        },
        this.giacenzaforniture,
        this.previsioniforniture,
      ],
    }).show();
  },
  onRenderQtyPres: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    if (value < 0) {
      meta.tdCls += " cell_qta_negativa ";
      return Ext.util.Format.number(value, "0,000.0");
    } else {
      return Ext.util.Format.number(value, "0,000.0");
    }
  },
  onRenderQty: function (value, meta, record, rowIndex, colIndex, store, view) {
    let v,
      v1 = record.data["qty_supply"] - record.data["qty_demand"];
    if (v1 < 0) {
      v = "-" + Ext.util.Format.number(record.data["qty_demand"], "0,000.0");
      meta.tdCls += " cell_qta_negativa ";
    } else {
      v = Ext.util.Format.number(record.data["qty_supply"], "0,000.0");
      meta.tdCls += " cell_qta_positiva ";
    }
    return v;
  },
  onRenderQtyGiacenza: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    if (value >= 0) {
      meta.tdCls += " cell_qta_positiva ";
    } else {
      meta.tdCls += " cell_qta_negativa ";
    }
    return Ext.util.Format.number(value, "0,000.0");
  },
  onRenderQtyValue: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    return Ext.util.Format.number(value, "0,000.0");
  },
  /* ----------------------------------------------------------------
   * polling servizi
   * - onRunApertura: non richiesto
   * - pollingSetting: avvio su render
   * - processPolling: funzione richiamata
   * ----------------------------------------------------------------*/
  onRunApertura: function (r) {
    //x apertura da altro app
  },
  pollingSetting: function () {
    let me = this;
    //FIXME verifica se quello precedente è in pending
    Ext.Ajax.request({
      method: "GET",
      url: Backend.REST_API + "main/polling/",
      success: function (response) {
        me.processPolling(response, true);
      },
      failure: function (response) {
        me.processPolling(response, false);
      },
    });
  },
  processPolling: function (response, success) {
    let me = this,
      vm = this.getViewModel();

    if (success === true) {
      let resp = Ext.decode(response.responseText),
        s = resp["success"];
      if (s === true) {
        vm.set("statusApp", resp);
        if (resp["syncAll"] === 2) {
          this.toolBarCenter.disable();
          this.filtri.disable();
          this.filtriCdl.disable();
          this.panelWest.getViewModel().set("statusApp", resp["syncAll"]);
          this.gridLab.fireEvent("statusApp", resp["syncAll"]);
          this.gridPartnum.fireEvent("statusApp", resp["syncAll"]);
          this.gridReparto.fireEvent("statusApp", resp["syncAll"]);
          this.gridOperatore.fireEvent("statusApp", resp["syncAll"]);
          if (this.pick) {
            this.pick.fireEvent("statusApp", resp["syncAll"]);
          }
        } else {
          if (this.toolBarCenter.isDisabled()) {
            this.toolBarCenter.enable();
            this.filtri.enable();
            this.filtriCdl.enable();
            this.panelWest.getViewModel().set("statusApp", resp["syncAll"]);
            this.gridLab.fireEvent("statusApp", resp["syncAll"]);
            this.gridPartnum.fireEvent("statusApp", resp["syncAll"]);
            this.gridReparto.fireEvent("statusApp", resp["syncAll"]);
            this.gridOperatore.fireEvent("statusApp", resp["syncAll"]);
            if (this.pick) {
              this.pick.fireEvent("statusApp", resp["syncAll"]);
            }
          }
        }
        me.footer.getViewModel().set("statusApp", resp);
      } else {
        //TODO gestione errore
      }
    }
  },
  onSetStatusApp: function () {
    return;
  },
  onOpenPdf: function () {
    let win = Ext.create("Ext.window.Window", {
      width: Ext.getBody().getViewSize().width - 100,
      height: Ext.getBody().getViewSize().height - 100,
      modal: true,
      border: false,
      shadow: true,
      title: "_Visualizzazione pdf",
      items: [
        {
          xtype: "panel",
          dockedItems: [
            {
              xtype: "toolbar",
              dock: "top",
              items: [
                {
                  text: "Chiudi",
                  handler: function () {
                    this.up("window").close();
                  },
                },
              ],
            },
          ],
          html: "visualizzo pdf",
        },
      ],
    });
    win.show();
  },
});
