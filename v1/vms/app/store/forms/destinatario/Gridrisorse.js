/**
 * Created by luca on 17/06/2017.
 */
Ext.define('vms.store.forms.destinatario.Gridrisorse', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridrisorse',
    requires:[
        'vms.model.forms.destinatario.Gridrisorse'
    ],
    model:'vms.model.forms.destinatario.Gridrisorse'
});