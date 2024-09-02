/**
 * Created by luke on 27/11/2019.
 */
Ext.define('itm.forms.sottogruppo.component.ComboFamiglia', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-s-combofamiglia',
    fields: [
        'cd_fam', 'descr_fam'
    ],
    data: []
});