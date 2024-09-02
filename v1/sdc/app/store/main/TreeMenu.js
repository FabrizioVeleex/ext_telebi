/**
 * Created by Fabrizio on 19/10/16.
 */
Ext.define('sdc.store.main.TreeMenu', {
    extend: 'Ext.data.TreeStore',
    autoLoad:false,
    requires:[
        'sdc.model.main.TreeMenu'
    ],
    root: {
        id :'root',
        children : []
    },
    model: 'sdc.model.main.TreeMenu',
    proxy : {
        type:'ajax',
        url: Backend.API_ADDRESS+'Main.php',
        extraParams:{_fn:'getMenu'}
    }
});