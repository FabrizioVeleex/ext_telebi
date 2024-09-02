/**
 * Created by luke on 25/11/2019.
 */
Ext.define('stver.model.grids.Targets', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.targets',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'anno', type: 'int'},
        {name: 'codstab', type: 'string'},
        {name: 'stabilimento', type: 'string'}
    ]
});