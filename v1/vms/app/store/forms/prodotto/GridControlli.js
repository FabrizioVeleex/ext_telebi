/**
 * Created by luca on 17/06/2017.
 */
Ext.define('vms.store.forms.prodotto.GridControlli', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridcontrolli',
    requires:[
        'vms.model.forms.prodotto.GridControlli'
    ],
    model:'vms.model.forms.prodotto.GridControlli'
});