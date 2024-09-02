/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.store.grids.importazioni.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-importazioni',
    requires:[
        'impexp.model.grids.Importazioni'
    ],
    model: 'impexp.model.grids.Importazioni',
    proxy: {
        url: Backend.REST_API + 'grids/importazioni/getstore/'
    }
});