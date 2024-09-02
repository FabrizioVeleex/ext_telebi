/**
 * Created by fabrizio on 22/02/2024.
 */
Ext.define("prd.global.cdl.ViewModel", {
  extend: "Ext.app.ViewModel",
  data: {
    logoCdl: "",
    title: ".....",
    contDown: "",
    lastCheck: "--/--/--- --:--:--",
    statoConnessione: `<span style="color:gray;">${Locale.t("prd.forms.cdl.cards.dashboard.status.loading")}</span>`,
    agent: {
      status: "-",
      lastUpdate: "-",
      name: "-",
    },
    cdl: {
      status: "-",
      folder: "-",

    },
    erp: {
      connection: "-"
    },
    logoErp: "ifs",
    cardactive: "dashboard",
    disableBtnNewOrd: false,
    record: null,
  },
  formulas: {

  }
});
