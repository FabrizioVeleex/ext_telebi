/**
 * Created by luca on 17/06/2017.
 */
Ext.define('impexp.store.forms.modulo.Gridrisorse', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridrisorse',
    requires:[
        'impexp.model.forms.modulo.Gridrisorse'
    ],
    model:'impexp.model.forms.modulo.Gridrisorse'
});