/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wcon.store.GridDettaglio', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-wcongriddettaglio',
    requires:[
        'home.view.dashboard.widgets.wcon.model.GridDettaglio'
    ],
    model:'home.view.dashboard.widgets.wcon.model.GridDettaglio'
})
