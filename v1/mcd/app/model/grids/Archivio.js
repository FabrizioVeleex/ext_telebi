/**
 * Created by luca on 17/07/2018.
 */
Ext.define('mcd.model.grids.Archivio', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.archivio',
    fields: [{name: 'id', type: 'string'},{name: 'dip_nome', type: 'string'},
        {name: 'consegna', type: 'date',dateFormat: 'Y-m-d'},{name: 'sede', type: 'string'}]
});