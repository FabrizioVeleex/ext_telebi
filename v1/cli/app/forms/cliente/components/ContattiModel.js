/**
 * Created by luke on 09/06/23.
 */
Ext.define('cli.forms.cliente.components.ContattiModel', {
    extend: 'Ext.data.Model',
    alias: 'model.v1-cli-girdcontatti',
    fields: [
        {name: 'id', type: 'string',defaultValue:''},
        {name: 'nominativo', type: 'string',defaultValue:''},
        {name: 'telefono', type: 'string',defaultValue:''},
        {name: 'email', type: 'string',defaultValue:''}
    ]
});