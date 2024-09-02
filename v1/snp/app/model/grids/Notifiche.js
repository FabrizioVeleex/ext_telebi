/**
 * Created by luke on 25/11/2019.
 */
Ext.define('snp.model.grids.Notifiche', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.notifiche',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'risorse', type: 'string'}
    ]
});