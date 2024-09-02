/**
 * Created by fabrizio on 23/12/16.
 */
Ext.define('portal.view.main.West', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.layout.container.Accordion'
    ],
    title:'Navigatore',
    resizable: true,
    border:true,
    floatable: false,
    collapsible: true,
    width: 250,
    minWidth: 100,
    maxWidth: 450,
    layout: {type: 'accordion',animate: true}
});