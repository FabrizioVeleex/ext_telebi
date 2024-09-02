/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.store.GridDettaglio', {
    extend: 'Ext.data.Store',

    xtype:'v1-wvoi-dettaglio',
    requires:[
        'home.view.dashboard.widgets.wvoi.model.GridDettaglio'
    ],
    model:'home.view.dashboard.widgets.wvoi.model.GridDettaglio'
});
