/**
 * Created by luca on 17/06/2017.
 */
Ext.define('fmc.store.forms.verifica.GridNominativi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridnominativi',
    requires:[
        'fmc.model.forms.verifica.GridNominativi'
    ],
    model:'fmc.model.forms.verifica.GridNominativi'
});