/**
 * Created by fabrizio on 12/03/2023.
 */
Ext.define('itm.forms.articolo.cards.GridForniture', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'Ext.grid.plugin.CellEditing',
    'portal.util.Functions'
  ],
  minHeight: 100,
  bind: {
    store: '{storeForniture}',
  },
  selType: 'cellmodel',
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1,
  },
  scrollable: 'y',
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    getRowClass: function (record) {
      return (record.get('action') === 2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
    }
  },

  columns: [
    {
      xtype: 'actioncolumn', menuDisabled: true, resizable: false, sortable: false, width: 30,
      items: [{
        getClass: function (view, meta, record) {
          let vm = this.lookupViewModel()
          if (vm.get('readOnly')) {
            return false
          }
          if (record.get('action') === 2) {
            return 'x-fas fa-plus-circle';
          } else {
            if (record.get('isnew') === 0 || (record.get('isnew') === 1 && record.get('attributo') !== '')) {
              return 'x-fas fa-times-circle';
            }
          }
          return 'x-fas fa-plus';
        },
        handler: 'onHandlerAction'
      }]
    },
    {
      text: Locale.t('itm.forms.articolo.gridforniture.column.cd_for'), dataIndex: 'cd_for', width: 500,
      getEditor: function (record) {
        let vm = this.lookupViewModel()
        if (vm.get('readOnly') === true || record.data.isnew === 0) {
          return false
        }
        let store = Ext.create('itm.store.forms.articolo.ComboFornitore');
        return {
          xtype: 'combo', width: 300, displayField: 'attributo', minChars: 3,
          store: store, selectOnFocus: true, matchFieldWidth: false, forceSelection: true,
          emptyText: Locale.t('itm.forms.articolo.gridforniture.combotext'),
          tpl: Ext.create('Ext.XTemplate',
            '<ul class="x-list-plain"><tpl for=".">',
            '<li role="option" class="x-boundlist-item" style="border-bottom: 1px solid black">{cd_for} - {descr_for}</li>',
            '</tpl></ul>'
          ),
          listeners: {
            select: 'onSelectFornitore',
            beforequery: function (qe) {
              delete qe.combo.lastQuery;
            }
          }
        }
      }
    },
    {
      text: Locale.t('itm.forms.articolo.gridforniture.column.priorita'), dataIndex: 'priorita', width: 300,
      getEditor: function () {
        let vm = this.lookupViewModel()
        if (vm.get('readOnly') === true) {
          return false
        }
        return { xtype: 'numberfield' }
      }
    }
  ]
});