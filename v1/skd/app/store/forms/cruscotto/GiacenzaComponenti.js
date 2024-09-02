/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.store.forms.cruscotto.GiacenzaComponenti', {
    extend: 'Ext.data.Store',
    alias:'store.cruscotto-giacenza-componenti',
    requires:[
        'skd.model.forms.cruscotto.GiacenzaComponenti'
    ],
    model:'skd.model.forms.cruscotto.GiacenzaComponenti'
});