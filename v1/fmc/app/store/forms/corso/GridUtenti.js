/**
 * Created by luca on 17/06/2017.
 */
Ext.define('fmc.store.forms.corso.GridUtenti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridutenti',
    requires:[
        'fmc.model.forms.corso.GridUtenti'
    ],
    model:'fmc.model.forms.corso.GridUtenti'
});