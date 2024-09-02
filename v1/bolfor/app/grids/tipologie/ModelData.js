/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("bolfor.grids.tipologie.ModelData", {
  extend: "Ext.data.Model",
  fields: [
    { name: 'id', type: 'string' },
    { name: 'codice', type: 'string' },
    { name: 'descrizione', type: 'string' }
  ]
});
