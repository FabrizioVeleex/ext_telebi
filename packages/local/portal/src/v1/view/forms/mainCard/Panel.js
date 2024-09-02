Ext.define('portal.v1.view.forms.mainCard.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.layout.container.Card',
    'Ext.container.Container'
  ],
  bind: {
    title: '{panelTitle}'
  },
  layout: {
    type: 'card'
  },
  closable: true,
  dockedItems: [
    {
      xtype: 'container',
      cls: 'header-panel',
      bind: {
        html: '{formTitle}'
      }
    }
  ],
  listeners: {
    close: 'onClose',
    loadData: 'loadData'
  },
})
