/**
 * Created by luca on 17/06/2017.
 */
Ext.define('ana.model.forms.fascicolo.Gridschede', {
    extend: 'Ext.data.Model',
    alias: 'viewmodel.gridschede',
    fields: [{name: 'id', type: 'string'},{name: 'nome', type: 'string'},{name: 'idfascicolo', type: 'string'},{name: 'idutente', type: 'string'}]
});