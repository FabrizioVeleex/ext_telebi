Ext.define('sdcpub.view.main.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-main',
  requires: [
    'Ext.Container',
    'Ext.layout.container.Card',
    'Ext.layout.container.HBox',
    'sdcpub.view.main.Controller',
    'sdcpub.view.main.Model'
  ],
  controller: 'main',
  viewModel: 'main',
  layout :{
    type:'card'
  },
  items:[
    {layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [
        {xtype: 'container',html:'<h2>Caricamento applicativo in corso....</h2>'}
      ]
    },
    {layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [
        {xtype: 'container',html:'<h2>dati assenti</h2>'}
      ]
    }
  ],
  listeners: {
    afterrender: 'onAfterRender'
  }
});
