/**
 * Created by luca on 08/02/2018.
 */
Ext.define('home.store.widgets.wvoi.GridDettaglio', {
    extend: 'Ext.data.Store',

    xtype:'wvoi-dettaglio',
    requires:[
        'home.model.widgets.wvoi.GridDettaglio'
    ],
    model:'home.model.widgets.wvoi.GridDettaglio'
});