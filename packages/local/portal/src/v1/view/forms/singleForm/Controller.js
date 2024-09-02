Ext.define('portal.v1.view.forms.singleForm.Controller', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.tab.Panel',
    'Ext.toolbar.Toolbar',
    'portal.v1.view.grids.cronology.Cronology'
  ],
  init: function () {
    this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      hidden: false,
      bind: {
        hidden: '{toolbar.hideMain}'
      }
    });
    
  
    this.getView().addDocked(this.toolBarCronology, 0);
    this.getView().addDocked(this.toolBar, 0);
    this.cronology = Ext.create('portal.v1.view.grids.cronology.Cronology');

    this.form = Ext.create('Ext.tab.Panel', {
      padding: 0,
    });
  },
  
  managerView: function () {
    this.form.removeAll(false);
    this.toolBar.removeAll(false);
    this.toolBar.add([
      // this.btnCronology,
      // this.btnClose,
      // this.btnSaveClose,
      // this.btnSave,
      // this.btnDelete
    ]);
  },

  onBeforeCronology: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    // storeCronology
    vm.set('toolbar.hideMain', true);
    vm.set('toolbar.hideCronology', false);
    this.cronology.fireEvent('popolate', record.id, vm.get('form'));
    this.getView().setActiveItem(this.cronology);
  },
  onCloseCronology: function () {
    let me = this,
      vm = me.getViewModel();
    vm.set('toolbar.hideCronology', true);
    vm.set('toolbar.hideMain', false);
    this.getView().setActiveItem(this.form);
  },
  onPressCronology: function (btn) {
    this.cronology.fireEvent('onTogle', btn);
  },
  onReloadCronology: function () {
    this.cronology.fireEvent('reoladStore');
  },


  onClickCard: function (btn) {
    this.getViewModel().set('cardactive', btn.posizione);
    let obj = this.listForms,
      toolBarCard = this.toolBarCard;
    toolBarCard.items.each(function (item) {
      if (item.posizione === btn.posizione) {
        item.toggle(true);
        // item.setStyle({'background-color': 'LightBlue'});
      } else {
        item.toggle(false);
        // item.setStyle({'background-color': ''});
      }

    }, this);

    //attivo card selezionato
    const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === btn.posizione);
    if (pos) {
      this.form.setActiveItem(obj[pos].card);
    }
  }
});
