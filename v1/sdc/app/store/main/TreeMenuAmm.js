/**
 * Created by Fabrizio on 19/10/16.
 */
Ext.define('sdc.store.main.TreeMenuAmm', {
    extend: 'Ext.data.TreeStore',
    autoLoad:false,
    requires:[
        'sdc.model.main.TreeMenuAmm'
    ],
    root: {
        id :'root',
        children : []
    },
    model: 'sdc.model.main.TreeMenuAmm',
    proxy : {
        type:'ajax',
        url: Backend.API_ADDRESS+'Main.php',
        extraParams:{_fn:'getMenuAmm'}
    }
});