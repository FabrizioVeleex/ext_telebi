/**
 * Created by fabri on 08/03/2022.
 */

Ext.define('pak.view.forms.config.cards.email.TreeStore', {
    extend: 'Ext.data.TreeStore',
    xtype: 'v1-pak-tree-store',
    fields: [{
        name: 'text',
        type: 'string'
    }, {
        name: 'it',
        type: 'string'
    }, {
        name: 'en',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        url: Backend.REST_API + "forms/documento/language/email",
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true,
});