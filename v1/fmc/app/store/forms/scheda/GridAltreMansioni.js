/**
 * Created by luca on 17/06/2017.
 */
Ext.define('fmc.store.forms.scheda.GridAltreMansioni', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridaltremansioni',
    requires:[
        'fmc.model.forms.scheda.GridAltreMansioni'
    ],
    model:'fmc.model.forms.scheda.GridAltreMansioni'
});