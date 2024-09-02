/**
 * Created by luke on 27/11/2019.
 */
Ext.define('itm.forms.famiglia.component.classe.StoreClasse', {
    extend: 'Ext.data.Store',
    alias: 'store.itm-form-fam-comboclasse',
    fields: [
        'cd_clm', 'descr_clm'
    ],
    data: []
});