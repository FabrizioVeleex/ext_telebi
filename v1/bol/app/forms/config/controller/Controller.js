/**
 * Created by fabrizio on 08/03/2022.
 */

Ext.define('bol.view.forms.config.controller.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  alias: 'controller.v1-bol-config',

  requires: [
    'bol.view.forms.config.cards.Pdf',
    'bol.view.forms.config.cards.Email',
    'bol.view.forms.config.model.Form'
  ],
  mixins: ['portal.v1.global.Util'],
  init: function () {
    let vm = this.getViewModel()
    vm.set('record', Ext.create('bol.view.forms.config.model.Form'))
    vm.set("isnew", 0);
    vm.set("id", "config");
    this.callParent(arguments)
  },

  managerView: function () {
    this.callParent(arguments)
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = true,readOnlyTag = true,
      gestore = false;

    if (this.checkRuoli(['99', '10'])) {
      readOnly = false
      gestore = true
      vm.set('btn.save', true)
      vm.set('btn.cronology', true)
      vm.set('btn.delete', true)
    }
    if (vm.get('isnew')===1) {
      readOnlyTag=false
    }
    vm.set('gestore', gestore)
    //gestione tasti default
    vm.set('btn.close', true)
    vm.set('readOnly', readOnly)
    vm.set('readOnlyTag', readOnlyTag)
    //titolo tab
    vm.set('title', Locale.t('bol.forms.config.title'))
    vm.set('label', Locale.t('bol.forms.config.title'))
    vm.set('toolbar.hideCard', false)

    if (!this.listForms) {
      this.listForms = [
        {
          posizione: 'email',
          backgroundColor: 'LightBlue',
          card: Ext.create('bol.view.forms.config.cards.Email'),
          text: Locale.t('bol.forms.config.cards.email.title')
        },
        {
          posizione: 'pdf',
          backgroundColor: '',
          card: Ext.create('bol.view.forms.config.cards.Pdf'),
          text: Locale.t('bol.forms.config.cards.pdf.title')
        },
      ]
    }

    //Aggiungo cards
    for (card of this.listForms) {
      let hidecard=false //tasto visibile
      if (card.posizione==='accessi' && gestore===false) {
        hidecard=true //nascondo tab accessi se non gestore
      }
      this.toolBarCard.add({
        text: card.text,
        enableToggle:true,
        style: {backgroundColor: card.backgroundColor},
        posizione: card.posizione,hidden:hidecard,
        handler: 'onClickCard'
      })
      this.form.add(card.card);
    }
    this.getView().setActiveItem(this.form);
    this.onClickCard({posizione: vm.get('cardactive')})


    // //carico oggetti nel panel
    // this.cardConfig = Ext.create('bol.view.forms.config.cards.Config')
    // this.language = Ext.create('bol.view.forms.config.cards.Language')
    //
    // this.form.add(this.cardConfig)
    // this.getView().setActiveItem(this.form)
  },
  onSave: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    //aggiorno grid risorse
    if (!this.obb()) {
      return false
    }
    this.callParent(arguments)
  },
  obb: function () {
    let modulo = this.cardConfig.getForm()
    if (!modulo.isValid()) {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('global.form.validation.modulo'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      })
      return false
    }
    return true
  }
})