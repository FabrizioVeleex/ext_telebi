/**
 * Created by luke on 29/07/21.
 */
Ext.define('stt.view.forms.obbiettivo.cards.StoreModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'action', type: 'int', defaultValue: 0 },
        { name: 'isnew', type: 'int', defaultValue: 1 },
        { name: 'id', type: 'string', defaultValue: '' },
        { name: 'idmodello', type: 'string', defaultValue: '' },
        { name: 'idapp', type: 'string', defaultValue: '' },
        { name: 'titolo', type: 'string', defaultValue: '' }
    ]
});