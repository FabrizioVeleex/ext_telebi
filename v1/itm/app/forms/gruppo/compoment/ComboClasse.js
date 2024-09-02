/**
 * Created by luke on 27/11/2019.
 */
Ext.define('itm.forms.gruppo.component.ComboClasse', {
    extend: 'Ext.data.Store',
    alias: 'store.v1-comboclasse',
    fields: [
        'cd_clm', 'descr_clm'
    ],
    data: []
});