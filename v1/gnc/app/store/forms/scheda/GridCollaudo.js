/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('gnc.store.forms.scheda.GridCollaudo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridcollaudo',
    requires:[
        'gnc.model.forms.scheda.GridCollaudo'
    ],
    model:'gnc.model.forms.scheda.GridCollaudo'
});