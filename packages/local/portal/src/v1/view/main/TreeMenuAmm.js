/**
 * Created by fabrizio on 02/03/21.
 */
Ext.define('portal.v1.view.main.TreeMenuAmm', {
  extend: 'Ext.tree.Panel',
  requires: [
    'portal.v1.store.main.TreeMenuAmm'
  ],
  posizione: 'AMM',
  scrollable: true,
  rootVisible: false,
  hideHeaders: true,
  listeners: {
    render: 'onRenderTreeMain',
    itemclick: 'onitemclick'
  },
  initComponent: function () {
    let me = this;
    me.store = Ext.create('portal.v1.store.main.TreeMenuAmm', {
      listeners: {
        beforeload: function (store, operation) {
          if (operation.node && operation.node.get('itemId')) {
            operation.getProxy().extraParams.itemId = operation.node.get('itemId');
          }
        }
      }
    });
    this.callParent(arguments);
  }
});