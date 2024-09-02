/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("itm.grids.articolisito.editSorting.Store", {
  extend: "Ext.data.Store",
  alias: "store.itm-v1-grids-editsorting-store",
  fields: [
    { name: 'id', type: 'string' },
    { name: 'id_atr', type: 'string' },
    { name: 'changed', type: 'boolean', defaultValue: false },
    { name: 'language', type: 'string' },
    { name: 'attributo', type: 'string' },
    { name: 'sorting', type: 'number' }
  ],
});
