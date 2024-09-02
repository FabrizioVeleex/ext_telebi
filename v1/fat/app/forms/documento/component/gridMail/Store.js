/**
 * Created by fabrizio on 10/02/2022.
 */
Ext.define("fat.forms.documento.component.gridMail.Store", {
  extend: "Ext.data.Store",
  alias: "store.v1-fat-forms-documento-gridmail",
  fields: [
    { name: "id", type: "int" },
    { name: "infoSend", type: "auto" },
    { name: "infoMail", type: "auto" },
    { name: "status_mail", type: "int" },
    { name: "user", type: "string" },
  ],
  data: [],
});
