/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.kit.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.kit',
  requires: [
    'Ext.grid.column.Action',
    'itm.grids.kit.Model',
    'itm.forms.kit.Panel',
    'portal.util.Functions'
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
    ]
    if (this.checkRuoli(['99', '10'])) {
      this.listBtnTop.push({
        tooltip: Locale.t('itm.grids.kit.btn.new.tooltip'),
        text: Locale.t('itm.grids.kit.btn.new.text'),
        ui: 'green',
        iconCls: 'x-fas fa-plus',
        handler: 'onNew'
      });
    }
    this.callParent(arguments)
  },
  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('itm.grids.kit.Model', {
      id: bdFunctions.bpRandomString(32),
      isnew: 1
    });
    this.createForm(view, NewRecord, 1);
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('itm.forms.kit.Panel', {
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
      { text: Locale.t('itm.grids.kit.column.cd_kit'), dataIndex: 'cd_kit', width: 150, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.kit.column.cd_comp1'), dataIndex: 'cd_comp1', width: 150, filter: { type: 'string' } },
      { text: Locale.t('itm.grids.kit.column.cd_comp2'), dataIndex: 'cd_comp2', minWidth: 150, flex: 1, filter: { type: 'string' } },
    ]
    this.callParent(arguments)
  }
})