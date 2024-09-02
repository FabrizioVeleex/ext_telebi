/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.grids.labs.Labs', {
    extend: 'Ext.data.Store',
    alias:'store.lab',
    requires:[
        'skd.model.grids.labs.Labs'
    ],
    groupField:'lab_order',
    model:'skd.model.grids.labs.Labs'
});
