/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("bolfor.grids.bolle.BolleModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: 'id', type: 'string' },
    { name: 'num_doc', type: 'string' },
    {name: 'creationdate',type: 'date',dateFormat: 'c'},
    {name: 'data_doc',type: 'date',dateFormat: 'c'},
    { name: 'num_ord', type: 'string' },
    {name: 'data_ord',type: 'date',dateFormat: 'c'},
    { name: 'ragsoc', type: 'string' },
    { name: 'nomefile', type: 'string' }
  ]
});
