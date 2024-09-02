/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.model.grids.Esportazioni', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.grid.esportazioni',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nome', type: 'string'},
        {name: 'cognomenome', type: 'string'},
        {name: 'creationdate', type: 'date',dateFormat: 'c'},
        {name: 'percorso', type: 'string'},
        {name: 'file', type: 'string'},
        {name: 'estensione', type: 'string'}
    ]
});