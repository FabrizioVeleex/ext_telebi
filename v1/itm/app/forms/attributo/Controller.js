/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.attributo.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-attributo',
  requires: [
    'itm.forms.attributo.Model',
    'itm.forms.attributo.cards.Attributo',
    'itm.forms.articolo.ArticoloPanel'
  ],
  init: function () {
    let vm = this.getViewModel();
    vm.set('isnew', this.getView().valori.isnew);
    vm.set('id', this.getView().valori.id);
    vm.set('record', Ext.create('itm.forms.attributo.Model', {
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
      storeArticoli = vm.getStore('storeArticoli'),
      readOnly = true
    if (this.checkRuoli(['99', '9'])) {
      vm.set('btn.save', true)
      vm.set('btn.delete', true)
      readOnly = false
    }
    vm.set('btn.close', true)
    vm.set('readOnly', readOnly);
    //titolo tab
    vm.set('title', record.data['attributo'] || 'n.d.')
    vm.set('label', Locale.t('itm.forms.attributo.title'))

    storeArticoli.loadData(record.data['storeArticoli'])
    if (!this.toolbarDescrizione) {
      this.toolbarDescrizione = Ext.create("Ext.Toolbar", {
        items: [
          {
            xtype: 'textfield', fieldLabel: Locale.t('itm.forms.attributo.fields.attributo'),
            width: 400,
            bind: {
              value: '{record.attributo}',
              readOnly: '{readOnly}'
            }
          }
        ]
      })
      this.getView().addDocked(this.toolbarDescrizione)
    }
    this.cardAttributo = Ext.create('itm.forms.attributo.cards.Attributo');
    this.form.add(this.cardAttributo);
    this.getView().setActiveItem(this.form);
  },
  onOpen: function (view, rowIndex, colIndex, item, opt, record) {
    let main = view.up('app-main');
    let controller = main.getController()
    let tab = controller.panelCenter.child('#f' + record.data.id);
    if (!tab) {
      tab = Ext.create('itm.forms.articolo.ArticoloPanel', {
        itemId: 'f' + record.data['id'],
        record: record,
        valori: {
          id: record.data['id'],
          isnew: 0
        }
      })
      controller.panelCenter.add(tab);
    }
    controller.panelCenter.setActiveTab(tab);
  },
  onSave: function () {
    let me = this, vm = me.getViewModel(), record = vm.get('record')
    //controllo se ci sono solo spazi
    if (record.data.attributo.trim() === '') {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('itm.forms.attributo.descblank'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
      return false;
    }

    this.callParent(arguments)
  },

})

