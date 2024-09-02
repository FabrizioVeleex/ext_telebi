Ext.define('portal.v1.view.main.Center', {
  extend: 'Ext.tab.Panel',
  items: [],
  initComponent: function () {
    let me = this;
    me.hideTab = function () {
      if (me.activeTab) {
        me.items.each(function (tab) {

          if (tab.itemId === me.activeTab.itemId) {
            tab.tab.show();
          } else {
            if (tab.tab.closable === false) {
              tab.tab.hide();
            }
          }
        });
      }
    };
    me.callParent(arguments);
  }
});