/**
 * Created by luca on 17/06/2017.
 */
Ext.define('ana.model.forms.sottocategoriaatv.Gridrisorse', {
    extend: 'Ext.data.Model',
    alias: 'model.gridrisorse',
    fields: [{name: 'idsottocategoria', type: 'string'},{name: 'idrisorsa', type: 'string'},
        {name: 'lettura', type: 'boolean',defaultValue: 0},{name: 'scrittura', type: 'boolean',defaultValue: 0},{name: 'elimina', type: 'boolean',defaultValue: 0}]
});