/**
 * Created by fabrizio on 29/12/16.
 */
Ext.define("t40.grids.GridBase", {
  extend: "portal.v1.view.grids.DefaultController",
  mixins: ["portal.v1.global.Util"],
  requires: [
    "Ext.container.Container"
  ],

  createForm: function (view, record, isnew) {
    let itemId = "f" + record.data["id"];
    if (this.getView().fireEvent("checkForm", itemId)) {
      return;
    }
    this.getView().fireEvent(
      "createTab",
      Ext.create("t40.forms.documento.Panel", {
        itemId: "f" + record.data["id"],
        record: record,
        valori: {
          id: record.data["id"],
          isnew: isnew,
          tag: record.data["tag"],
        },
      }),
      view
    );
  },

  onCloseFirmaOk: function (records) {
    let fileNotFound = records["fileNotFound"],
      fileFound = records["fileFound"],
      testoEccezione = "",
      titleEccezione = "",
      storeDocumentiGood = Ext.create(
        "t40.global.component.griddocumenti.StoreDocumenti"
      ),
      storeDocumentiError = Ext.create(
        "t40.global.component.griddocumenti.StoreDocumenti"
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
        Locale.t("t40.grids.documenti.winfirma.firmalisteccezione");
      hidden = false;
      ui = "red";
      titleEccezione =
        " [" +
        Locale.t("global.attenzione") +
        " " +
        Locale.t("t40.grids.documenti.winfirma.firmatitleeccezione") +
        "]";
    }
    let wincomplete = Ext.create("Ext.window.Window", {
      width: 700,
      ui: ui,
      layout: "fit",
      closable: false,
      modal: true,
      title:
        Locale.t("t40.grids.documenti.winfirma.firmacomplete") + titleEccezione,
      dockedItems: [
        {
          xtype: "toolbar",
          layout: {
            pack: "center",
          },
          dock: "bottom",
          items: [
            {
              text: Locale.t("global.btn.btn.close.text"),
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
                Locale.t("t40.grids.documenti.winfirma.firmalist") +
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
              hidden: hidden,
              height: 150,
              store: storeDocumentiError,
            },
          ],
        },
      ],
    });
    wincomplete.show();

    let grid = this.getView(),
      store = grid.getStore(),
      recs = records.fileFound,
      recstore = null;
    for (let i = 0; i < recs.length; i++) {
      recstore = store.findRecord("id", recs[i]["id"]);
      if (recstore) recstore.set("firma", 1);
    }
    store.reload();
    grid.getSelectionModel().deselectAll(); //pulisco selezioni
  },
});
