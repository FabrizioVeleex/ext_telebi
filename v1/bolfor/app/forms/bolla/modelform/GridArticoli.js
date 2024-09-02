/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolfor.forms.bolla.modelform.GridArticoli', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string'},
        { name: 'id_head', type: 'string'},
        { name: 'id_articolo', type: 'string'},
        { name: 'cd_art', type: 'string'},
        { name: 'descrizione', type: 'string'},
        { name: 'um', type: 'string'},
        { name: 'id_riga', type: 'string'},
        { name: 'qta', type: 'float'},
        { name: 'residuo', type: 'float'},
        { name: 'num_riga', type: 'int'},
        { name: 'step', type: 'int'}
    ]
});