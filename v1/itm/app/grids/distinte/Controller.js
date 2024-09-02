/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.distinte.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.distinte',
  requires: [
    'Ext.grid.column.Action',
    'itm.grids.distinte.Model',
    'itm.forms.distinta.Panel',
    'portal.util.Functions'
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
    ]
    if (this.checkRuoli(['99', '9'])) {
      this.listBtnTop.push({
        tooltip: Locale.t('itm.grids.distinte.btn.new.tooltip'),
        text: Locale.t('itm.grids.distinte.btn.new.text'),
        ui: 'green',
        iconCls: 'x-fas fa-plus',
        handler: 'onNew'
      });
    }

    if (this.checkRuoli(['99'])) {
      this.listBtnTop.push('->')
      this.listBtnTop.push({
        text: 'Dev',
        handler: function () { Ext.Ajax.request({ method: "get", url: Backend.REST_API + "dev" }) }
      })
    }
    this.callParent(arguments)
  },
  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('itm.grids.distinte.Model', {
      id: bdFunctions.bpRandomString(32),
      isnew: 1
    });
    this.createForm(view, NewRecord, 1);
  },

  onDropRow: function (node, data, overModel, dropPosition) {
    // Setto record per evidenziare lo spostamento
    data.records[0].set('changed', true)
    // cambio il valore per abilitare il tasto di salvataggio ordinamento
    this.getViewModel().set('saveChanged', true)

  },
  onNewSorting: function () {

    // presento selezione raggruppamento categorie

  },
  onSaveSorting: function () {
    let store = this.getViewModel().getStore('store');

    let newSort = store.data.items.map(el => el.data.id)

    // avvio salvataggio ordinamento
    Ext.Ajax.request({
      url: Backend.REST_API + "grids/saveSort/",
      method: "POST",
      jsonData: {
        record: {
          newSort: newSort,
          id_livel: 'DA_GESTIRE'
        },
      },
      success: function (response) {
        console.log('ok')
      },
      failure: function (response) {
        console.log('errore')
      },
    });
  },
  reloadGrid: function () {
    this.getViewModel().set('saveChanged', false)
    this.callParent(arguments)
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('itm.forms.distinta.Panel', {
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
      { text: Locale.t('itm.grids.distinte.column.cd_art'), dataIndex: 'cd_art', width: 150, filter: { type: 'numeric' } },
      { text: Locale.t('itm.grids.distinte.column.descrizione'), dataIndex: 'descrizione', flex: 1, filter: { type: 'string' } }
    ]
    this.callParent(arguments)
  }
})