/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.store.Users', {
    extend: 'Ext.data.Store',
    alias:'store.v1-widgetwviousers',

    fields: [
        {name: 'codice', type: 'string'},
        {name: 'nominativo',  type: 'string'}
    ],

    data : []
});
