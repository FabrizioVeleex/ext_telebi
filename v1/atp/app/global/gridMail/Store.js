/**
 * Created by fabrizio on 27/11/23.
 */
Ext.define("atp.global.gridMail.Store", {
  extend: "Ext.data.Store",
  alias: "store.v1-atp-global-gridmail",
  fields: [
    { name: "status", type: "number" },
    { name: "from", type: "auto" },
    { name: "to", type: "auto" },
    { name: "user", type: "auto" },
    { name: "attach", type: "auto" },
    { name: "sendData", type: "date", dateFormat: "c" },
  ],
  data: [],
  proxy: {
    type: 'memory',
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  }
});
