/**
 * Created by fabrizio on 26/06/16.
 */
Ext.define('portal.store.blog.Comment', {
    extend: 'Ext.data.Store',
    alias: 'store.comment',
    requires:[
        'portal.model.blog.Comment'
    ],
    model: 'portal.model.blog.Comment'

});