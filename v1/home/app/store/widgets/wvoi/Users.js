/**
 * Created by fabrizio on 22/11/16.
 */
Ext.define('home.store.widgets.wvoi.Users', {
    extend: 'Ext.data.Store',
    alias:'store.widgetwviousers',
    /*
    Uncomment to use a specific model class
    model: 'User',
    */

    fields: [
        {name: 'codice', type: 'string'},
        {name: 'nominativo',  type: 'string'}
    ],

    data : []
});