/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.store.forms.cruscotto.Giacenza', {
    extend: 'Ext.data.Store',
    alias:'store.cruscotto-giacenza',
    requires:[
        'skd.model.forms.cruscotto.Giacenza'
    ],
    model:'skd.model.forms.cruscotto.Giacenza'
});