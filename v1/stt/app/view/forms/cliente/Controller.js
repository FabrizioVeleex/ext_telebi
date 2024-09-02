/**
 * Created by fabrizio on 09/01/2022.
 */
Ext.define('stt.view.forms.cliente.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  mixins: [
    'portal.v1.global.Util',
    'stt.view.forms.budget.controller.ControllerCliente'
  ],
  alias: 'controller.v1-forms-cliente',
  requires: [
    'Ext.form.FieldSet',
    'stt.view.forms.cliente.ModelForm',
    'stt.view.forms.cliente.components.gridassociazione.Model',
    'stt.view.forms.cliente.components.gridassociazione.Store',
    'stt.view.forms.cliente.components.gridassociazione.Grid',
    'stt.view.forms.cliente.cards.Cliente'
  ],
  init: function () {
    let vm = this.getViewModel();
    vm.set('isnew', this.getView().valori.isnew);
    vm.set('id', this.getView().valori.id);
    vm.set('record', Ext.create('stt.view.forms.cliente.ModelForm', {
      id: this.getView().valori.id,
      isnew: this.getView().valori.isnew
    }))
    this.callParent(arguments)
  },

  managerView: function () {
    this.callParent(arguments)
    let me = this, vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = false;

    vm.set('btn.save', true)
    vm.set('btn.delete', true)
    vm.set('btn.close', true)
    vm.set('readOnly', readOnly)
    //titolo tab
    vm.set('title', record.data['cdcli'] || Locale.t('stt.global.new'))
    vm.set('label', Locale.t('stt.forms.cliente.title'))

    // --------------------------------------------------------------
    // Inizializzo card Cliente
    this.initCliente();


    this.getView().setActiveItem(this.form);
  },
  onSave: function () {
    if (!this.obb()) {
      return false;
    }
    let me = this, vm = me.getViewModel(), record = vm.get('record'),
      storeAssociazione = vm.getStore('storeAssociazione')

    record.data['associazione'] = []
    storeAssociazione.each(function (rec) {
      if (rec.data.cdcli !== '') {
        record.data['associazione'].push(rec.data)
      }
    })
    this.callParent(arguments)
  },
  obb: function () {
    let cliente = this.cardCliente.getForm()
    if (!cliente.isValid()) {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('global.form.validation.cliente'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
      return false;
    }
    return true;
  }
})