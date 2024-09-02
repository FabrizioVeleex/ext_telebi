/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('gnc.store.forms.scheda.GridCorrelati', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridcorrelati',
    requires:[
        'gnc.model.forms.scheda.GridCorrelati'
    ],
    model:'gnc.model.forms.scheda.GridCorrelati'
});