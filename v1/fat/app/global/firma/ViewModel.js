/**
 * Created by fabrizio on 17/12/16.
 */
Ext.define("fat.global.firma.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.winfirma",
  requires: [
    "fat.global.component.combostampante.StoreStampante",
    "fat.global.component.griddocumenti.StoreDocumenti"
  ],
  stores: {
    combostampanti: { type: "v1-global-firma-comboStampanti", autoLoad: true },
    griddocumenti: { type: "v1-global-component-griddocumenti" },
    griddocumentiGood: { type: "v1-global-component-griddocumenti" },
    griddocumentiError: { type: "v1-global-component-griddocumenti" },
  },

  data: {
    previewstampante: "riporto stampante e numero copie ",
    recordsGood: [],
    idstampante: null,
    nomestampante: "",
    copie: 1,
    conducente: false,
    vettore: true,
    cessionario: false,
    data: new Date(),
    note: "",
    htmlNoSpool: "",
    noStampa: false,
  },
  formulas: {
    previewstampante: {
      bind: {
        copie: "{copie}",
        nomestampante: "{nomestampante}",
      },
      get: function (data) {
        if (data.copie > 0) {
          return (
            "<h2>" +
            Locale.t("fat.grids.documenti.winfirma.selezionata") +
            ": " +
            data.nomestampante +
            "," +
            Locale.t("fat.grids.documenti.winfirma.numcopie") +
            ": " +
            data.copie +
            "</h2>"
          );
        } else {
          return "<h2>" + Locale.t("fat.grids.documenti.winfirma.nostampante") + "</h2>";
        }
      },
    },
    btnfirma: {
      bind: {
        conducente: "{conducente}",
        vettore: "{vettore}",
        cessionario: "{cessionario}",
      },
      get: function (data) {
        return !data.conducente && !data.vettore && !data.cessionario;
      },
    },
    btnfirmatips: {
      bind: {
        conducente: "{conducente}",
        vettore: "{vettore}",
        cessionario: "{cessionario}",
      },
      get: function (data) {
        if (!data.conducente && !data.vettore && !data.cessionario) {
          return Locale.t("fat.grids.documenti.winfirma.btn.avvia.tipsdisable");
        }
        return Locale.t("fat.grids.documenti.winfirma.btn.avvia.tipsenable");
      },
    },
  },
});
