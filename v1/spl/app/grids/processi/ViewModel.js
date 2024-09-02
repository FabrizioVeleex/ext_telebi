/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('spl.grids.processi.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.v1-spl-grid-processi',
    requires: [
        'spl.grids.processi.Store'
    ],
    stores: {
        store: { type: 'v1-spl-store-processi', autoLoad: false }
    },
    data: {
        titolo: Locale.t('spl.grids.processi.title'),
    }
});