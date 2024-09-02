/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.grids.categorie.CategorieController', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-prd-categorie',
  requires: [
    'Ext.grid.column.Action',
    'prd.forms.categoria.Panel',
    'prd.grids.categorie.CategorieModel',
    'portal.util.Functions'
  ],
  init: function () {
    this.callParent(arguments)
    let me = this,
      vm = me.getViewModel()

    this.toolbar.add({ handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' })

    if (this.checkRuoli(['99', '2'])) {
      this.toolbar.add({
        tooltip: Locale.t('prd.grids.categorie.btn.new.tooltip'),
        text: Locale.t('prd.grids.categorie.btn.new.text'),
        ui: 'green',
        iconCls: 'x-fas fa-plus',
        handler: 'onNew'
      });
    }
  },

  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('prd.grids.categorie.CategorieModel', {
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
    this.getView().fireEvent('createTab', Ext.create('prd.forms.categoria.Panel', {
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
      { text: Locale.t('prd.grids.categorie.column.cd_cat'), dataIndex: 'cd_cat', width: 130, filter: { type: 'string' } },
      { text: Locale.t('prd.grids.categorie.column.descr_cat'), dataIndex: 'descr_cat', minWidth: 330, flex: 1, filter: { type: 'string' } },
    ]
    this.callParent(arguments)
  }
})