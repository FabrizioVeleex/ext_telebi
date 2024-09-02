/**
 * Created by luca on 18/07/2018.
 */
Ext.define('mcd.model.forms.modulo.GridMateriali', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string'},
        { name: 'descrizione', type: 'string'},
        { name: 'valido', type: 'boolean',defaultValue: 0},
        { name: 'qta', type: 'string'},
        { name: 'note', type: 'string'}
    ]
});