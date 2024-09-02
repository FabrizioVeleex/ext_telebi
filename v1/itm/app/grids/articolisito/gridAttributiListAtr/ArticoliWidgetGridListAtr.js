Ext.define('itm.grids.articolisito.gridAttributi.ArticoliWidgetGridListAtr', {
  extend: 'Ext.grid.Panel',
  itemId: "gridattributolistatr",
  requires: [
    'itm.grids.articolisito.gridAttributi.ArticoliStoreAttributiListAtr',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'Ext.grid.plugin.CellEditing',
    'Ext.grid.plugin.DragDrop'
  ],
  heigth: 250,
  selType: 'cellmodel',
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1,
  },
  title: "Lista Attributi per la gestione delle varianti da gestire sul sito B2C",
  scrollable: 'y',
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    getRowClass: function (record) {
      return (record.get('action') === 2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
    }
  },
  dockedItems: [],
  columns: [
    {
      xtype: 'actioncolumn', menuDisabled: true, resizable: false, sortable: false, width: 30,
      items: [{
        getClass: function (view, meta, record) {
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
      menuDisabled: true, resizable: false, sortable: false, dataIndex: 'sorting', width: 40,
    },
    {
      text: Locale.t('itm.grids.articoli.gridattributi.column.attributo'), dataIndex: 'attributo', minWidth: 100, flex: 2,
      getEditor: function (record) {
        if (record.data.action !== 1) return
        let container = this.up('#widgetContainer');

        let store = Ext.create('itm.forms.articolo.component.comboAttributi.ComboAttributo', {
          widgetContainer: container
        });
        store.on('load', function (records) {
          for (const record of records.data.items) {
            let textDup = '';

            let indexDup = records.widgetContainer.item.data.storeAttributi.findIndex((el) => el.id_atr === record.data["id"])
            if (indexDup !== -1) {
              record.set('recordDup', true)
              textDup = '<u>' + Locale.t('itm.grids.articoli.gridattributi.presente') + '</u>'
            }

            let index = records.widgetContainer.item.data.attributiSorting.findIndex((el) => el.id_atr === record.data["id"])
            if (index !== -1) {
              record.set('dspSorting', '[' + records.widgetContainer.item.data.attributiSorting[index].sorting + '] ' + textDup)
              record.set('sorting', records.widgetContainer.item.data.attributiSorting[index].sorting)
            }
          }
        })
        return {
          xtype: 'combo', width: 300, displayField: 'attributo', minChars: 3,
          store: store, selectOnFocus: true, matchFieldWidth: false, forceSelection: true,
          emptyText: Locale.t('itm.grids.articoli.gridattributi.combotext'),
          tpl: Ext.create('Ext.XTemplate',
            '<ul class="x-list-plain"><tpl for=".">',
            '<li role="option" class="x-boundlist-item" style="border-bottom: 1px solid black">{attributo} {dspSorting}</li>',
            '</tpl></ul>'
          ),
          listeners: {
            beforeselect: 'onBeforeAttributo',
            select: 'onSelectAttributo',
            beforequery: function (qe) {
              delete qe.combo.lastQuery;
            }
          }
        }
      }
    }
  ],
  listeners: {
    afterRender: 'onAfterRenderGridAttributiListAtr',
  }
})