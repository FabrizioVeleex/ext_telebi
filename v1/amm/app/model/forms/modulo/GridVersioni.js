/**
 * Created by luke on 19/08/21.
 */
Ext.define('amm.model.forms.modulo.GridVersioni', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action', type: 'int',defaultValue:0},
        { name: 'isnew', type: 'int',defaultValue:1},
        { name: 'id', type: 'string',defaultValue:''},
        { name: 'tag', type: 'string',defaultValue:''},
        { name: 'attivo'},
        { name: 'note', type: 'string',defaultValue:''},
        { name: 'ver', type: 'string',defaultValue:''},
        { name: 'dataver',type: 'date',dateFormat: 'c'}
    ]
});