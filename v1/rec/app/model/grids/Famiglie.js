/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.model.grids.Famiglie', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.famiglie',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'famiglia', type: 'string'}
    ]
});