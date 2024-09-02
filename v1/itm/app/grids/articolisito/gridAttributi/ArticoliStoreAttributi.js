/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.grids.articolisito.gridAttributi.ArticoliStoreAttributi', {
    extend: 'portal.v1.store.grids.Store',
    alias: 'store.itm.v1-itm-grid-articoli-attributi',
    requires: [
        'itm.grids.articolisito.gridAttributi.ArticoliModelAttributi'
    ],
    model: 'itm.grids.articolisito.gridAttributi.ArticoliModelAttributi'
});