/**
 * Created by luca on 22/06/16.
 */
Ext.define('portal.v1.model.grids.cronology.Cronology', {
    extend: 'Ext.data.Model',
    requires:[

    ],
    fields: [
        { name: 'id', type: 'string' },
        { name: 'username', type: 'string' },
        { name: 'log', type: 'string' },
        { name: 'note', type: 'string' },
        { name:'datelog', type:'date',dateFormat :'Y-m-d H:i:s'}
    ]
});