/**
 * Created by luke on 03/10/2019.
 */
Ext.define('cde.view.grids.notifiche.component.Model', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.v1-notifiche',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'descrizione', type: 'string'},
        {name: 'risorse', type: 'string'}
    ]
});