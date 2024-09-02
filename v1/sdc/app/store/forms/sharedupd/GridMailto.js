/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('sdc.store.forms.sharedupd.GridMailto', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridmailtoupd',
    requires:[
        'sdc.model.forms.sharedupd.GridMailto'
    ],
    model:'sdc.model.forms.sharedupd.GridMailto'
});