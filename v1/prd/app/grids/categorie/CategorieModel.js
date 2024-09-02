/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("prd.grids.categorie.CategorieModel", {
  extend: "Ext.data.Model",
  fields: [
    { name: 'id', type: 'string' },
    { name: 'cd_cat', type: 'string' },
    { name: 'descr_cat', type: 'string' }
  ]
});
