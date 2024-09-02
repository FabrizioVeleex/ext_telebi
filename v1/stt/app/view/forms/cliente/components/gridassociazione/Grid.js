/**
* Created by fabri on 10/01/2023.
 */
Ext.define('stt.view.forms.cliente.components.gridassociazione.Grid', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.grid.ActionColumn',
    'Ext.grid.plugin.CellEditing',
    'stt.view.forms.cliente.components.comboSoggetto.ComboGrid'
  ],
  minHeight: 120,
  bind: {
    store: '{storeAssociazione}'
  },
  selType: 'cellmodel',
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1
  },
  viewConfig: {
    getRowClass: function (record) {
      return (record.get('action') === 2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
    }
  },
  columns: [
    {
      xtype: 'actioncolumn', menuDisabled: true, resizable: false, sortable: false, width: 30,
      items: [{
        getClass: function (view, meta, record) {
          if (record.get('action') === 2) {
            return 'x-fas fa-trash bd-color-blue';
          } else {
            if (record.get('isnew') === 0 || (record.get('isnew') === 1 && record.get('cdcli') !== '')) {
              return 'x-fas fa-trash bd-color-red';
            }
          }
          return 'x-fas fa-circle bd-color-green';
        },
        handler: function (view, rowIndex, colIndex, item, event, record) {
          let grid = view.up("grid"),
            lastrecord = grid.getStore().last();

          if (
            record.get("isnew") === 1 &&
            record.get("action") === 1 &&
            lastrecord !== record
          ) {
            view.getStore().remove(record);
          }

          if (record.data.delrow) {
            if (record.data.isnew === 0) {
              if (record.data.action === 2) {
                record.set("action", 0);
              } else {
                record.set("action", 2);
              }
            }
          }
        },
        handler: function (view, rowIndex, colIndex, item, event, record) {
          let vm = this.lookupViewModel();

          let grid = view.up("grid"),
            lastrecord = grid.getStore().last();

          if (
            record.get("isnew") === 1 &&
            record.get("action") === 1 &&
            lastrecord !== record
          ) {
            view.getStore().remove(record);
          }

          // if (record.data.delrow) {
          if (record.data.isnew === 0) {
            if (record.data.action === 2) {
              record.set("action", 0);
            } else {
              record.set("action", 2);
            }
          }
          // }
        },
      }]
    },
    {
      text: Locale.t('stt.forms.cliente.associazione.columns.cdcli'),
      flex: 1,
      menuDisabled: true,
      resizable: false,
      sortable: false,
      dataIndex: 'cdcli',
      getEditor: function (record) {
        if (record.data.isnew === 0) {
          return false;
        }
        return Ext.create('stt.view.forms.cliente.components.comboSoggetto.ComboGrid', {
          flex: 1,
        });
      }
    }
  ]
});