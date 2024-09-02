/**
 * Created by luca on 17/06/2017.
 */
Ext.define('fmc.store.forms.destinatario.Gridrisorse', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridrisorse',
    requires:[
        'fmc.model.forms.destinatario.Gridrisorse'
    ],
    model:'fmc.model.forms.destinatario.Gridrisorse'
});