/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.parametri.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  alias: 'controller.v1-parametri',

  requires: ['ana.model.forms.parametri.Model', 'ana.view.forms.parametri.cards.Parametri'],
  mixins: ['portal.v1.global.Util'],
  init: function () {
    let vm = this.getViewModel();
    vm.set('isnew', 0);
    vm.set('record', Ext.create('ana.model.forms.parametri.Model'));
    this.callParent(arguments);
  },

  managerView: function () {
    this.callParent(arguments);
    let me = this, vm = me.getViewModel(), record = vm.get('record'),readOnly = true;
    let  comboGruppo = vm.getStore('comboGruppo') //combo x notifica ordini
    let  comboAnomalie = vm.getStore('comboAnomalie') //combo x notifica timbrature

    if (this.checkRuoli(['99'])) {
      readOnly = false;
      vm.set('btn.save', true);
    }
    //gestione tasti default
    vm.set('readOnly', readOnly);
    //titolo tab
    vm.set('title', 'Parametri' || 'n.d.');
    vm.set('label', Locale.t('ana.forms.parametri.title'));
    comboGruppo.loadData(record.data['comboGruppo'])
    comboAnomalie.loadData(record.data['comboGruppo'])

    this.cardStato = Ext.create('ana.view.forms.parametri.cards.Parametri');
    this.form.add(this.cardStato);
    this.getView().setActiveItem(this.form);
  },
  onSave: function () {
    this.callParent(arguments);
  },
});
