/**
 * Created by luca on 17/06/2017.
 */
Ext.define('ana.store.forms.fascicolo.GridSchede', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridschede',
    requires:[
        'ana.model.forms.fascicolo.Gridschede'
    ],
    model:'ana.model.forms.fascicolo.Gridschede'
});