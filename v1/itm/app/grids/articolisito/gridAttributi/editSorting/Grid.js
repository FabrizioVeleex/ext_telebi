Ext.define('itm.grids.articolisito.editSorting.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'itm-v1-grids-articoli-editSorting.grid',
  requires: [
    'itm.grids.articolisito.editSorting.Store',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'Ext.grid.plugin.CellEditing',
    'Ext.grid.plugin.DragDrop'
  ],
  selType: 'cellmodel',
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1,
  },
  flex: 1,
  scrollable: 'y',
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    getRowClass: function (record) {
      return (record.get('isNew')) ? "y-changed" : "";
    },
    plugins: {
      gridviewdragdrop: {
        dragText: 'Drag and drop to reorganize'
      }
    }
  },

  columns: [
    { menuDisabled: true, resizable: false, sortable: false, dataIndex: 'sorting', width: 40 },
    {
      text: Locale.t('itm.forms.articolo.gridattributi.column.attributo'), dataIndex: 'attributo', minWidth: 100, flex: 2,
      getEditor: function (record) {
        if (record.data.isNew !== 2) return
        return {
          xtype: 'textfield',
          enableKeyEvents: true,
        }
      }
    },
  ],
  listeners: {
    beforedrop: 'onBeforeDrop'
  }
})