/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('gnc.store.forms.scheda.GridMacchinari', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridmacchinari',
    requires:[
        'gnc.model.forms.scheda.GridMacchinari'
    ],
    model:'gnc.model.forms.scheda.GridMacchinari'
});