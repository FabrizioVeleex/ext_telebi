/**
 * Created by luca on 17/03/2017.
 */
Ext.define('rec.store.forms.reso.GridArticoli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridarticoli',
    requires:[
        'rec.model.forms.reso.GridArticoli'
    ],
    model:'rec.model.forms.reso.GridArticoli'
})