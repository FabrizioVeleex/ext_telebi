/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.bolle.BolleController', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-bolfor-bolle',
  requires: [
    'Ext.grid.column.Action',
    'Ext.grid.column.Date',
    'bolfor.forms.bolla.Panel'
  ],
  init: function () {
    this.callParent(arguments)
  },
  //funzione x gestire tasti
  checkColumn: function(griglia) {
    let nodo=this.getView().infoNode;
    if (!nodo) {
      return;
    }
    this.toolbar.removeAll(true)
    this.toolbar.add({handler: 'reloadGrid', iconCls: ' pictos pictos-refresh'})
    //ciclo le colonne x nascondere/visualizzare stato
    let colonne = griglia.getColumns()
    for (let i = 0, l = colonne.length; i < l; i++) {
      if (colonne[i].dataIndex === 'creationdate') {
        if (nodo.itemId!=='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
      if (colonne[i].dataIndex === 'nomefile') {
        if (nodo.itemId!=='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
      if (colonne[i].dataIndex === 'num_doc') {
        if (nodo.itemId==='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
      if (colonne[i].dataIndex === 'data_doc') {
        if (nodo.itemId==='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
      if (colonne[i].dataIndex === 'num_ord') {
        if (nodo.itemId==='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
      if (colonne[i].dataIndex === 'data_ord') {
        if (nodo.itemId==='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
      if (colonne[i].dataIndex === 'num_doc') {
        if (nodo.itemId==='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
      if (colonne[i].dataIndex === 'ragsoc') {
        if (nodo.itemId==='nuove') {
          colonne[i].hide();
        } else {
          colonne[i].show();
        }
      }
    }
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('bolfor.forms.bolla.Panel', {
      itemId: 'f' + record.data['id'],
      record: record,
      valori: {
        id: record.data['id'],
        isnew: isnew
      }
    }), view)
  },
  onafterrendergrid: function (grid) {
    grid.myColumns = [
      {
        xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
        items: [{ handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
      },
      {text: Locale.t('bolfor.grids.column.creationdate'),dataIndex: 'creationdate', width: 180, xtype: 'datecolumn', format: 'd/m/Y H:i:s', filter: {type: 'date',dateFormat: 'Ymd'}},
      {text: Locale.t('bolfor.grids.column.nomefile'), dataIndex: 'nomefile', flex:1,filter: {type: 'string'}},
      {text: Locale.t('bolfor.grids.column.data_doc'),dataIndex: 'data_doc', width: 180, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
      {text: Locale.t('bolfor.grids.column.num_doc'), dataIndex: 'num_doc', width:300,filter: {type: 'string'}},
      {text: Locale.t('bolfor.grids.column.data_ord'),dataIndex: 'data_ord', width: 180, xtype: 'datecolumn', format: 'd/m/Y', filter: {type: 'date',dateFormat: 'Ymd'}},
      {text: Locale.t('bolfor.grids.column.num_ord'), dataIndex: 'num_ord', width:300,filter: {type: 'string'}},
      {text: Locale.t('bolfor.grids.column.ragsoc'), dataIndex: 'ragsoc', flex:1,filter: {type: 'string'}}
    ]
    this.callParent(arguments)
  }
})