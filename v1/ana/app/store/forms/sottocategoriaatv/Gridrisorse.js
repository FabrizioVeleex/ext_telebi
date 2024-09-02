/**
 * Created by luca on 17/06/2017.
 */
Ext.define('ana.store.forms.sottocategoriaatv.Gridrisorse', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridrisorse',
    requires:[
        'ana.model.forms.sottocategoriaatv.Gridrisorse'
    ],
    model:'ana.model.forms.sottocategoriaatv.Gridrisorse'
});