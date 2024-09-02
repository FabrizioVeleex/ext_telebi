/**
 * Created by fabrizio on 12/03/2023.
 */
Ext.define('itm.forms.articolo.cards.GridDocs', {
  extend: 'Ext.grid.Panel',
  requires: [
    'portal.util.Functions',
    "itm.forms.articolo.component.comboTipologia.storeTipologia",
    'itm.forms.articolo.component.gridDocs.ViewModelGridDocs',
  ],
  viewModel: 'v1-itm-form-articolo-griddocs',
  bind: {
    store: '{storeDocs}',
  },
  scrollable: 'y',
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    getRowClass: function (record) {
      let cls = ''
      if (record.get('hidden') === true) {
        cls = 'y-hide-row';
      }
      return (record.get('action') === 2) ? cls + " y-delete-row" : cls;
    }
  },
  columns: [
    {
      xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
      tdCls: "y-vertical-align-column",
      items: [{
        getClass: function (view, metadata, record) {
          let vm = this.lookupViewModel()
          if (vm.get('readOnly')) {
            return false
          }
          if (record.get('action') === 2) {
            metadata.tdAttr = `data-qtip="${Locale.t('global.btn.annulla')}"`;
            return 'x-fas fa-plus-circle';
          } else {
            if (record.get('isnew') === 0 || (record.get('isnew') === 1 && record.get('dimensione') !== 0)) {
              metadata.tdAttr = `data-qtip="${Locale.t('global.btn.delete.text')}"`;
              return 'x-fas fa-trash';
            }
          }
          metadata.tdAttr = `data-qtip="${Locale.t('global.btn.inserisci.text')}"`;
          return 'x-fas fa-arrow-right';
        },
        handler: 'onDeleteImage',
      }]
    },
    {
      text: Locale.t('itm.forms.articolo.cards.docs.columns.type'),
      width: 148,
      resizable: false,
      xtype: 'widgetcolumn',
      dataIndex: 'type',
      widget: {
        xtype: 'panel',
        header: false,
        bodyStyle: { 'background-color': "transparent" },
        items: [],
        listeners: {
          afterrender: 'onAfterRenderSelectType'
        }
      }
    },
    {
      text: Locale.t('itm.forms.articolo.cards.docs.columns.predefinito'),
      xtype: 'widgetcolumn',
      widget: {
        height: 140,
        xtype: 'button',
        userCls: 'y-predefinito',
        iconCls: '',
        handler: 'onOperationClickDocs',
        bind: {
          userCls: 'y-predefinito pred_{record.id}'
        },
        listeners: {
          updateIcon: function () {
            this.setTooltip('Setta come predefinito')
            this.setIconCls('')
          },
          beforerender: 'onAfterRenderPredefinito'
        }
      }
    },
    {
      text: Locale.t('itm.forms.articolo.cards.docs.columns.immagine'),
      width: 148,
      resizable: false,
      xtype: 'widgetcolumn',
      dataIndex: 'id',
      widget: {
        xtype: 'panel',
        header: false,
        bind: {
          hidden: '{record.columnLink && record.isnew}',
        },
        items: [],
        listeners: {
          afterrender: 'onAfterRenderWidget'
        }
      }
    },
    {
      text: Locale.t('itm.forms.articolo.cards.docs.columns.dettaglio'),
      xtype: 'widgetcolumn',
      widget: {
        xtype: 'component',
        bind: {
          hidden: '{record.columnLink}',
          html: 'Oggetto: {record.oggetto} <br>Dimensione: {record.dimensione}<br>Data:{record.dspdata}'
        }
      },
      width: 300
    },
    {
      text: Locale.t('itm.forms.articolo.cards.docs.columns.linkVideo'),
      MinWidth: 300,
      flex: 1,
      xtype: 'widgetcolumn',
      dataIndex: 'link',
      widget: {
        xtype: 'textfield',
        bind: {
          value: '{record.link}',
          hidden: '{!record.columnLink}',
          readOnly: '{readOnly}'
        },
      }
    },
  ],
  listeners: {
    itemdblclick: 'onOpenDoc'
  }
});
