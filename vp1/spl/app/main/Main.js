
Ext.define('spl.main.Main', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-main',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.layout.container.Card',
    'Ext.Container',
    'spl.main.MainController',
    'spl.main.MainModel'
  ],
  controller: 'main',
  viewModel: 'main',
  layout: {
    type: 'card'
  },
  items: [
    {
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [
        { xtype: 'container', html: '<h2>Loading..</h2>' }
      ]
    },
    {
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [
        { xtype: 'container', html: '<h2>Dati assenti</h2>' }
      ]
    }
  ],
  listeners: {
    afterrender: 'onAfterRender',
    checkDati: 'onCheckDati'
  }
});
