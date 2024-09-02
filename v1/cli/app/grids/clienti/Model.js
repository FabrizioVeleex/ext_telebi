/**
 * Created by fabrizio on 31/01/2022.
 */
Ext.define("cli.grids.clienti.Model", {
  extend: "Ext.data.Model",
  fields: [
    {name: 'id', type: 'string'},
    {name: 'ragsoc', type: 'string'},
    {name: 'cdcli', type: 'string'},
    {name: 'riservato', type: 'string'},
    {name: 'comune', type: 'string'},
    {name: 'provincia', type: 'string'},
    {name: 'indirizzo', type: 'string'},
    {name: 'nazionalita', type: 'string'},
    {name: 'attivo', type: 'string'}
  ]
});
