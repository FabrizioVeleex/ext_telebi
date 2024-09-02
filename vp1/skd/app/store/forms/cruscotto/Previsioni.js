/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.store.forms.cruscotto.Previsioni', {
    extend: 'Ext.data.Store',
    alias:'store.cruscotto-previsioni',
    requires:[
        'skd.model.forms.cruscotto.Previsioni'
    ],
    model:'skd.model.forms.cruscotto.Previsioni'
});