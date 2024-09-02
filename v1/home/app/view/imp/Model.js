/**
 * Created by fabrizio on 14/09/16.
 */
Ext.define('home.view.imp.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.impostazioni',

    stores:{
        storeImages:{xtype:'impostazioni-images',autoload:true}
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});