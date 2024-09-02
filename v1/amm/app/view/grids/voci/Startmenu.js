/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.grids.voci.Startmenu', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Card',
        'Ext.layout.container.HBox'
    ],
    layout :{
        type:'card'
    },
    header: false,
    title:'',
    closable:false,
    items: [
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5, padding:'20 20 20 20'},
            items: [
                {xtype:'box',html:Locale.t('amm.grids.voci.panelmsg')}
            ]
        }
    ]
});