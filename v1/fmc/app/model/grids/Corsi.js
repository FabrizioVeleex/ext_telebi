/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.model.grids.Corsi', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.corsi',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'titolo', type: 'string'},
        {name: 'stato', type: 'string'},
        {name: 'tipologia', type: 'string'},
        {name: 'sede', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'datac',type: 'date',dateFormat: 'Y-m-d'},
        {name: 'datasca',type: 'date',dateFormat: 'Y-m-d'}
    ]
});