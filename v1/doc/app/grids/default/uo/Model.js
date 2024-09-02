/**
 * Created by luca on 27/10/2017.
 */
Ext.define('doc.view.grids.default.uo.Model', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'cd_clm', type: 'string' },
        { name: 'descr_clm', type: 'string' }
    ]
});