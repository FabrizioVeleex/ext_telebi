/**
 * Created by luke on 20/10/21.
 */
Ext.define('portal.v1.view.main.global.upload.GridImages', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.grid.ActionColumn',
    'portal.util.Functions',
    'portal.util.Locale'
  ],
  height: 200,
  bind: {
    store: '{storeImmagini}'
  },
  scrollable: 'y',
  viewConfig:{
    emptyText: Locale.t('global.grid.empty'),
    getRowClass: function(record){
      return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
    }
  },
  columns: [
    {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
      items: [{
        getClass: function( view, meta, record){
          if (record.get('readOnlyAttach')===true) {
            return 'bd-action-null'
          }
          if (record.get('action')===2){
            return 'x-fas fa-trash bd-color-green'
          }
          return 'x-fas fa-trash bd-color-red'
        },
        handler: function (view, rowIndex, colIndex, item, event, record) {
          if (record.get('readOnlyAttach')===true) {
            return false
          }
          let grid = view.up('grid'),
              lastrecord = grid.getStore().last()
          if (record.get('action') === 2) {
            record.set('action', 0)
          }else{
            if (record.data.isnew===0){
              record.set('action', 2)
            } else {
              if(lastrecord!==record){
                view.getStore().remove(record)
              } else {
                view.getStore().remove(lastrecord)
              }
            }
          }
        }
      }]
    },
    {
      xtype: 'actioncolumn', width: 30,
      items: [
        {
          getClass: function () {
            return 'x-fas fa-download';
          },
          getTip: function (v, meta, record) {
            return Locale.t('global.images.columns.scarica') + ': <b>' + record.get('file') + '</b>';
          },
          handler: 'onGetAttachImage'
        }
      ]
    },
    {
      xtype: 'actioncolumn', width: 20, menuDisabled: true, fixed: true,
      items: [{
        getClass: function (v, meta, record) {
          let icona = record.get('estensione').toLowerCase().replace(".", "");
          return 'icon-' + icona;
        },
        getTip: function (v, meta, record) {
          return Locale.t('global.images.columns.apri') + ': <b>' + record.get('file') + '</b>';
        },
        handler: 'onOpenImage'
      }]
    },
    { text: Locale.t('global.images.columns.file'), dataIndex: 'nomefile', flex: 1 },
    {
      text: Locale.t('global.images.columns.dimensione'), dataIndex: 'dimensione', width: 200,
      renderer: function (value) {
        return bdFunctions.sizeformat(value)
      },
      sortable: false
    }
  ]
});