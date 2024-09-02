/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("prd.grids.tipologie.TipologieModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: 'id', type: 'string' },
    { name: 'ragsoc', type: 'string' },
    { name: 'cdcli', type: 'string' },
    { name: 'riservato', type: 'string' },
    { name: 'comune', type: 'string' },
    { name: 'provincia', type: 'string' },
    { name: 'indirizzo', type: 'string' },
    { name: 'nazionalita', type: 'string' },
    { name: 'attivo', type: 'string' }
  ]
});
