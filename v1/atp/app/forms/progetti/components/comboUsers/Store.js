/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("atp.forms.progetti.components.comboUsers.Store", {
  extend: "Ext.data.Store",
  requires: ["Ext.data.proxy.Rest"],
  fields: ["id", "nominativo"],
  listeners: {
    beforeload: function (store) {
      if (store.isLoading()) return false;
    },
  },
  proxy: {
    type: 'rest',
    url: Backend.REST_API + "functions/getComboUsers/",
    appendId: false,
    reader: {
      type: "json",
      rootProperty: "data",
    },
  },
});
