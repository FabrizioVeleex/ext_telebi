/**
 * Created by fabrizio on 29/07/21.
 */
Ext.define('portal.v1.widget.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Fit'
    ],

    collapsible: true,
    collapsed:true,
    bodyPadding: 15,
    height: 350,
    cls:'home-widget',
    layout: 'fit',
    style:{
        'webkit-border-radius':'15px',
        '-moz-border-radius':'15px',
        'border-radius':'15px !important'
    },
    tools: [
        {
            type: 'up',
            tooltip:'Sposta su',
            style:{
                color:'red'
            },
            callback:function(){
                this.up('#dashboard').fireEvent('moveWidget',[this.up('panel'),'up'])
            }
        },
        {
            type: 'down',
            tooltip:'Sposta giù',
            style:{
                color:'red'
            },
            callback:function(){
                this.up('#dashboard').fireEvent('moveWidget',[this.up('panel'),'down'])
            }
        }],
});
