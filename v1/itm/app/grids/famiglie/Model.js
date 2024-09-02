/**
 * Created by luca on 27/10/2017.
 */
Ext.define('itm.grids.famiglie.Model', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'cd_fam', type: 'string' },
        { name: 'cd_clm', type: 'string' },
        { name: 'descr_fam', type: 'string' }
    ]
});