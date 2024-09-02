/**
 * Created by fabrizio on 22/02/2024.
 */
Ext.define("prd.global.cdl.cards.send.ViewModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.v1-prd-model-panotec-send",
  requires: [
    "prd.global.cdl.cards.send.grid.Store",
    "prd.global.cdl.cards.send.folder.Store"
  ],
  stores: {
    storeSend: { type: "panotec-gridsend-store" },
    storeFolders: { type: "panotec-folder-store" },
  },
  data: {
    message: "Caricamento cartelle in corso...",
    disableSend: true,
    programFile: "",
    programSelected: `<div style="border:1px solid;padding:10px;margin:5px;display:inline-block;">Selezionare un programma dall'elenco per proseguire</div>`
  },

});
