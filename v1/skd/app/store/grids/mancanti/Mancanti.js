/**
 * Created by fabrizio on 30/01/18.
 */
Ext.define('skd.store.grids.mancanti.Mancanti', {
    extend: 'Ext.data.Store',
    alias: 'store.mancanti',
    requires: [
        'skd.model.grids.mancanti.Mancanti'
    ],
    // groupField: 'sc_op_lab',
    autoLoad: true,
    // remoteGroup: true,
    // remoteSort: true,
    // leadingBufferZone: 300,
    // pageSize: 200,
    model: 'skd.model.grids.mancanti.Mancanti'
});