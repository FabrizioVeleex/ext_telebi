Ext.define('portal.v1.view.main.WestClose', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.container.Container'
  ],
  resizable: false,
  border: true,
  floatable: false,
  width: 42,
  items: [
    { xtype: 'component', html: '<img class="logo-nav-close" src="/logos/logo_32.png" alt="&nbsp;">' },
    {
      xtype: 'component',
      bind: {
        html: '<img class="logo-nav-close" src="/images/32/{tag}.png" alt="&nbsp;">'
      }
    },
    {
      xtype: 'toolbar', padding: 3,
      items: [
        {
          iconCls: 'fas fa-caret-square-right bd-color-green',
          action: false,
          handler: 'onToggleNav'
        }
      ]
    },
    {
      xtype: 'toolbar', padding: 3,
      items: [
        {
          iconCls: 'fas fa-window-close bd-color-red',
          handler: 'onCloseApp'
        }
      ]
    },
    { xtype: 'container', bind: { html: '<div class="text-nav-rotate">{apptitle}</div>' } }
  ]
});