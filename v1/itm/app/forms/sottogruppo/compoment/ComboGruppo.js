/**
 * Created by luke on 27/11/2019.
 */
Ext.define('itm.forms.sottogruppo.component.ComboGruppo', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-s-combogruppo',
    fields: [
        'cd_gruppo', 'descr_gruppo'
    ],
    data: []
});