/**
 * Created by luca on 17/06/2017.
 */
Ext.define('snp.store.forms.notifica.Gridrisorse', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridrisorse',
    requires:[
        'snp.model.forms.notifica.Gridrisorse'
    ],
    model:'snp.model.forms.notifica.Gridrisorse'
});