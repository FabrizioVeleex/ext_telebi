/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridlegami.StoreLegami', {
  extend: 'portal.v1.store.grids.Store',
  alias: 'store.v1-itm-grid-articoli-legami',
  requires: [
    'itm.forms.articolo.component.gridlegami.ModelLegami'
  ],
  model: 'itm.forms.articolo.component.gridlegami.ModelLegami'
});