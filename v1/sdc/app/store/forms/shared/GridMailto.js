/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('sdc.store.forms.shared.GridMailto', {
    extend: 'Ext.data.Store',
    alias:'store.v1-gridmailto',
    requires:[
        'sdc.model.forms.shared.GridMailto'
    ],
    model:'sdc.model.forms.shared.GridMailto'
});