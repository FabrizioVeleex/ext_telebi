/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.tipologie.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-bolfor-tipologie',
    requires: [
        'bolfor.grids.tipologie.Store'
    ],
    stores: {
        storeTipologie: { type: 'v1-bolfor-tipologie', autoLoad: false },
    },
    data: {
        titolo: Locale.t('bolfor.grids.tipologie.title'),
    }
});