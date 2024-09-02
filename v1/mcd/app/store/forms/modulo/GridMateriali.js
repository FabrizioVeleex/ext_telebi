/**
 * Created by luca on 18/07/2018.
 */
Ext.define('mcd.store.forms.modulo.GridMateriali', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridmateriali',
    requires:[
        'mcd.model.forms.modulo.GridMateriali'
    ],
    model:'mcd.model.forms.modulo.GridMateriali'
});