/**
 * Created by luca on 16/07/2018.
 */
Ext.define('rec.view.forms.cliente.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-cliente',

    requires: [
        'portal.v1.store.forms.combo.GetCustomers'
    ],

    stores: {
        storeClienti:{type:'v1-getcustomers'}
    }
});