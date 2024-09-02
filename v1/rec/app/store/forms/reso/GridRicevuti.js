/**
 * Created by luca on 17/03/2017.
 */
Ext.define('rec.store.forms.reso.GridRicevuti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridricevuti',
    requires:[
        'rec.model.forms.reso.GridRicevuti'
    ],
    model:'rec.model.forms.reso.GridRicevuti'
})