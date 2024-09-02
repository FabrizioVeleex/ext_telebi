/**
 * Created by fabrizio on 30/01/18.
 */
Ext.define('skd.store.grids.cdl.CdlDett', {
    extend: 'Ext.data.Store',
    alias:'store.cdlDett',
    requires: [
        'skd.model.grids.cdl.CdlDett'
    ],
    groupField:'sc_op_lab',
    autoLoad: true,
    remoteGroup: true,
    remoteSort: true,
    leadingBufferZone: 300,
    pageSize: 200,
    model:'skd.model.grids.cdl.CdlDett'
});