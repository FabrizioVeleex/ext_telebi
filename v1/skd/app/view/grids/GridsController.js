/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define("skd.view.grids.GridsController", {
  extend: "Ext.app.ViewController",
  requires: [
    "Ext.data.Store",
    "Ext.data.proxy.Rest",
    "Ext.data.reader.Json",
    "Ext.form.FieldSet",
    "Ext.form.Panel",
    "Ext.form.field.Date",
    "Ext.form.field.Display",
    "Ext.form.field.Number",
    "Ext.grid.Panel",
    "Ext.layout.container.Accordion",
    "Ext.layout.container.Border",
    "Ext.layout.container.Fit",
    "Ext.layout.container.HBox",
    "Ext.layout.container.VBox",
    "Ext.menu.Menu",
    "Ext.panel.Panel",
    "Ext.toolbar.Toolbar",
    "Ext.util.DelayedTask",
    "Ext.util.Format",
    "Ext.window.Window",
    "skd.view.grids.ListDateRange",
  ],
  mixins: ["portal.v1.global.Util"],
  /**
   * Called when the view is created
   */
  init: function () {
    //gestione caricamento grid si cambio tab con store già caricato
    this.generateGridFirst = false;
    this.selModelActive = false;
    this.waithing = Ext.create("Ext.panel.Panel", {
      xtype: "panel",
      html: "caricamento in corso...",
    });

    this.btnLog = {
      scope: this,
      iconCls: "fas fa-table",

      tooltip: Locale.t("skd.global.log.tooltip"),
      handler: "onCreateFormLog",
    };

    this.btnReloadGrid = {
      scope: this,
      iconCls: "fas fa-sync",
      tooltip: Locale.t("skd.top.btn.reload.text"),
      handler: "onLoadGrid",
    };

    this.btnToggleFiltri = {
      scope: this,
      bind: {
        iconCls: "{iconFiltri}",
      },
      text: Locale.t("skd.top.filtri.title"),
      handler: "onToggleFiltri",
    };
    this.btnMoveRange = {
      scope: this,
      iconCls: "fas fa-arrows-alt-h",
      text: Locale.t("skd.top.filtri.movedaterange.title"),
      handler: "onMoveRangeDateBefore",
    };
    this.btnToggleFiltriCld = {
      scope: this,
      bind: {
        iconCls: "{iconFiltriCdl}",
      },
      text: Locale.t("skd.top.filtri.title") + " Cdl",
      handler: "onToggleFiltriCdl",
    };

    this.btnOrderCld = {
      scope: this,
      iconCls: 'fas fa-sort-amount-down',
      bind: {
        tooltip: "{orderCdl}",
        text: "{textOrderCdl}",
      },
      handler: "onToggleOrderCdl",
    };
  },

  /* ---------------------------------------------------------------------------------------------------------
   * fireEvent : setto oggetto correlati nel controller
   * ---------------------------------------------------------------------------------------------------------*/
  onAfterRender: function () {
    this.getView().fireEvent("getObjects", this);
    this.toolBarCenter = this.getView().toolBarCenter;
    this.cruscotto = this.getView().cruscotto;
    this.filtri = this.getView().filtri;
    this.filtriCdl = this.getView().filtriCdl;
    this.filtriMancanti = this.getView().filtriMancanti;
    // this.getView().add(this.waiting);
  },

  /* ---------------------------------------------------------------------------------------------------------
   * richiamo funzione main per settaggi generale
   * onActivate:
   * onLoadGrid:
   * onSelectActiveCell: setto su singola grid la cella selezionata per il posizionamento
   * onCellcontextmenu: menu cella
   * onGroupcontextmenu: menu grouping
   * onDropDataCell: azione du drop cell
   * ---------------------------------------------------------------------------------------------------------*/
  onBoxReady: function (grid) {
    //comletamento generazione grid
  },
  onBeforeRefresh: function (grid) { },
  onRefresh: function (grid) {
    let task = new Ext.util.DelayedTask(function () {
      this.selectCellByModel();
    }, this);
    task.delay(500);
  },
  onActivate: function () {
    this.getView().fireEvent("activateGrid", this.getView());
    if (this.grid) {
      this.grid.getView().refresh();
    }
  },
  onReloadGridStore: function () {
    let vm = this.getViewModel(),
      selectCell = vm.get("selectCell_dett"),
      dataIndex = vm.get("dataIndex_dett"),
      row = vm.get("row_dett");

    if (this.grid) {
      this.grid.getStore().reload();
      if ("gridCdlSub" === this.grid.id) {
        if (this.gridDet) {
          this.gridDet.getStore().reload();
          if (selectCell !== null && dataIndex !== null && row !== null) {
            this.getView().fireEvent(
              "selectCell",
              this.getView(),
              selectCell,
              dataIndex,
              row
            );
          }
        }
      }
    }
  },

  onLoadGrid: function () {
    let vm = this.getViewModel();
    vm.set("selectCell", null);
    this.getView().fireEvent("loadDataGrid", this.getView().id, true);
  },
  onToggleFiltri: function (btn) {
    this.getView().fireEvent("toggleFiltri", btn);
  },
  onToggleFiltriCdl: function (btn) {
    this.getView().fireEvent("toggleFiltriCdl", btn);
  },

  onToggleOrderCdl: function (btn) {
    let vm = this.getViewModel();
    vm.set("selectCell", null);
    this.getView().fireEvent("toggleOrderCdl", btn);
  },
  //01 richiamato su selModel select
  onCellModelSelect: function (cellmodel, record, row, column, eOpts) {
    if (this.selModelActive === false) {
      let vm = this.getViewModel(),
        dataIndex,
        infoCell,
        header = cellmodel.view.up().columns;

      if (header[column]) {
        dataIndex = header[column].dataIndex;
        infoCell = header[column].dataIndexC;
        if (dataIndex === "C_START_SALDO") {
          infoCell = header[column].dataIndex;
        }
      } else {
        dataIndex = header[0].dataIndex;
        infoCell = header[0].dataIndex;
      }
      let cell = record.get(dataIndex),
        info = record.get(infoCell);

      infoCell = this.getViewModel().get("infoCell");

      if (infoCell === null || record.data["key"] !== infoCell.key) {
        this.getView().fireEvent(
          "selectCell",
          this.getView(),
          cell,
          dataIndex,
          record.data,
          info
        );
      }
    }
  },

  //02 richiamato da main su esecuzioni lanciate da onCellModelSelect
  onSelectActiveCell: function (cell, dataIndex, row, infoCell) {
    let vm = this.getViewModel();
    vm.set("selectCell", cell);
    vm.set("infoCell", infoCell);
    vm.set("dataIndex", dataIndex);
    vm.set("row", row);
  },

  //richiamto su cambio grid solo prima volta se la cella non cambia
  selectCellByModel: function () {
    if (this.grid) {
      let vm = this.getViewModel(),
        selectCell = vm.get("selectCell"),
        infoCell = vm.get("infoCell"),
        dataIndex = vm.get("dataIndex"),
        rowKey = vm.get("row"),
        store = this.store,
        selModel = this.grid.getSelectionModel(),
        posCell = 1,
        sc = this.grid.getSelectionModel(),
        cp = false;

      if (infoCell) {
        this.selModelActive = true;
        let key = rowKey["key"];
        // if (sc ){
        //     cp = sc.getCurrentPosition();
        //     if (cp!== undefined && cp.record.data['key']===rowKey['key']){
        //         return;
        //     }
        // }
        let row = store.find("key", key, 0, false, false, true);
        if (row) {
          for (let i = 0; i < this.grid.columns.length; i++) {
            if (this.grid.columns[i].dataIndex === dataIndex) {
              posCell = this.grid.columns[i].fullColumnIndex;
              break;
            }
          }
          if (posCell > -1) {
            selModel.setPosition({ row: row, column: posCell }, false);
            let pos = selModel.getPosition(),
              record = this.grid.getStore().getAt(row);
            if (record) {
              this.grid.ensureVisible(record);
              if (pos) {
                this.grid.getView().focusCell(pos);
              }
            }
          }
        }
        this.selModelActive = false;
      }
    }
  },

  onStatusApp: function (statusApp) {
    this.getViewModel().set("statusApp", statusApp);
  },
  onCellcontextmenu: function (
    view,
    cell,
    cellIndex,
    record,
    row,
    rowIndex,
    e
  ) {
    e.preventDefault();
    let vm = this.getViewModel(),
      statusApp = vm.get("statusApp");

    //download totale attivo
    if (statusApp === 2) {
      return;
    }

    //verifico se non è un ODP
    if ("ODP" !== record.data["tipo"]) {
      return;
    }
    //verifico se è abilitato a modificare le date 3,99
    let abilitato = false;
    if (this.checkRuoli(["99", "3"])) {
      abilitato = true;
    }
    if (abilitato === false) {
      return;
    }

    this.moveView = view;
    this.moveRecord = record;

    let moveDate = Ext.create("Ext.Action", {
      text: "sposta...",
      iconCls: "fas fa-arrows-alt-h",
      record: record,
      view: view,
      scope: this,
      handler: "onMoveDateOrderBefore",
    });
    let menu = Ext.create("Ext.menu.Menu", {
      scope: this,
      items: [moveDate],
    });
    menu.showAt(e.getXY());
  },
  onGroupcontextmenu: function (view, node, group, e) {
    e.preventDefault();
    let abilitato = false;
    if (this.checkRuoli(["99", "3"])) {
      abilitato = true;
    }
    if (abilitato === false) {
      return false;
    }
  },
  onDropDataCell: function (view, target, dragData) {
    let me = this,
      drop = target.record.get(target.columnName),
      drag = dragData.record.get(dragData.columnName),
      record = dragData.record.data,
      vm = this.getViewModel();

    // recupero informazioni ordine
    let jsonData = {
      contract: record["contract"],
      lab: record["lab"],
      part_no: record["part_no"],
      order_no: record["order_no"],
      sequence_no: record["sc_op_sequence_no"],
      release_no: record["sc_op_release_no"],
      start_time: record["start_time"],
      start_time_new: drop["data"],
      start_time_old: drag["data"],
      idGrid: vm.get("id"),
    };

    // richiesta spostamento in be
    Ext.Ajax.request({
      method: "POST",
      jsonData: jsonData,
      url: Backend.REST_API + "forms/cruscotto/dropdatacell/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.onDropDataCellAfter(view, target, resp);
        } else {
          me.onDropDataCellError(resp["msg"]);
        }
      },
      failure: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          me.onDropDataCellError(resp["msg"]);
        } catch (e) {
          me.onDropDataCellError(e.messageerror);
        }
      },
    });
  },
  onDropDataCellAfter: function (view, target, resp) {
    let record = target.record,
      rows = resp.rows,
      row = [],
      grid = view.up("grid"),
      s = grid.getStore();
    s.suspendEvents();
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        row = rows[i];
        for (let column in row) {
          if (row.hasOwnProperty(column)) {
            record.set(column, row[column]);
          }
        }
      }
    }
    s.resumeEvents();
    grid.getView().refreshNode(record);
    // grid.getView().refresh();
  },
  onDropDataCellError: function (error) {
    this.winChangeDate.close();
    alert(error);
  },
  /* ---------------------------------------------------------------------------------------------------------
   * richiamo dopo azione del controller children per settaggio altri tasti di default e visualizzazione filtri
   * ---------------------------------------------------------------------------------------------------------*/
  setToolBar: function () {
    this.toolBarCenter.add("->", this.btnLog);

    if (this.getView().id === "gridCdl") {
      let task = new Ext.util.DelayedTask(function () {
        if (Ext.global.Vars.confMod.main.filtri.active_cdl) {
          this.filtriCdl.show();
        }
      }, this);
      task.delay(200);
    } else {
      if (Ext.global.Vars.confMod.main.filtri.active) {
        this.filtri.show();
      }
    }
  },

  /* ---------------------------------------------------------------------------------------------------------
   * handler tasto gesione
   * avvio form gestione schedulatore
   * ---------------------------------------------------------------------------------------------------------*/
  onCreateFormLog: function () {
    let storeUpload = Ext.create("Ext.data.Store", {
      autoLoad: true,
      proxy: {
        type: "rest",
        url: Backend.REST_API + "forms/cruscotto/getlogcruscotto/",
        appendId: false,
        reader: {
          type: "json",
          rootProperty: "data",
        },
      },
    });
    let storeDownload = Ext.create("Ext.data.Store", {
      autoLoad: true,
      proxy: {
        type: "rest",
        url: Backend.REST_API + "forms/cruscotto/getlogdownload/",
        appendId: false,
        reader: {
          type: "json",
          rootProperty: "data",
        },
      },
    });

    let storeDownloadRunning = Ext.create("Ext.data.Store", {
      autoLoad: true,
      proxy: {
        type: "rest",
        url: Backend.REST_API + "forms/cruscotto/getlogdownloadrunning/",
        appendId: false,
        reader: {
          type: "json",
          rootProperty: "data",
        },
      },
    });
    let gridUpload = Ext.create("Ext.grid.Panel", {
      flex: 1,
      scrollable: true,
      title: Locale.t("skd.global.log.upload.title"),
      store: storeUpload,
      viewConfig: {
        emptyText: Locale.t("skd.global.log.emptytext"),
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              text: "",
              iconCls: "fas fa-sync",
              handler: function () {
                this.up("grid").getStore().load();
              },
            },
          ],
        },
      ],
      columns: [
        {
          text: Locale.t("skd.global.log.upload.columns.creation_date"),
          dataIndex: "creation_date",
          width: 140,
          renderer: Ext.util.Format.dateRenderer("d/m/Y H:i"),
        },
        {
          text: Locale.t("skd.global.log.upload.columns.azione"),
          dataIndex: "azione",
          width: 60,
        },
        {
          text: Locale.t("skd.global.log.upload.columns.dati"),
          dataIndex: "dati",
          flex: 1,
        },
        {
          text: Locale.t("skd.global.log.upload.columns.old"),
          dataIndex: "old",
          flex: 1,
        },
        // {text: Locale.t('cronology.azionelog'),dataIndex: 'log',flex:1
        //     ,renderer: function(value,meta,record) {
        //         return Ext.String.format('<div class="topic"><b>{0}</b> - <span class="author">{1}</span></div>', value, record.data.cognomenome)
        //     }
        // }
      ],
    });

    let gridDownload = Ext.create("Ext.grid.Panel", {
      flex: 1,
      scrollable: true,
      title: Locale.t("skd.global.log.download.title"),
      store: storeDownload,
      viewConfig: {
        emptyText: Locale.t("skd.global.log.emptytext"),
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              text: "",
              iconCls: "fas fa-sync",
              handler: function () {
                this.up("grid").getStore().load();
              },
            },
          ],
        },
      ],
      columns: [
        {
          text: Locale.t("skd.global.log.download.columns.creation_date"),
          dataIndex: "creationDate",
          width: 140,
          renderer: Ext.util.Format.dateRenderer("d/m/Y H:i"),
        },
        {
          text: Locale.t("skd.global.log.download.columns.contract"),
          dataIndex: "contract",
          flex: 1,
        },
        {
          text: Locale.t("skd.global.log.download.columns.part_no"),
          dataIndex: "part_no",
          flex: 1,
        },
      ],
    });

    let gridDownloadRunning = Ext.create("Ext.grid.Panel", {
      flex: 1,
      scrollable: true,
      title: Locale.t("skd.global.log.download.title"),
      store: storeDownloadRunning,
      viewConfig: {
        emptyText: Locale.t("skd.global.log.emptytext"),
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              text: "",
              iconCls: "fas fa-sync",
              handler: function () {
                this.up("grid").getStore().load();
              },
            },
          ],
        },
      ],
      columns: [
        {
          text: Locale.t("skd.global.log.download.columns.contract"),
          dataIndex: "ACTION",
          whith: 70,
        },
        {
          text: Locale.t("skd.global.log.download.columns.contract"),
          dataIndex: "TABLE_ID",
          flex: 1,
        },
        {
          text: Locale.t("skd.global.log.download.columns.contract"),
          dataIndex: "CONTRACT",
          flex: 1,
        },
        {
          text: Locale.t("skd.global.log.download.columns.part_no"),
          dataIndex: "PART_NO",
          flex: 1,
        },
      ],
    });

    let winLog = Ext.create("Ext.window.Window", {
      width: Ext.getBody().getViewSize().width - 100,
      height: Ext.getBody().getViewSize().height - 100,
      userCls: "goma-window-materiali",
      modal: true,
      border: false,
      shadow: true,
      iconCls: "fas fa-table",
      title: Locale.t("skd.global.log.title"),
      layout: {
        type: "accordion",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              text: "Chiudi",
              iconCls: "fas fa-window-close",
              handler: function () {
                this.up("window").close();
              },
            },
          ],
        },
      ],
      items: [gridUpload, gridDownload, gridDownloadRunning],
    });
    winLog.show();
  },

  onRenderCell: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    let header = view.up().columns,
      dataIndex = header[colIndex].dataIndex,
      infoIndex = dataIndex.replace("V_", "C_"),
      info = record.data[infoIndex],
      infoGroup = "";

    if (info["festivo"] === true) {
      meta.tdCls = " grid_festivo ";
    }
    meta.tdCls += " goma_span_cell td_cell_grid " + info["key"] + " ";

    // meta.style = style;
    if (info["empty"] === true) {
      return "";
    }
    if (record.get("gridName") === "lab") {
      infoGroup = record.get("lab") + " - " + record.get("part_no");
    }
    if (record.get("gridName") === "reparto") {
      infoGroup =
        record.get("rep_cdl_department_no") +
        "/<i>" +
        record.get("ope_work_center_no") +
        "</i> - " +
        record.get("priority_description") +
        " - " +
        record.get("sc_op_sequence_no") +
        " [" +
        record.get("sc_op_res_ordine") +
        "]";
    }
    if (record.get("gridName") === "operatore") {
      infoGroup = "<i>" + record.get("operatore") + "</i>";
    }
    [tdCls, tipsGiacenza] = this.onCheckNegativo(info, record);
    meta.tdCls += tdCls;
    let tipsG = tipsGiacenza === "" ? "" : "<br>" + tipsGiacenza;

    //gestione tips
    meta.tdAttr =
      'data-qtip="' +
      infoGroup +
      "<hr>Progressivo minuti= " +
      info["progressivo"] +
      tipsG +
      '"';
    return value;
  },

  onRedererStato: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    let tdCls = "  ",
      cursor = "",
      tips;
    meta.style = "background-color:" + record.get('hex') + ";";
    if (this.checkRuoli(["10", "11"])) {
      cursor = " td_cursor_pointer ";
    }
    if (record.data["lista_preparatori"] !== "") {
      tips = "Preparatori : " + record.data["lista_preparatori"] + "<br>";
    } else {
      tips = "Nessun preparatore presente<br>";
    }
    // -------------------------------
    // data preparazione
    if (
      record.data["data_ini_preparazione"] !== "" &&
      record.data["data_ini_preparazione"] !== null
    ) {
      let inputDate = new Date(record.data["data_ini_preparazione"]);
      let output = Ext.Date.format(inputDate, 'd/m/Y H:i');
      tips += "Data programmata: " + output + "<br>";


    } else {
      tips += "Nessuna data programmata<br>";
    }

    // -------------------------------
    // data inizio
    if (
      record.data["data_ini_effettivo"] !== "" &&
      record.data["data_ini_effettivo"] !== null
    ) {
      let inputDate = new Date(record.data["data_ini_effettivo"]);
      let output = Ext.Date.format(inputDate, 'd/m/Y H:i');
      tips += "Data Inizio preparazione: " + output + "<br>";
    }

    // -------------------------------
    // data fine
    if (
      record.data["data_end_preparazione"] !== "" &&
      record.data["data_end_preparazione"] !== null
    ) {
      let inputDate = new Date(record.data["data_end_preparazione"]);
      let output = Ext.Date.format(inputDate, 'd/m/Y H:i');
      tips += "Data Fine preparazione: " + output + "<br>";
    }

    meta.tdAttr = 'data-qtip="' + Ext.htmlEncode(tips) + '"';
    meta.tdCls +=
      "stato_preparazione goma_span_cell td_cell_grid  " + cursor + tdCls;
    return value;
  },
  onRenderLab_cdl: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    let ordine_cliente = "-",
      riga_oc = "-",
      data_ordine_cliente = "-",
      work_day_end = "-",
      sc_op_revised_qty_due = "-",
      qty_demand = "-";

    if (record.data["ordine_cliente"]) {
      ordine_cliente = record.data["ordine_cliente"];
    }
    if (record.data["riga_oc"]) {
      riga_oc = record.data["riga_oc"];
    }
    if (record.data["data_ordine_cliente"]) {
      data_ordine_cliente = record.data["data_ordine_cliente"];
    }
    if (record.data["work_day_end"]) {
      work_day_end = record.data["work_day_end"];
    }
    if (record.data["sc_op_revised_qty_due"]) {
      sc_op_revised_qty_due = record.data["sc_op_revised_qty_due"];
    }
    if (record.data["qty_demand"]) {
      qty_demand = record.data["qty_demand"];
    }

    meta.tdAttr =
      'data-qtip="Ordine cliente= ' +
      ordine_cliente +
      ", Riga OC= " +
      riga_oc +
      "<br>Data oc = " +
      data_ordine_cliente +
      ", Data op= " +
      work_day_end +
      "<br>Qta ODP= " +
      sc_op_revised_qty_due +
      "<br>Qta OC=" +
      qty_demand +
      '"';
    return value;
  },
  onRenderCellStato: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    meta.tdCls +=
      " goma_span_cell td_cell_grid cell_giacenza_negativa " +
      value["key"] +
      " ";

    // meta.style = style;
    if (value === 0) {
      return "";
    }

    [tdCls, tipsGiacenza] = this.onCheckNegativoCdl(value, record);
    meta.tdCls += tdCls;
    return value;
  },
  onRenderCellCdl: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    meta.tdCls += " goma_span_cell td_cell_grid " + value["key"] + " ";

    // meta.style = style;
    if (value === 0) {
      return "";
    }

    [tdCls, tipsGiacenza] = this.onCheckNegativoCdl(value, record);
    meta.tdCls += tdCls;
    return parseFloat(value.toFixed(2));
  },
  onCheckNegativoCdl: function (value, record) {
    let planned_neg = "",
      planned = "";

    if (record.data["sc_op_objstate"] === "Planned") {
      planned = "_planned";
      planned_neg = "_planned";
    }
    let tipsGiacenza = "",
      tdCls = " cell_giacenza_positiva" + planned,
      tdClsNeg = " cell_giacenza_negativa" + planned_neg;

    if (record.data["tipo"] === "POP") {
      tdCls = " cell_giacenza_positiva_pop" + planned;
      tdClsNeg = " cell_giacenza_negativa_pop" + planned_neg;
    }
    if (record.data["m_giacenza_eff"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza produzione</span><br>'
      );
    }
    if (record.data["p_giacenza_eff"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza acquisti</span><br>'
      );
    }
    if (record.data["p_giacenza"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta acquisti</span><br>'
      );
    }
    if (record.data["m_giacenza"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta produzione</span><br>'
      );
    }
    if (record.data["p_giacenza_rda_pop"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta no RDA acquisti</span><br>'
      );
    }
    if (record.data["m_giacenza_rda_pop"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta no POP produzione</span><br>'
      );
    }

    if (
      Ext.global.Vars.confMod.main.filtriCdl.produzione ===
      Ext.global.Vars.confMod.main.filtriCdl.acquisti
    ) {
      if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 0) {
        //giacenza
        if (record.data["m_giacenza_eff"] === -1) {
          tdCls = tdClsNeg;
        }
        if (record.data["p_giacenza_eff"] === -1) {
          tdCls = tdClsNeg;
        }
      }
      if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 4) {
        //giacenza presunta
        if (record.data["p_giacenza"] === -1) {
          tdCls = tdClsNeg;
        }
        if (record.data["m_giacenza"] === -1) {
          tdCls = tdClsNeg;
        }
      }
      if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 1) {
        //giacenza prod
        if (record.data["p_giacenza_rda"] === -1) {
          tdCls = tdClsNeg;
        }
        if (record.data["m_giacenza_rda"] === -1) {
          tdCls = tdClsNeg;
        }
      }
      if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 2) {
        //giacenza no RDA
        if (record.data["p_giacenza_pop"] === -1) {
          tdCls = tdClsNeg;
        }
        if (record.data["m_giacenza_pop"] === -1) {
          tdCls = tdClsNeg;
        }
      }
      if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 3) {
        //giacenza no POP RDA
        if (record.data["p_giacenza_rda_pop"] === -1) {
          tdCls = tdClsNeg;
        }
        if (record.data["m_giacenza_rda_pop"] === -1) {
          tdCls = tdClsNeg;
        }
      }
    } else {
      if (Ext.global.Vars.confMod.main.filtriCdl.produzione === true) {
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 0) {
          //giacenza
          if (record.data["m_giacenza_eff"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 4) {
          //giacenza presunta
          if (record.data["m_giacenza"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 1) {
          //giacenza prod
          if (record.data["m_giacenza_rda"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 2) {
          //giacenza no RDA
          if (record.data["m_giacenza_pop"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 3) {
          //giacenza no POP RDA
          if (record.data["m_giacenza_rda_pop"] === -1) {
            tdCls = tdClsNeg;
          }
        }
      }
      if (Ext.global.Vars.confMod.main.filtriCdl.acquisti === true) {
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 0) {
          //giacenza
          if (record.data["p_giacenza_eff"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 4) {
          //giacenza presunta
          if (record.data["p_giacenza"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 1) {
          //giacenza prod
          if (record.data["p_giacenza_rda"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 2) {
          //giacenza no RDA
          if (record.data["p_giacenza_pop"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtriCdl.giacenza === 3) {
          //giacenza no POP RDA
          if (record.data["p_giacenza_rda_pop"] === -1) {
            tdCls = tdClsNeg;
          }
        }
      }
    }
    return [tdCls, tipsGiacenza];
  },

  onRenderCellSaldo: function (
    value,
    meta,
    record,
    rowIndex,
    colIndex,
    store,
    view
  ) {
    let infoGroup = "";
    if (value["empty"] === true) {
      return "";
    }

    if (record.get("gridName") === "lab") {
      infoGroup = record.get("lab") + " - " + record.get("part_no");
    }
    if (record.get("gridName") === "reparto") {
      infoGroup =
        record.get("rep_cdl_department_no") +
        "/<i>" +
        record.get("ope_work_center_no") +
        "</i> - " +
        record.get("priority_description") +
        " - " +
        record.get("sc_op_sequence_no") +
        " [" +
        record.get("sc_op_res_ordine") +
        "]";
    }
    if (record.get("gridName") === "operatore") {
      infoGroup = "<i>" + record.get("operatore") + "</i>";
    }
    [tdCls, tipsGiacenza] = this.onCheckNegativo(value, record);
    meta.tdCls += tdCls;
    // meta.tdCls +=' td_cell_grid ';
    meta.tdAttr =
      'data-qtip="' +
      infoGroup +
      "<hr>Data inizio = " +
      value["start_time"] +
      '"';
    return (
      '<div class="goma_table">' +
      '<div class="goma_row">' +
      '<div class="goma_cell_info "><spam class="goma_span_cell">' +
      value["progressivo"] +
      "</spam></div>" +
      "</div>" +
      "</div>"
    );
  },
  onCheckNegativo: function (value, record) {
    let planned_neg = "",
      planned = "";

    if (record.data["sc_op_objstate"] === "Planned") {
      planned = "_planned";
      planned_neg = "_planned";
    }
    let tipsGiacenza = "",
      tdCls = " cell_giacenza_positiva" + planned,
      tdClsNeg = " cell_giacenza_negativa" + planned_neg;

    if (record.data["tipo"] === "POP") {
      tdCls = " cell_giacenza_positiva_pop" + planned;
      tdClsNeg = " cell_giacenza_negativa_pop" + planned_neg;
    }
    if (value["m_giacenza_eff"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza produzione</span><br>'
      );
    }
    if (value["p_giacenza_eff"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza acquisti</span><br>'
      );
    }
    if (value["p_giacenza"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta acquisti</span><br>'
      );
    }
    if (value["m_giacenza"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta produzione</span><br>'
      );
    }
    if (value["p_giacenza_rda_pop"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta no RDA acquisti</span><br>'
      );
    }
    if (value["m_giacenza_rda_pop"] === -1) {
      tipsGiacenza += Ext.htmlEncode(
        '<span style="color:#005CB3;">Negativo giacenza presunta no POP produzione</span><br>'
      );
    }

    if (
      Ext.global.Vars.confMod.main.filtri.produzione ===
      Ext.global.Vars.confMod.main.filtri.acquisti
    ) {
      if (Ext.global.Vars.confMod.main.filtri.giacenza === 0) {
        //giacenza
        if (value["m_giacenza_eff"] === -1) {
          tdCls = tdClsNeg;
        }
        if (value["p_giacenza_eff"] === -1) {
          tdCls = tdClsNeg;
        }
      }
      if (Ext.global.Vars.confMod.main.filtri.giacenza === 4) {
        //giacenza presunta
        if (value["p_giacenza"] === -1) {
          tdCls = tdClsNeg;
        }
        if (value["m_giacenza"] === -1) {
          tdCls = tdClsNeg;
        }
      }

      if (Ext.global.Vars.confMod.main.filtri.giacenza === 3) {
        //giacenza no POP RDA
        if (value["p_giacenza_rda_pop"] === -1) {
          tdCls = tdClsNeg;
        }
        if (value["m_giacenza_rda_pop"] === -1) {
          tdCls = tdClsNeg;
        }
      }
    } else {
      if (Ext.global.Vars.confMod.main.filtri.produzione === true) {
        if (Ext.global.Vars.confMod.main.filtri.giacenza === 0) {
          //giacenza
          if (value["m_giacenza_eff"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtri.giacenza === 4) {
          //giacenza presunta
          if (value["m_giacenza"] === -1) {
            tdCls = tdClsNeg;
          }
        }

        if (Ext.global.Vars.confMod.main.filtri.giacenza === 3) {
          //giacenza no POP RDA
          if (value["m_giacenza_rda_pop"] === -1) {
            tdCls = tdClsNeg;
          }
        }
      }
      if (Ext.global.Vars.confMod.main.filtri.acquisti === true) {
        if (Ext.global.Vars.confMod.main.filtri.giacenza === 0) {
          //giacenza
          if (value["p_giacenza_eff"] === -1) {
            tdCls = tdClsNeg;
          }
        }
        if (Ext.global.Vars.confMod.main.filtri.giacenza === 4) {
          //giacenza presunta
          if (value["p_giacenza"] === -1) {
            tdCls = tdClsNeg;
          }
        }

        if (Ext.global.Vars.confMod.main.filtri.giacenza === 3) {
          //giacenza no POP RDA
          if (value["p_giacenza_rda_pop"] === -1) {
            tdCls = tdClsNeg;
          }
        }
      }
    }
    return [tdCls, tipsGiacenza];
  },

  onHandelMoveDate: function (panel) {
    let me = this,
      vm = this.getViewModel(),
      form = panel.getForm(),
      date = form.findField("date"),
      start_time_new = Ext.Date.format(date.value, "Y-m-d"),
      record = this.moveRecord.data,
      jsonData = {
        contract: record["contract"],
        lab: record["lab"],
        part_no: record["part_no"],
        order_no: record["order_no"],
        sequence_no: record["sc_op_sequence_no"],
        release_no: record["sc_op_release_no"],
        start_time: record["start_time"],
        end_time_odp: record["end_time_odp"],
        start_time_new: start_time_new,
        start_time_old: record["ope_op_start_date"],
        idGrid: vm.get("id"),
      };

    // richiesta spostamento in be
    Ext.Ajax.request({
      method: "POST",
      jsonData: jsonData,
      url: Backend.REST_API + "forms/cruscotto/dropdatacell/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.onHandelMoveDateAfter(resp);
        } else {
          me.onHandlerMoveDataCellError(resp["msg"], panel);
        }
      },
      failure: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          me.onHandlerMoveDataCellError(resp["msg"], panel);
        } catch (e) {
          me.onHandlerMoveDataCellError(e.messageerror, panel);
        }
      },
    });
  },
  onHandlerMoveDataCellError: function (error, panel) {
    this.messageMove.update(error);
  },
  onHandelMoveDateAfter: function (resp) {
    let me = this,
      record = this.moveRecord,
      rows = resp.rows,
      row = [],
      grid = this.moveView;

    this.winChangeDate.close();
    let s = grid.getStore();
    s.suspendEvents();
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        row = rows[i];
        for (let column in row) {
          if (row.hasOwnProperty(column)) {
            record.set(column, row[column]);
          }
        }
      }
    } else {
      for (let r in record.data) {
        if (typeof record.data[r] === "object") {
          let a = record.data[r];
          a["minuti"] = 0;
          a["empty"] = true;
          record.set(r, a);
        }
      }
    }
    s.resumeEvents();
    grid.refreshNode(record);
  },
  onMoveDateOrderBefore: function (btn) {
    //recupero min, max in base al filtro attuale per verificare congruità
    let me = this,
      jsonData = {
        record: btn.record.data,
      };

    Ext.getBody().el.mask(Locale.t("global.form.caricamento"));
    Ext.Ajax.request({
      method: "POST",
      jsonData: jsonData,
      url: Backend.REST_API + "forms/cruscotto/dropdatacellbefore/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.onMoveDateOrder(btn, resp);
        } else {
          Ext.getBody().el.unmask();
          Ext.Msg.show({
            title: Locale.t("global.attenzione"),
            iconCls: "fas fa-info",
            msg: resp["msg"],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO,
          });
        }
      },
      failure: function (response) {
        Ext.getBody().el.unmask();
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          iconCls: "fas fa-info",
          msg: "Errore anomalo durante lo spostamento, ricaricare i dati e verificare eventiali anomalie.",
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.INFO,
        });
      },
    });
  },

  onMoveDateOrder: function (btn, resp) {
    let me = this;

    btn.record.data["start_time"] = resp.data["DATA_INIZIO_OPE_RIM"]
    this.messageMove = Ext.create("Ext.panel.Panel", {
      width: 400,
      bodyStyle: {
        padding: "0 15px",
      },
    });
    let panel = Ext.create("Ext.form.Panel", {
      region: "center",
      width: 400,
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "bottom",
          items: [
            {
              text: Locale.t("skd.top.filtri.movedaterange.chiudi"),
              handler: function () {
                this.up("window").close();
              },
            },
            {
              text: Locale.t("skd.top.filtri.movedaterange.confermacambio"),
              scope: me,
              handler: function () {
                me.onHandelMoveDate(panel);
              },
            },
          ],
        },
      ],
      layout: {
        type: "vbox",
      },
      items: [
        {
          xtype: "fieldset",
          width: 400,
          layout: {
            type: "hbox",
          },
          items: [
            {
              xtype: "displayfield",
              labelAlign: "top",
              flex: 1,
              fieldLabel: Locale.t(
                "skd.forms.cruscotto.odp.fields.ope_op_start_date"
              ),
              renderer: Ext.util.Format.dateRenderer("d/m/Y"),
              value: btn.record.data["start_time"],
              // value: resp.data["DATA_INIZIO_OPE_RIM"],
            },
            {
              xtype: "displayfield",
              labelAlign: "top",
              flex: 1,
              fieldLabel: Locale.t(
                "skd.forms.cruscotto.odp.fields.ope_op_finish_date"
              ),
              renderer: Ext.util.Format.dateRenderer("d/m/Y"),
              value: btn.record.data["end_time"],
            },
          ],
        },
        {
          xtype: "panel",
          padding: 5,
          items: [
            {
              xtype: "datefield",
              startDay: 1,
              labelWidth: 150,
              name: "date",
              fieldLabel: Locale.t("skd.top.filtri.movedaterange.cambio"),
              value: resp.data["DATA_INIZIO_OPE_RIM"],
            },
          ],
        },
        this.messageMove,
      ],
    });
    this.winChangeDate = Ext.create("Ext.window.Window", {
      width: 400,
      height: 340,
      userCls: "goma-window-materiali",
      modal: true,
      header: false,
      border: false,
      shadow: true,
      bodyStyle: "background-color: transparent !important;",
      animateTarget: btn.view,
      x: btn.view.x,
      layout: {
        type: "border",
      },
      items: [
        {
          xtype: "panel",
          region: "north",
          style: "text-align:center;",
          padding: 3,
          bodyStyle: "background-color: transparent !important",
          html:
            '<div class="goma-window-title">' +
            Locale.t("skd.grids.columns.order_no") +
            " :" +
            btn.record.data["order_no"] +
            "</div>",
          height: 40,
        },
        panel,
      ],
    });
    Ext.getBody().el.unmask();
    this.winChangeDate.show();
  },

  //spostamento massivo
  onMoveRangeDateBefore: function () {
    let me = this,
      grid = this.grid,
      vm = this.getViewModel(),
      filtri = vm.get("filtri"),
      list = [],
      data = [];
    if (!this.grid) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        iconCls: "fas fa-info",
        msg: Locale.t("skd.top.filtri.movedaterange.empty"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.WARNING,
      });
      return;
    }
    Ext.getBody().el.mask(Locale.t("global.form.caricamento"));
    let store = grid.getStore(),
      v = null;
    let f_dal = new Date(filtri.work_day_dal);
    let f_al = new Date(filtri.work_day_al);
    for (let i = 0; i < store.data.length; i++) {
      v = store.data.items[i].data;
      let st = new Date(v.start_time);

      if (st >= f_dal && st <= f_al && v.tipo === "ODP") {
        let s = store.data.items[i].data;
        data = {
          lab: s.lab,
          idrow: s.idrow,
          key: s.key,
          part_no: s.part_no,
          order_no: s.order_no,
          local_start_time: s.start_time, //Beppe start_time
          local_end_time: s.end_time, //Beppe end_time
          end_time_odp: s.end_time_odp,
          contract: s.contract,
          release_no: s.sc_op_release_no,
          sequence_no: s.sc_op_sequence_no,
          sc_op_res_ordine: s.sc_op_res_ordine,
          qta_odp: 0,
          seleziona: false,
        };
        list.push(data);
      }
    }

    Ext.Ajax.request({
      method: "POST",
      jsonData: list,
      url: Backend.REST_API + "forms/cruscotto/dropdatacellsbefore/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.onMoveRangeDate(resp);
        } else {
          Ext.getBody().el.unmask();
          Ext.Msg.show({
            title: Locale.t("global.attenzione"),
            iconCls: "fas fa-info",
            msg: resp["msg"],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO,
          });
        }
      },
      failure: function (response) {
        Ext.getBody().el.unmask();
        //messaggio errore su loaddata gtid
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          iconCls: "fas fa-info",
          msg: "Errore anomalo durante lo spostamento, ricaricare i dati e verificare eventiali anomalie.",
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.INFO,
        });
      },
    });
  },
  onMoveRangeDate: function (resp) {
    let me = this,
      grid = this.grid,
      vm = this.getViewModel(),
      filtri = vm.get("filtri"),
      list = [],
      data = [];
    if (!this.grid) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        iconCls: "fas fa-info",
        msg: Locale.t("skd.top.filtri.movedaterange.empty"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.WARNING,
      });
      return;
    }

    this.storeListDateRange = Ext.create("Ext.data.Store", {
      data: resp.data,
    });
    this.listDateRange = Ext.create("skd.view.grids.ListDateRange", {
      flex: 1,
      store: this.storeListDateRange,
    });

    this.numDateRange = Ext.create("Ext.form.field.Number", {
      value: 0,
      fieldLabel: Locale.t("skd.top.filtri.movedaterange.ngiorni"),
      labelWidth: 150,
    });
    this.winMoveDateRange = Ext.create("Ext.window.Window", {
      title: Locale.t("skd.top.filtri.movedaterange.title"),
      width: Ext.getBody().getViewSize().width - 100,
      height: Ext.getBody().getViewSize().height - 100,
      userCls: "goma-window-materiali",
      modal: true,
      border: false,
      shadow: true,
      bodyStyle: "background-color: transparent !important;",
      layout: {
        type: "fit",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              text: "Annulla",
              ui: "red",
              iconCls: "fas fa-window-close",
              handler: function () {
                me.winMoveDateRange.close();
              },
            },
            {
              scope: this,
              text: "Esegui",
              ui: "green",
              iconCls: "fas fa-arrow-circle-right",
              handler: "onMoveDateRangeHandler",
            },
          ],
        },
        {
          xtype: "toolbar",
          dock: "top",
          items: [this.numDateRange],
        },
      ],
      items: [this.listDateRange],
    });
    Ext.getBody().el.unmask();
    this.winMoveDateRange.show();
  },
  onMoveDateRangeHandler: function () {
    this.storeDataRangeGood = [];
    if (this.onCheckDateRange1()) {
      this.onMoveDateRangeHandlerCheck();
    }
  },
  onMoveDateRangeHandlerCheck: function () {
    let me = this;

    let store = Ext.create("Ext.data.Store", {
      data: this.storeDataRangeGood,
    });
    let grid = Ext.create("Ext.grid.Panel", {
      store: store,
      viewConfig: {
        markDirty: false,
        stripeRows: true,
        enableTextSelection: true,
        emptyText: Locale.t("skd.top.filtri.movedaterange.emptyText"),
      },
      columns: {
        items: [
          {
            text: Locale.t("skd.grids.columns.lab"),
            dataIndex: "lab",
            flex: 1,
            minWidth: 150,
          },
          {
            text: Locale.t("skd.grids.columns.part_no"),
            dataIndex: "part_no",
            flex: 1,
            minWidth: 150,
          },
          {
            text: Locale.t("skd.grids.columns.order_no"),
            dataIndex: "order_no",
            width: 70,
          },
          {
            text: Locale.t("skd.grids.columns.new_start"),
            dataIndex: "local_start_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.new_end"),
            dataIndex: "local_end_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.start_time"),
            dataIndex: "start_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.end_time"),
            dataIndex: "end_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.qty"),
            dataIndex: "qty",
            width: 90,
          },
        ],
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
      },
    });
    this.winAlertMoveRange = Ext.create("Ext.window.Window", {
      title: Locale.t("skd.top.filtri.movedaterange.title"),
      width: Ext.getBody().getViewSize().width - 100,
      height: Ext.getBody().getViewSize().height - 100,
      userCls: "goma-window-materiali",
      modal: true,
      border: false,
      shadow: true,
      bodyStyle: "background-color: transparent !important;",
      layout: {
        type: "fit",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          height: 140,
          layout: {
            type: "fit",
          },
          items: [
            {
              xtype: "panel",
              bodyCls: "alert-moveRange",
              flex: 1,
              padding: 30,
              height: 140,
              html: Locale.t("skd.top.filtri.movedaterange.confermi"),
            },
          ],
        },
        {
          xtype: "toolbar",
          dock: "top",
          layout: {
            pack: "center",
            type: "hbox",
          },
          items: [
            {
              text: Locale.t("skd.top.filtri.movedaterange.annullachiudi"),
              iconCls: "fas fa-window-close",
              ui: "red",
              handler: function () {
                me.winMoveDateRange.close();
                me.winAlertMoveRange.close();
              },
            },
            {
              text: Locale.t("skd.top.filtri.movedaterange.torna"),
              iconCls: "fas fa-backward",
              handler: function () {
                me.winAlertMoveRange.close();
              },
            },
            {
              scope: this,
              text: Locale.t("skd.top.filtri.movedaterange.si"),
              ui: "green",
              iconCls: "fas fa-thumbs-up",
              handler: "onMoveRangeHandlerWinCheck",
            },
          ],
        },
      ],
      items: [grid],
    });
    this.winAlertMoveRange.show();
  },
  onMoveRangeHandlerWinCheck: function () {
    let me = this;
    if (this.storeDataRangeGood.length > 25) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        iconCls: "fas fa-info",
        msg: Locale.t("skd.top.filtri.movedaterange.troppi"),
        buttons: Ext.Msg.YESNOCANCEL,
        icon: Ext.MessageBox.WARNING,
        fn: function (btn) {
          if (btn === "yes") {
            me.goMoveDateRange();
          } else if (btn === "no") {
          } else {
            me.winMoveDateRange.hide();
          }
        },
      });
    } else {
      this.goMoveDateRange();
    }
  },
  goMoveDateRange: function () {
    let me = this,
      store = this.storeDataRangeGood,
      numDays = this.numDateRange.getValue(),
      jsonData = {
        store: store,
        numDays: numDays,
      };

    this.winAlertMoveRange.el.mask("Spostamento in corso...");
    this.winMoveDateRange.el.mask("Spostamento in corso...");
    Ext.Ajax.request({
      method: "POST",
      jsonData: jsonData,
      timeout: 240000,
      url: Backend.REST_API + "forms/cruscotto/dropdatacells/",
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp["success"] === true) {
          me.onHandelMoveDateAfter1(resp);
        } else {
          me.winMoveDateRange.el.unmask();
          me.winAlertMoveRange.el.unmask();
          Ext.Msg.show({
            title: Locale.t("global.attenzione"),
            iconCls: "fas fa-info",
            msg: resp["msg"],
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO,
          });
        }
      },
      failure: function (response) {
        //TODO messaggio errore su loaddata gtid
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          iconCls: "fas fa-info",
          msg: "Errore anomalo durante lo spostamento, ricaricare i dati e verificare eventiali anomalie.",
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.INFO,
        });
        me.winMoveDateRange.close();
        me.winAlertMoveRange.close();
      },
    });
  },
  //verifico se ho delle selezioni
  //verifico se ho inserito un numero
  onCheckDateRange1: function () {
    let r = true,
      msg = "",
      store = this.storeListDateRange;

    if (
      this.numDateRange.getValue() === null ||
      this.numDateRange.getValue() === 0
    ) {
      r = false;
      msg = Locale.t("skd.top.filtri.movedaterange.giorni");
    }

    for (let i = 0; i < store.data.length; i++) {
      if (store.data.items[i].data.seleziona === true) {
        this.storeDataRangeGood.push(store.data.items[i].data);
      }
    }
    if (this.storeDataRangeGood.length === 0) {
      msg += msg === "" ? "" : "<br>";
      msg += Locale.t("skd.top.filtri.movedaterange.odp");
      r = false;
    }
    if (msg !== "") {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        iconCls: "fas fa-info",
        msg: msg,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.WARNING,
      });
    }
    return r;
  },
  onHandelMoveDateAfter1: function (resp) {
    let me = this,
      eccezione = "",
      row = [];

    this.winMoveDateRange.close();
    this.winAlertMoveRange.close();

    //presentare resoconto operazione
    for (let i = 0; i < this.storeDataRangeGood.length; i++) {
      this.storeDataRangeGood[i]["esito"] = false;
    }

    for (let i = 0; i < this.storeDataRangeGood.length; i++) {
      for (let ii = 0; ii < resp.good.length; ii++) {
        let r = resp.good[ii];
        if (r["key"] === this.storeDataRangeGood[i]["key"]) {
          this.storeDataRangeGood[i]["esito"] = true;
        }
      }
    }

    if (this.storeDataRangeGood.length > resp.good.length) {
      let saltati = this.storeDataRangeGood.length - resp.good.length;
      eccezione =
        '<span style="color:red;"> ' +
        Locale.t("skd.top.filtri.movedaterange.eccezione") +
        " " +
        saltati +
        "</span>";
    }
    let store = Ext.create("Ext.data.Store", {
      data: this.storeDataRangeGood,
    });
    let grid = Ext.create("Ext.grid.Panel", {
      store: store,
      viewConfig: {
        markDirty: false,
        stripeRows: true,
        enableTextSelection: true,
        emptyText: Locale.t("skd.top.filtri.movedaterange.emptyText"),
        getRowClass: function (record, index) {
          if (record.data["esito"]) {
            return " alert-moveRange-green";
          } else {
            return " alert-moveRange-red";
          }
        },
      },
      columns: {
        items: [
          {
            text: Locale.t("skd.grids.columns.lab"),
            dataIndex: "lab",
            flex: 1,
            minWidth: 100,
          },
          {
            text: Locale.t("skd.grids.columns.part_no"),
            dataIndex: "part_no",
            flex: 1,
            minWidth: 100,
          },
          {
            text: Locale.t("skd.grids.columns.order_no"),
            dataIndex: "order_no",
            width: 70,
          },
          {
            text: Locale.t("skd.grids.columns.new_start"),
            dataIndex: "local_start_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.new_end"),
            dataIndex: "local_end_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.start_time"),
            dataIndex: "start_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.end_time"),
            dataIndex: "end_time",
            renderer: Ext.util.Format.dateRenderer("d/m/Y"),
            width: 120,
          },
          {
            text: Locale.t("skd.grids.columns.qty"),
            dataIndex: "sc_op_res_ordine",
            width: 60,
          },
        ],
        defaults: {
          menuDisabled: true,
          sortable: false,
        },
      },
    });
    this.winAfterMoveRange = Ext.create("Ext.window.Window", {
      title: Locale.t("skd.top.filtri.movedaterange.title"),
      width: Ext.getBody().getViewSize().width - 100,
      height: Ext.getBody().getViewSize().height - 100,
      userCls: "goma-window-materiali",
      modal: true,
      border: false,
      shadow: true,
      bodyStyle: "background-color: transparent !important;",
      layout: {
        type: "fit",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          height: 100,
          layout: {
            type: "fit",
          },
          items: [
            {
              xtype: "panel",
              bodyCls: "alert-moveRange",
              flex: 1,
              padding: 10,
              html:
                Locale.t("skd.top.filtri.movedaterange.completata") +
                " " +
                eccezione,
            },
          ],
        },
        {
          xtype: "toolbar",
          dock: "top",
          height: 100,
          layout: {
            type: "fit",
          },
          items: [
            {
              xtype: "panel",
              bodyCls: "alert-moveRange",
              flex: 1,
              padding: 10,
              html: Locale.t("skd.top.filtri.movedaterange.spostamento"),
            },
          ],
        },
        {
          xtype: "toolbar",
          dock: "top",
          layout: {
            pack: "center",
            type: "hbox",
          },
          items: [
            {
              text: "Chiudi",
              iconCls: "fas fa-window-close",
              ui: "red",
              handler: function () {
                me.winAfterMoveRange.close();
              },
            },
          ],
        },
      ],
      items: [grid],
    });
    this.winAfterMoveRange.show();
    this.onLoadGrid();
  },
});
