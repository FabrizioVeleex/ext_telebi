/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.store.grids.reparto.Reparto', {
    extend: 'Ext.data.Store',
    alias:'store.reparto',
    requires:[
        'skd.model.grids.reparto.Reparto'
    ],
    groupField:'reparto',
    model:'skd.model.grids.reparto.Reparto'
});
