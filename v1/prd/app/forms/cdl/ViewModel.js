/**
 * Created by fabrizio on 22/02/2024.
 */
Ext.define("prd.forms.cdl.ViewModel", {
  extend: "prd.global.cdl.ViewModel",
  alias: "viewmodel.prd-model-cdl",
  requires: [
    "prd.global.cdl.cards.dashboard.gridProps.Store",
    "prd.global.cdl.cards.dashboard.gridOrder.Store",
    "prd.global.cdl.cards.history.Store",
    "prd.global.cdl.cards.send.grid.Store",
    "prd.global.cdl.cards.queue.Store"
  ],
  stores: {
    storeProps: { type: "global-cdl-cards-dashboard-gridprops-store" },
    storeOrd: { type: "global-cdl-cards-dashboard-gridord-store" },
    storeHistory: { type: "global-cdl-cards-history-store" },
    storeQueue: { type: "global-cdl-cards-queue-store" },
  },
});
