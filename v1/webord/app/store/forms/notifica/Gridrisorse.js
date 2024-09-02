/**
 * Created by luca on 17/06/2017.
 */
Ext.define('webord.store.forms.notifica.Gridrisorse', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridrisorse',
    requires:[
        'webord.model.forms.notifica.Gridrisorse'
    ],
    model:'webord.model.forms.notifica.Gridrisorse'
});