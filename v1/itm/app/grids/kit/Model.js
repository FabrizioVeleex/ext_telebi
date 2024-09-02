/**
 * Created by luca on 27/10/2017.
 */
Ext.define('itm.grids.kit.Model', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'cod_rotolo', type: 'string' },
        { name: 'cod_spezzone', type: 'string' },
    ]
});