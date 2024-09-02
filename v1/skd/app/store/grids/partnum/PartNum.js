/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.grids.partnum.PartNum', {
    extend: 'Ext.data.Store',
    alias:'store.partnum',
    requires:[
        'skd.model.grids.partnum.PartNum'
    ],
    groupField:'part_no',
    model:'skd.model.grids.partnum.PartNum'
});
