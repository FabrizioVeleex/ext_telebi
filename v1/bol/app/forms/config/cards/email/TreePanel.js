/**
 * Created by fabri on 08/03/2022.
 */

Ext.define('bol.view.forms.config.cards.email.TreePanel', {
  extend: 'Ext.tree.Panel',
  xtype: 'v1-bol-tree-grid',
  reserveScrollbar: true,
  useArrows: true,
  rootVisible: false,
  columns: [
    {
      xtype: 'treecolumn', // this is so we know which column will show the tree
      text: 'titolo',
      dataIndex: 'text',
      flex: 2,
      sortable: true
    }, {
      text: 'it',
      dataIndex: 'it',
      flex: 1,
    }, {
      text: 'en',
      dataIndex: 'en',
      flex: 1,
    },
  ],
});