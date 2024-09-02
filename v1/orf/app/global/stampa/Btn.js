Ext.define("orf.global.stampa.Btn", {
  extend: "Ext.button.Button",
  xtype: "orf-global-btn-stampa",
  require: [
    "orf.global.stampa.Windows"
  ],
  tooltip: Locale.t("orf.grids.documenti.btn.print.tooltip"),
  text: Locale.t("orf.grids.documenti.btn.print.text"),
  ui: "orange",
  iconCls: "x-fas fa-print",
  handler: function () {
    let recordsGood = []; //array record selezionati
    let records = this.getView().getSelectionModel().getSelection();
    for (let i = 0, len = records.length; i < len; i++) {
      recordsGood.push(records[i].data);
    }
    //verifico siano stati selezionati records
    if (recordsGood.length === 0) {
      Ext.Msg.show({
        title: Locale.t("global.attenzione"),
        msg: Locale.t("orf.grids.documenti.winprint.erroreselect"),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR,
      });
      return;
    }
    this.getView().getSelectionModel().deselectAll(); //pulisco selezioni
    let win = Ext.create("orf.global.stampa.Windows", {
      recordsGood: recordsGood,
    });
    win.show();
    win.on("closePrintOk", onClosePrintOk, this);

    function onClosePrintOk(records) {
      let fileNotFound = records["fileNotFound"],
        fileFound = records["fileFound"],
        testoEccezione = "",
        titleEccezione = "",
        storeDocumentiGood = Ext.create(
          "orf.view.global.firma.store.GridDocumenti"
        ),
        storeDocumentiError = Ext.create(
          "orf.view.global.firma.store.GridDocumenti"
        ),
        ui = "green",
        hidden = true;

      storeDocumentiGood.loadData(fileFound, false);
      if (fileNotFound.length > 0) {
        storeDocumentiError.loadData(fileNotFound, false);
        testoEccezione =
          "<br>" +
          Locale.t("global.attenzione") +
          "<hr>" +
          Locale.t("orf.grids.documenti.winfirma.firmalisteccezione");
        hidden = false;
        ui = "red";
        titleEccezione =
          " [" +
          Locale.t("global.attenzione") +
          " " +
          Locale.t("orf.grids.documenti.winfirma.firmatitleeccezione") +
          "]";
      }
      let wincomplete = Ext.create("Ext.window.Window", {
        width: 800,
        ui: ui,
        layout: "fit",
        closable: false,
        modal: true,
        title:
          Locale.t("orf.grids.documenti.winfirma.firmacomplete") +
          titleEccezione,
        dockedItems: [
          {
            xtype: "toolbar",
            layout: {
              pack: "center",
            },
            dock: "bottom",
            items: [
              {
                text: Locale.t("global.btn.close.text"),
                handler: function (btn) {
                  btn.up("window").destroy();
                },
                iconCls: "x-fas fa-times",
              },
            ],
          },
        ],
        items: [
          {
            xtype: "container",
            items: [
              {
                xtype: "component",
                padding: 15,
                html:
                  "<h2>" +
                  Locale.t("orf.grids.documenti.winfirma.firmalist") +
                  "</h2>",
              },
              {
                xtype: "griddocumenti",
                height: 150,
                store: storeDocumentiGood,
              },
              {
                xtype: "component",
                padding: 15,
                hidden: hidden,
                html: '<h2 style="color:red;">' + testoEccezione + "</h2>",
              },
              {
                xtype: "griddocumenti",
                height: 150,
                hidden: hidden,
                store: storeDocumentiError,
              },
            ],
          },
        ],
      });
      wincomplete.show();
      let grid = this.getView(),
        store = grid.getStore(),
        rcptDate = new Date(),
        recs = records.fileFound,
        recstore = null;
      for (let i = 0; i < recs.length; i++) {
        recstore = store.findRecord("id", recs[i]["id"]);
        if (recstore) recstore.set("datastampa", rcptDate);
      }
      store.reload();
    }
  },
});
