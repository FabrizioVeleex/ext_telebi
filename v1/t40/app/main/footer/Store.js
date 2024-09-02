Ext.define("t40.main.footer.Store", {
  extend: "Ext.data.Store",
  alias: "store.v1-t40-main-footer-store",
  fields: [
    { name: "dettagli", type: "auto" },
    { name: "durata_media", type: "int" },
    { name: "durata_max", type: "int" },
    { name: "durata_min", type: "int" },
    { name: "tempo_totale", type: "date", dateFormat: "H:i:s" },
  ],
  data: [],
});
