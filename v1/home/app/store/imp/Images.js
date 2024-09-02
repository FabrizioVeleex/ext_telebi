/**
 * Created by fabrizio on 14/09/16.
 */
Ext.define('home.store.imp.Images', {
    extend: 'Ext.data.Store',
    xtype: 'store-impostazioni-images',
    requires:[
        'home.model.imp.Images'
    ],
    model: 'home.model.imp.Images'
});