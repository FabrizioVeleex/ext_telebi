/**
 * Created by fabrizio on 11/11/15.
 */
Ext.define('home.view.main.Index', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-index',
    reference: 'main-index',
    requires: [
        'Ext.layout.container.Border',
        'Ext.panel.Panel'
    ],
    layout:'border',
    bodyStyle:{
        'background-color':'transparent'
    },
    items:[
    ],
    listeners:{
        afterrender: 'afterrenderDesktop'
    }
});
