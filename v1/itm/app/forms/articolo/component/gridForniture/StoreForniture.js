/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridForniture.StoreForniture', {
  extend: 'portal.v1.store.grids.Store',
  alias: 'store.v1-itm-grid-articoli-forniture',
  requires: [
    'itm.forms.articolo.component.gridForniture.ModelForniture'
  ],
  model: 'itm.forms.articolo.component.gridForniture.ModelForniture'
});