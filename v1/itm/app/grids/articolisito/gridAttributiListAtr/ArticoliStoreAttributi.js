/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.grids.articolisito.gridAttributi.ArticoliStoreAttributiListAtr', {
    extend: 'portal.v1.store.grids.Store',
    alias: 'store.itm.v1-itm-grid-articoli-attributilistatr',
    requires: [
        'itm.grids.articolisito.gridAttributi.ArticoliModelAttributiListAtr'
    ],
    model: 'itm.grids.articolisito.gridAttributi.ArticoliModelAttributiListAtr'
});