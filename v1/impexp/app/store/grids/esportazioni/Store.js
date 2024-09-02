/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.store.grids.esportazioni.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-esportazioni',
    requires:[
        'impexp.model.grids.Esportazioni'
    ],
    model: 'impexp.model.grids.Esportazioni',
    proxy: {
        url: Backend.REST_API + 'grids/esportazioni/getstore/'
    }
});