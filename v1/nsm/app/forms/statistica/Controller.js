Ext.define('nsm.forms.statistica.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  alias: 'controller.v1-statistica',
  mixins: [
    'portal.v1.global.Util',
    'portal.v1.view.grids.DefaultController'
  ],
  requires: [
    'Ext.layout.container.VBox',
    'Ext.util.Format',
    'nsm.forms.statistica.Model',
    'nsm.forms.statistica.cards.Statistica',
  ],
  init: function () {
    this.activeGridLog = false
    let vm = this.getViewModel();
    vm.set('isnew', this.getView().valori.isnew);
    vm.set('id', this.getView().valori.id);
    vm.set('record', Ext.create('nsm.forms.statistica.Model', {
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
        readOnly = true

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
            posizione: 'statistica',
            backgroundColor: 'LightBlue',
            card: Ext.create('nsm.forms.statistica.cards.Statistica'),
            text: Locale.t('nsm.forms.statistica.cards.statistica.title')
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
  }
});