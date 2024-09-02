
Ext.define('portal.v1.view.main.start.Panel', {
  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.Card',
  ],
  layout: {
    type: 'card'
  },
  bodyStyle: {
    'background': 'transparent'
  },
  items: [

  ],
  listeners: {
    afterrender: 'onAfterRender',
    checkDati: 'onCheckDati'
  }
});
