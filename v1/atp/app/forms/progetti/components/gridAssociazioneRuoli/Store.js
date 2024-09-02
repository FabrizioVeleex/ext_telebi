/**
 * Created by fabrizio on 10/02/2022.
 */
Ext.define("atp.forms.progetti.components.gridAssociazioneRuoli.Store", {
  extend: "Ext.data.Store",
  alias: "store.v1-atp-forms-progetti-components-storeAssociazioneRuoli",
  fields: [
    { name: "idRole", type: 'string' },
    { name: "idUser", type: 'string' },
    { name: "nameSurname", type: 'string', defaultValue: "" },
    { name: "role", type: 'string', defaultValue: "" },
  ],
  data: [],
});