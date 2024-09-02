/**
 * Created by fabrizio on 26/06/16.
 */
Ext.define('portal.view.blog.Comment', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.comment',
    requires:[
        'portal.view.blog.CommentController'
    ],
    bodyPadding: 0,
    ui:'ocra',
    controller:'comment',
    bodyStyle:{
        'background-color':'transparent'
    },
    items: [
    ],
    listeners:{
        loadData:'onLoadData'
    }
});