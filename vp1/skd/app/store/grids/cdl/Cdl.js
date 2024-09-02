/**
 * Created by fabrizio on 30/01/18.
 */
Ext.define('skd.store.grids.cdl.Cdl', {
    extend: 'Ext.data.Store',
    alias:'store.cdl',
    requires: [
        'skd.model.grids.cdl.Cdl'
    ],
    groupField:'sc_op_lab',
    autoLoad: true,
    remoteGroup: true,
    remoteSort: true,
    leadingBufferZone: 300,
    pageSize: 200,
    model:'skd.model.grids.cdl.Cdl'
});