/**
 * Created by luca on 17/06/2017.
 */
Ext.define('snp.store.forms.scheda.GridConcorrenti', {
    extend: 'Ext.data.Store',
    alias:'store.v1-concorrenti',
    requires:[
        'snp.model.forms.scheda.GridConcorrenti'
    ],
    model:'snp.model.forms.scheda.GridConcorrenti'
});