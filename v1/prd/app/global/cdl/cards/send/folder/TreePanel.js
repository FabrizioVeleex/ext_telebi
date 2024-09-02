/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.send.folder.TreePanel', {
  extend: 'Ext.tree.Panel',
  xtype: "panotec-folder-tree",
  requires: [
    'portal.util.Functions'
  ],
  minHeight: 130,
  scrollable: true,
  rootVisible: false,
  viewConfig: {
    emptyText: Locale.t('global.grid.empty')
  },
  columns: [{
    xtype: 'treecolumn',
    text: Locale.t('prd.forms.cdl.columns.path'),
    dataIndex: 'text',
    flex: 1,
    minWidth: 400
  }, {
    text: Locale.t('prd.forms.cdl.columns.file'),
    dataIndex: 'file',
    width: 250
  }],
  listeners: {
    selectionchange: "onSelectionchange"
  }
});