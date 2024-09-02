/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.store.forms.cruscotto.Revisioni', {
    extend: 'Ext.data.Store',
    alias:'store.cruscotto-revisioni',
    requires:[
        'skd.model.forms.cruscotto.Revisioni'
    ],
    model:'skd.model.forms.cruscotto.Revisioni'
});