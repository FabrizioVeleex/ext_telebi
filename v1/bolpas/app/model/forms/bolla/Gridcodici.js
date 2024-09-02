/**
 * Created by luke on 23/06/21.
 */
Ext.define('bolpas.model.forms.bolla.Gridcodici', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'action', type: 'int',defaultValue:0},
        { name: 'isnew', type: 'int',defaultValue:1},
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'codice', type: 'string',defaultValue:''}
    ]
});