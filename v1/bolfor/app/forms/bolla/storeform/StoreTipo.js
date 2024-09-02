/**
 * Created by luca on 17/06/2017.
 */
Ext.define('bolfor.forms.bolla.storeform.StoreTipo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-bolfor-storetipo',
    fields:[
        'id','descrizione','codice'
    ],
    data:[]
});