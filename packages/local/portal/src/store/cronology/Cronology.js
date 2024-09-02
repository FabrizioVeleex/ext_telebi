/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.store.cronology.Cronology', {
    extend: 'Ext.data.Store',
    alias:'store.cronologystore',
    requires:[
        'portal.model.cronology.Cronology',
        'Ext.data.proxy.Rest'
    ],
    model:'portal.model.cronology.Cronology',
    proxy: {
        type: 'rest',
        url: Backend.API_GLOBAL + 'Cronology.php',
        extraParams: {'_fn': 'getCronology'},
        appendId: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});