/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("atp.forms.components.comboRuoli.Store", {
  extend: "Ext.data.Store",
  requires: ["Ext.data.proxy.Rest"],
  fields: ["idRole", "role"],
  listeners: {
    beforeload: function (store) {
      if (store.isLoading()) return false;
    },
  },
  data: [
    { idRole: "R01", role: 'Lettura', type: 'string' },
    { idRole: "R02", role: 'Modifica', type: 'string' },
  ]
});
