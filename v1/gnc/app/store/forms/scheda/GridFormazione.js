/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('gnc.store.forms.scheda.GridFormazione', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridformazione',
    requires:[
        'gnc.model.forms.scheda.GridFormazione'
    ],
    model:'gnc.model.forms.scheda.GridFormazione'
});