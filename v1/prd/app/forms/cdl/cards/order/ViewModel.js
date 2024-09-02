/**
 * Created by fabrizio on 22/02/2024.
 */
Ext.define("prd.forms.cdl.cards.order.ViewModel", {
  extend: "prd.global.cdl.cards.order.ViewModel",
  alias: "viewmodel.v1-prd-forms-cdl-order-viewmodel",
  requires: [
    "prd.global.cdl.cards.order.cronology.Store",
    "prd.global.cdl.cards.order.orders.Store",
    "prd.global.cdl.cards.order.partials.Store"
  ],
  stores: {
    storeOrders: { type: "global-cdl-cards-order-orders-store" },
    storeCronology: { type: "global-cdl-cards-order-cronology-store" },
    storePartials: { type: "global-cdl-cards-order-partials-store" },
  },
  data: {
    record: {}
  },

});


