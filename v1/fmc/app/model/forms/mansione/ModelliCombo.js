/**
 * Created by luke on 19/11/2019.
 */
Ext.define('fmc.model.forms.mansione.ModelliCombo', {
    extend: 'Ext.data.Model',
    alias: 'model.modellicombo',
    fields: [
        {name: 'idmodello', type: 'string' },
        {name: 'titolo', type: 'string' },
        {name: 'isnew', defaultValue:0},
        {name: 'action', defaultValue:0}
    ]
});