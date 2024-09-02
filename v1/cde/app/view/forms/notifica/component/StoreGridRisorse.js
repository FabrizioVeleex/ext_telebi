/**
 * Created by luca on 17/06/2017.
 */
Ext.define('cde.view.forms.notifica.component.StoreGridRisorse', {
    extend: 'Ext.data.Store',
    alias:'store.v1-form-cde-gridrisorse',
    requires:[
        'cde.view.forms.notifica.component.Gridrisorse'
    ],
    model:'cde.view.forms.notifica.component.Gridrisorse'
});