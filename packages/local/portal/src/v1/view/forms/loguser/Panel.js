/**
 * Created by fabrizio on 19/03/21.
 */
Ext.define('portal.v1.view.forms.loguser.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card',
        'portal.v1.view.forms.loguser.Controller',
        'portal.v1.view.forms.loguser.Model'
    ],
    controller:'v1-loguser',
    viewModel: 'v1-loguser',
    layout :{
        type:'card'
    },
    dockedItems: [
        {xtype:'toolbar', dock: 'top',
            items:[
                {
                    iconCls:'fas fa-caret-square-left bd-color-green',
                    handler:'onClose'
                },

            ]
        },

    ],
    items: [
        /* include child components here */
    ],
    listeners: {
        afterRender: 'onAfterRender'
    }
});