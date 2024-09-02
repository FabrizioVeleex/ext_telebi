/**
 * Created by luca on 27/10/2017.
 */
Ext.define('itm.grids.gomma.Model', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'cd_rotolo', type: 'string' },
        { name: 'cd_spezzone', type: 'string' },
    ]
});