/**
 * Created by fabrizio on 09/10/17.
 */
Ext.define('portal.store.email.Email', {
    extend: 'Ext.data.Store',
    alias:'store.bd-email',
    requires:[
        'portal.model.email.Email'
    ],
    model:'portal.model.email.Email',
    data: []
});