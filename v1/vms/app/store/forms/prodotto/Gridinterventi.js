/**
 * Created by luca on 17/06/2017.
 */
Ext.define('vms.store.forms.prodotto.Gridinterventi', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridinterventi',
    requires:[
        'vms.model.forms.prodotto.GridInterventi'
    ],
    model:'vms.model.forms.prodotto.GridInterventi'
});