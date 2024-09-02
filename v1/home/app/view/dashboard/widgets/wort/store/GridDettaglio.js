/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.wort.store.GridDettaglio', {
    extend: 'Ext.data.Store',
    alias:'store.v1-wort-dettaglio',
    requires:[
        'home.view.dashboard.widgets.wort.model.GridDettaglio'
    ],
    autoLoad: false,
    model:'home.view.dashboard.widgets.wort.model.GridDettaglio'
});
