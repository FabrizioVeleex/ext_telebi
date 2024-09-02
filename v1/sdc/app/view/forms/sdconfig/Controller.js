Ext.define('sdc.view.forms.sdconfig.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-parametri',
  requires: [
    'sdc.model.forms.sdconfig.Model',
    'sdc.view.forms.sdconfig.cards.Sdconfig'
  ],
  init: function () {
    let vm = this.getViewModel();
    vm.set('isnew', 0);
    vm.set('record', Ext.create('sdc.model.forms.sdconfig.Model'))
    this.callParent(arguments)
  },
  managerView: function () {
    this.callParent(arguments)
    let me = this, vm = me.getViewModel(), readOnly = true
    if (this.checkRuoli(['99'])) {
      readOnly = false;
      vm.set('btn.save', true);
    }
    //gestione tasti default
    vm.set('readOnly', readOnly);
    //titolo tab
    vm.set('title', 'Parametri' || 'n.d.')
    vm.set('label', Locale.t('sdc.forms.configurazione.title'))

    this.cardParam = Ext.create('sdc.view.forms.sdconfig.cards.Sdconfig');
    this.form.add(this.cardParam);
    this.getView().setActiveItem(this.form);
  },
  onSave: function () {
    if (!this.obb()) {
      return false;
    }
    this.callParent(arguments)
  },
  obb: function () {
    let modulo = this.cardParam.getForm()
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