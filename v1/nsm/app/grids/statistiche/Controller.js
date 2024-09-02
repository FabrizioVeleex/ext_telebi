Ext.define('nsm.grids.statistiche.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.statistiche',
  requires: [
    'Ext.menu.Menu',
    'nsm.grids.statistiche.Model',
    'nsm.forms.statistica.Panel'
  ],
  init: function () {
    let me = this,
      vm = this.getViewModel()

    //gestione menu
    this.listBtnTop = [
      { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
    ]

    // if (this.checkRuoli(['99', '2'])) {
    //   this.listBtnTop.push({
    //     tooltip: Locale.t('nsm.grids.jobs.btn.new.tooltip'),
    //     text: Locale.t('nsm.grids.jobs.btn.new.text'),
    //     ui: 'green',
    //     iconCls: 'x-fas fa-plus',
    //     handler: 'onNew'
    //   });
    // }

    this.callParent(arguments)
  },

  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('nsm.grids.statistiche.Model', {
      id: this.randomString(32),
      isnew: 1,
      status: 1
    });
    this.createForm(view, NewRecord, 1);
  },

  createForm: function (view, record, isnew, tipo) {
    let itemId = 'f' + record.data['id'];

    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }

    this.getView().fireEvent('createTab', Ext.create('nsm.forms.statistiche.Panel', {
      itemId: 'f' + record.data['id'],
      record: record,
      storeForm: view.getStore(),
      valori: {
        id: record.data['id'],
        isnew: isnew,
        tipo: tipo
      }
    }), view)
  },

});