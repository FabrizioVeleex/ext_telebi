/**
 * Created by fabrizio on 02/03/21.
 */
Ext.define('portal.v1.store.main.TreeMenuAmm', {
    extend: 'Ext.data.TreeStore',
    autoLoad:false,
    requires: [
        'portal.v1.model.main.TreeMenu'
    ],
    root: {
        id :'root',
        children : []
    },
    model:'portal.v1.model.main.TreeMenu',
    proxy : {
        type:'ajax',
        url: Backend.REST_API+'main/getmenuamm'
    }
});