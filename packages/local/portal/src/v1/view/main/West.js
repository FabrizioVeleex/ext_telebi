Ext.define('portal.v1.view.main.West', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.layout.container.Fit',
    'Ext.panel.Panel',
    'portal.util.Locale'
  ],
  layout: 'fit',
  collapsible: false,
  resizable: true,
  border: true,
  floatable: false,
  width: 200,
  minSize: 100,
  maxSize: 300,
  dockedItems: [
    {
      xtype: 'panel',

      bind: {
        html: '{appTitle}'
      }
    },
    {
      xtype: 'toolbar',
      items: [
        {
          iconCls: 'fas fa-caret-square-left bd-color-green',
          tooltip: Locale.t('global.menu.hide'),
          action: true,
          handler: 'onToggleNav'
        },
        {
          iconCls: 'fas fa-window-close bd-color-red',
          text: Locale.t('global.btn.closeapp.text'),
          handler: 'onCloseApp'
        },
        {
          iconCls: 'fas fa-bug bd-color-orange',
          hidden: true,
          bind: {
            hidden: '{!showD1}'
          },
          handler: 'onOpenLogDev'
        },
        {
          iconCls: 'fas fa-chart-area bd-color-blue',
          hidden: true,
          bind: {
            hidden: '{!showL1}'
          },
          handler: 'onOpenLogUser'
        }
      ]
    }
  ],
  items: [


  ]
});