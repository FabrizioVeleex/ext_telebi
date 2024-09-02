/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.model.grids.mancanti.Mancanti', {
    extend: 'Ext.data.Model',
    alias: 'model.mancanti',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json'
    ],


    fields: [
        { name: 'in_produzione', type: 'number' },
        { name: 'ope_ore_rimanenti', type: 'number' },
        { name: 'sc_op_lab', type: 'string' },
        { name: 'sc_op_order_no', type: 'string' },
        { name: 'sc_op_part_no', type: 'string' },
        { name: 'ope_work_center_no', type: 'string' },
        { name: 'data_ini_contr_ric', type: 'date', dateFormat: 'Y-m-d H:i' },
        { name: 'pors', type: 'string' },
        { name: 'rep_cdl_department_no', type: 'string' }
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
