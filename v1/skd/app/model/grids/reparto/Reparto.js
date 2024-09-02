/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.model.grids.reparto.Reparto', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json'
    ],

    fields: [
        {name: 'lab', type: 'string'},
        {name: 'priority_description',  type: 'string'},
        {name: 'reparto',  type: 'string'},
        {name: 'part_no',type: 'string'},
        {name: 'eng_chg_level',type: 'string'},
        {name: 'rep_cdl_department_no',type: 'string'}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
