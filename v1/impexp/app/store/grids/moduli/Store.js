/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.store.grids.moduli.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-moduli',
    requires:[
        'impexp.model.grids.Moduli'
    ],
    model: 'impexp.model.grids.Moduli',
    proxy: {
        url: Backend.REST_API + 'grids/moduli/getstore/'
    }
});