/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.gomma.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-gomma',
  requires: [
    'itm.forms.gomma.Model',
    'itm.forms.gomma.cards.Gomma'
  ],
  init: function () {
    let vm = this.getViewModel();
    vm.set('isnew', this.getView().valori.isnew);
    vm.set('id', this.getView().valori.id);
    vm.set('record', Ext.create('itm.forms.gomma.Model', {
      id: this.getView().valori.id,
      isnew: this.getView().valori.isnew
    }))
    this.callParent(arguments)
  },

  managerView: function () {
    this.callParent(arguments)
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = true;

    if (this.checkRuoli(['99', '10'])) {
      vm.set('btn.save', true)
      vm.set('btn.delete', true)
      readOnly = false
    }
    vm.set('btn.cronology', true)
    vm.set('btn.close', true)
    vm.set('readOnly', readOnly);
    //titolo tab
    vm.set('title', record.data['cd_rotolo'] || 'n.d.')
    vm.set('label', Locale.t('itm.forms.gomma.title'))

    this.cardGomma = Ext.create('itm.forms.gomma.cards.Gomma');
    this.form.add(this.cardGomma);
    this.getView().setActiveItem(this.form);
  },
  onSave: function () {
    if (!this.obb()) {
      return false;
    }
    this.callParent(arguments)
  },
  obb: function () {
    let modulo = this.cardGomma.getForm()
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
})