/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('ama.store.forms.scheda.GridParametri', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridparametri',
    requires:[
        'ama.model.forms.scheda.GridParametri'
    ],
    model:'ama.model.forms.scheda.GridParametri'
});