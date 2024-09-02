/**
 * Created by fabrizio on 10/02/2022.
 */
Ext.define("t40.forms.documento.component.gridMail.Store", {
  extend: "Ext.data.Store",
  alias: "store.v1-t40-forms-documento-gridmail",
  fields: [
    { name: "from", type: "string" },
    { name: "replyTo", type: "string" },
    { name: "to", type: "string" },
    { name: "user", type: "string" },
    { name: "status_mail", type: "number" },
    { name: "attach", type: "auto" },
    { name: "sendData", type: "date", dateFormat: "c" },

  ],
  data: []
});
