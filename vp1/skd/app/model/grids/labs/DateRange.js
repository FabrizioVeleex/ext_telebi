/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.model.grids.labs.DateRange', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json'
    ],

    fields: [
        {name: 'lab', type: 'string'},
        { name: 'start_time', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'start_end', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'seleziona',  type: 'boolean'},
        {name: 'part_no',type: 'string'},
        {name: 'order_no',type: 'string'}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
