Ext.define('nsm.view.forms.job.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  alias: 'controller.v1-job',
  mixins: [
    'portal.v1.global.Util',
    'portal.v1.view.grids.DefaultController'
  ],
  requires: [
    'Ext.layout.container.VBox',
    'Ext.util.Format',
    'nsm.model.forms.job.Model',
    'nsm.view.forms.job.cards.Job',
    'nsm.view.forms.job.cards.gridDett',
    'nsm.view.forms.job.cards.gridLog'
  ],
  init: function () {
    this.activeGridLog = false
    let vm = this.getViewModel();
    vm.set('isnew', this.getView().valori.isnew);
    vm.set('id', this.getView().valori.id);
    vm.set('record', Ext.create('nsm.model.forms.job.Model', {
      id: this.getView().valori.id,
      isnew: this.getView().valori.isnew
    }))
    this.callParent(arguments)
  },

  managerView: function () {
    this.callParent(arguments)
    let me = this,
      vm = me.getViewModel()

    try {
      let record = vm.get('record'),
        readOnly = true,
        comboTipo = vm.getStore('comboTipo')

      if (this.checkRuoli(['99', '2'])) {
        readOnly = false;
        vm.set('btn.cronology', true);
        vm.set('btn.save', true);
        vm.set('btn.delete', true);
      }
      //gestione tasti default
      vm.set('btn.close', true);
      vm.set('readOnly', readOnly);
      //titolo tab
      vm.set('title', record.data['nome'] || 'n.d.')
      vm.set('label', Locale.t('nsm.forms.job.title'))
      vm.set('toolbar.hideCard', false)

      if (!this.listForms) {
        this.listForms = [
          {
            posizione: 'job',
            backgroundColor: 'LightBlue',
            card: Ext.create('nsm.view.forms.job.cards.Job'),
            text: Locale.t('nsm.forms.job.cards.job.title')
          },
          {
            posizione: 'log',
            text: Locale.t('nsm.forms.job.cards.gridlog.title'),
            backgroundColor: '',
            card: Ext.create('Ext.panel.Panel', {
              layout: {
                type: 'vbox',
                align: 'stretch'
              },
              items: [
                Ext.create('nsm.view.forms.job.cards.gridLog', {
                  itemId: 'gridLog',
                  flex: 1
                }),
                Ext.create('nsm.view.forms.job.cards.gridDett', {
                  itemId: 'gridDett',
                  flex: 1
                }),
              ],
              listeners: {
                activate: 'onActiveGridLog'
              }
            })
          }
        ]
      }
      //Aggiungo cards
      for (card of this.listForms) {
        this.toolBarCard.add({
          text: card.text,
          enableToggle: true,
          style: { backgroundColor: card.backgroundColor },
          posizione: card.posizione,
          hidden: false,
          handler: 'onClickCard'
        })
        this.form.add(card.card);
      }
      this.getView().setActiveItem(this.form);
      this.onClickCard({ posizione: vm.get('cardactive') })
    } catch (err) {

    }
  },
  onSave: function () {
    if (!this.obb()) {
      return false;
    }
    this.callParent(arguments)
  },
  obb: function () {
    let form = this.listForms[0].card;
    let modulo = form.getForm()
    if (!modulo.isValid()) {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('global.form.validation.modulo'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
      return false;
    }
    return true;
  },

  onLoadStore: function (store, records, success) {
    let card = this.listForms[1].card
    let grid = card.down('#' + store.rifId)
    if (success) {
      //TODO sistemate totalcont if errato
      let totalCount = grid.down('#totalCount')
      if (totalCount) {
        if (store.totalCount) {
          totalCount.setValue(Locale.t('global.grid.total') + ' ' + Ext.util.Format.number(store.totalCount, '0,000'))
        } else {
          totalCount.setValue(Locale.t('global.grid.total') + ' 0')
        }
      }
    }

  },
  reloadGrid: function (btn) {
    let vm = this.getViewModel(),
      record = vm.get('record'),
      store = btn.up('grid').getStore()

    store.getProxy().extraParams.id = record.data['id']
    store.load();
  },
  onItemClickLog: function (view, record, item, index) {
    let me = this,
      store = me.getStore('gridDett'),
      vm = me.getViewModel()

    vm.set('titoloDett', Locale.t('nsm.forms.job.cards.griddett.process') + ': <b>' + record.data['idDay'] + ' ' + record.data['idTime'] + '</b>')

    store.getProxy().extraParams.idDay = record.data['idDay']
    store.getProxy().extraParams.idTime = record.data['idTime']
    store.getProxy().extraParams.idJob = record.data['idJob']
    store.load()
  },
  onActiveGridLog: function (panel) {
    if (!this.activeGridLog) {
      this.activeGridLog = true
      let grid = panel.down('grid')
      if (grid) {
        let vm = this.getViewModel(),
          record = vm.get('record')

        grid.getStore().getProxy().extraParams.id = record.data['id']
        grid.getStore().load();
      }
    }

  }
});