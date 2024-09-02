/**
 * Created by luke on 13/05/2020.
 */
Ext.define('fmc.model.forms.scheda.AltreMansioniCombo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idmansione', type: 'string' },
        {name: 'descrizione', type: 'string' },
        {name: 'isnew', defaultValue:0},
        {name: 'action', defaultValue:0}
    ]
});