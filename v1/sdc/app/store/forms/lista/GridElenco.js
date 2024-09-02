/**
 * Created by luke on 23/06/2020.
 */
Ext.define('sdc.store.forms.lista.GridElenco', {
    extend: 'Ext.data.Store',
    alias:'store.v1-storeelenco',
    requires:[
        'sdc.model.forms.lista.GridElenco'
    ],
    model:'sdc.model.forms.lista.GridElenco'
});