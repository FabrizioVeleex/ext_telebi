/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.tipologie.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-bolfor-tipologie',
  requires: [
    'Ext.grid.column.Action',
    'bolfor.forms.tipologia.Panel',
    'bolfor.grids.tipologie.ModelData',
    'portal.util.Functions'
  ],
  init: function () {
    this.callParent(arguments)
    this.toolbar.add({ handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' })
    //modifica x idAdmin del portale
    if (Ext.global.Vars.infoUser.idAdmin && Ext.global.Vars.infoUser.idAdmin===Ext.global.Vars.infoUser.id) {
      this.toolbar.add({
        tooltip: Locale.t('bolfor.grids.tipologie.btn.new.tooltip'),
        text: Locale.t('bolfor.grids.tipologie.btn.new.text'),
        ui: 'green',
        iconCls: 'x-fas fa-plus',
        handler: 'onNew'
      });
    }
  },

  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('bolfor.grids.tipologie.ModelData', {
      id: bdFunctions.bpRandomString(32),
      isnew: 1
    });
    this.createForm(view, NewRecord, 1, '');
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('bolfor.forms.tipologia.Panel', {
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
      {text: Locale.t('bolfor.grids.tipologie.column.codice'), dataIndex: 'codice', width: 250, filter: { type: 'string' } },
      {text: Locale.t('bolfor.grids.tipologie.column.descrizione'), dataIndex: 'descrizione', minWidth: 330, flex: 1, filter: { type: 'string' } }
    ]
    this.callParent(arguments)
  }
})