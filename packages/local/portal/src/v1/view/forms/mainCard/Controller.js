Ext.define('portal.v1.view.forms.mainCard.Controller', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.panel.Panel',
    'Ext.button.Button',
    'Ext.layout.container.Card',
    'portal.v1.view.forms.FormWaiting',
    'Ext.toolbar.Toolbar',
    'portal.util.Functions',
    'portal.util.Locale',
    'portal.v1.view.grids.cronology.Cronology'
  ],
  init: function () {
    let me = this,
      vm = this.getViewModel();

    this.listCard = [];
    this.closeForm = false;
    this.refreshGrid = false;

    this.btnClose = {
      text: Locale.t('global.btn.close.text'),
      iconCls: 'fas fa-window-close',
      tooltip: Locale.t('global.btn.close.tooltip'),
      ui: 'ocra',
      hidden: true,
      bind: {
        hidden: '{!btn.close}'
      },
      handler: 'onClose'
    }
    this.btnCronology = {
      ui: 'ocra',
      tooltip: Locale.t('global.cronology.tooltip'),
      iconCls: 'fas fa-history',
      hidden: true,
      bind: {
        hidden: '{!btn.cronology}'
      },
      handler: 'onBeforeCronology'
    };

    this.btnSave = {
      ui: 'green',
      iconCls: 'fas fa-save',
      text: Locale.t('global.btn.save.text'),
      hidden: true,
      bind: {
        hidden: '{!btn.save}'
      },
      handler: 'onSave'
    };

    this.btnSaveClose = {
      ui: 'green',
      iconCls: 'fas fa-save',
      text: Locale.t('global.btn.saveclose.text'),
      hidden: true,
      bind: {
        hidden: '{!btn.saveclose}'
      },
      handler: 'onSaveClose'
    };

    this.btnDelete = {
      xtype: 'button',
      ui: 'red',
      text: Locale.t('global.btn.delete.text'),
      tooltip: Locale.t('global.btn.delete.tooltip'),
      iconCls: 'x-fa fa-trash',
      hidden: true,
      bind: {
        hidden: '{!btn.delete}'
      },
      handler: 'onDelete'
    };

    this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      hidden: false,
      bind: {
        hidden: '{toolbar.hideMain}'
      }
    });
    this.toolBarCronology = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      hidden: true,
      bind: {
        hidden: '{toolbar.hideCronology}'
      },
      items: [
        {
          text: Locale.t('global.btn.goback.text'),
          iconCls: 'fas fa-backward',
          tooltip: Locale.t('global.btn.goback.tooltip'),
          ui: 'ocra',
          handler: 'onCloseCronology'
        },
        {
          iconCls: 'pictos pictos-refresh',
          tooltip: Locale.t('global.btn.goback.tooltip'),
          ui: 'ocra',
          handler: 'onReloadCronology'
        },
        {
          iconCls: 'x-fa fa-list',
          text: Locale.t('global.cronology.dettagliotext'),
          enableToggle: true,
          tooltip: Locale.t('global.cronology.dettagliotooltip'),
          pressed: false,
          toggleHandler: 'onPressCronology'
        }
      ]
    });
    this.toolBarCard = Ext.create('Ext.toolbar.Toolbar', {
      dock: 'top',
      hidden: true,
      bind: {
        hidden: '{toolbar.hideCard}'
      },
      items: this.listCard
    });
    // this.getView().addDocked(this.toolBarCard, 0);
    this.getView().addDocked(this.toolBarCronology, 0);
    this.getView().addDocked(this.toolBar, 0);
    this.cronology = Ext.create('portal.v1.view.grids.cronology.Cronology')

    this.form = Ext.create('Ext.panel.Panel', {
      padding: 0,
      layout: {
        type: 'card'
      },
      dockedItems: [
        this.toolBarCard
      ]
    });
  },
  onAfterRender: function () {
    let me = this,
      vm = this.getViewModel();

    this.getViewModel().set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.avvio') + '</h3>');
    this.panelInfo = Ext.create('portal.v1.view.forms.FormWaiting');
    this.getView().add(this.panelInfo);
    if (vm.get('isnew') === 0) {
      this.getView().setActiveItem(this.panelInfo);
    }
  },
  loadData: function () {
    let me = this,
      vm = this.getViewModel(),
      record = vm.get('record');

    let consoleInfo = '<h3>' + Locale.t('global.form.caricamento') + '</h3>';
    vm.set('panelinfo.consoleInfo', consoleInfo);

    //record.getProxy().setExtraParams({ isnew: vm.get('isnew') })
    //TODO gestire diversamento le variabili tag e tipo e idpadre
    record.getProxy().setExtraParams({ ...record.getProxy().extraParams, isnew: vm.get('isnew'), tipo: vm.get('tipo'), tag: vm.get('tag'), idpadre: vm.get('idpadre') });

    record.load({
      success: function (record) {
        vm.set('panelinfo.consoleInfo', Locale.t('global.form.caricamento'));
        me.getView().setActiveItem(me.form);
        me.managerView(record);
      },
      failure(record, esito) {

        let consoleInfo;
        try {
          let rest = esito.error.response.responseJson;
          consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
        } catch (e) {
          consoleInfo = '<h3><span style="color:red">' + Locale.t('global.error.server') + '</span></h3>';
        }
        vm.set('panelinfo.consoleInfo', consoleInfo);
        me.onAfterLoadFailure()
      }
    });
  },
  managerView: function (record) {

    this.form.removeAll(false);
    this.toolBar.removeAll(false);
    this.toolBarCard.removeAll(false);
    this.toolBar.add([
      this.btnCronology,
      this.btnClose,
      this.btnSaveClose,
      this.btnSave,
      this.btnDelete
    ]);
  },

  //gestione global.form.suffissoedit
  onClose: function () {
    //lancio evento chisura x controller grid che è in attesa
    // if (this.refreshGrid === true) {
    this.getView().refreshGrid = this.refreshGrid;
    this.getView().fireEvent('closeForm', this);
    // }
    this.getView().destroy(); //distruggo panel
  },
  onSaveClose: function () {
    this.closeForm = true;
    this.onSave();
  },
  onSave: function () {
    this.onBeforeSave();
    this.onSaveNext()
  },
  onBeforeSave: function () {
    let me = this,
      vm = me.getViewModel()

    if (this.toolBar) {
      this.toolBar.disable();
    }
    vm.set('panelinfo.iconInfoStart', true);
    vm.set('panelinfo.iconInfoError', false);
    vm.set('panelinfo.btnInfoErrorLoad', false);
    vm.set('panelinfo.btnInfoErrorSave', false);
    vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.form.suffissoedit') + '</h3>');
    this.getView().setActiveItem(this.panelInfo);
  },
  onSaveNext: function (close) {
    let me = this,
      vm = this.getViewModel(),
      record = vm.get('record');

    record.phantom = vm.get('isnew') === 1; //gestione POST/PUT
    record.save({
      success: function (dati, esito) {
        me.refreshGrid = true;
        vm.set('isnew', 0);
        let title = vm.get('label');
        bdFunctions.bdTips.msg(title, Locale.t('global.form.salvataggiook'));
        if (me.closeForm === true) {
          me.onClose();
        } else {
          me.onAfterSave();
        }
      },
      failure: function (dati, esito) {
        let consoleInfo;
        try {
          let rest = esito.error.response.responseJson;
          consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
        } catch (e) {
          consoleInfo = '<h3><span style="color:red">' + Locale.t('global.error.server') + '</span></h3>';
        }
        vm.set('panelinfo.consoleInfo', consoleInfo)
        me.onAfterSaveFailure();
      }
    });
  },
  onAfterSave: function () {
    if (this.toolBar) {
      this.toolBar.enable();
    }
    let consoleInfo = this.getViewModel().get('panelinfo.consoleInfo');
    consoleInfo += '<h3>' + Locale.t('global.form.suffissoedit') + '</h3>';
    this.getViewModel().set('panelinfo.consoleInfo', consoleInfo);
    this.loadData();

  },
  onErrorSave: function () {
    //console.log('onErrorSave')
    let vm = this.getViewModel();
    vm.set('panelinfo.iconInfoStart', false);
    vm.set('panelinfo.iconInfoError', true);
    vm.set('panelinfo.btnInfoErrorSave', true);

    if (this.toolBar) {
      this.toolBar.enable();
    }
    this.getView().setActiveItem(this.form);
  },
  onAfterSaveFailure: function () {
    // console.log('onAfterSaveFailure')
    let vm = this.getViewModel();
    if (this.toolBar) {
      this.toolBar.enable();
    }
    vm.set('panelinfo.iconInfoStart', false);
    vm.set('panelinfo.iconInfoError', true);
    vm.set('panelinfo.btnInfoErrorLoad', true);
    vm.set('panelinfo.btnInfoErrorSave', true);
  },

  //messaggi su caricamento
  onAfterLoadFailure: function () {
    //console.log('onAfterLoadFailure')
    let vm = this.getViewModel();

    vm.set('panelinfo.iconInfoStart', false);
    vm.set('panelinfo.iconInfoError', true);
    vm.set('panelinfo.btnInfoErrorLoad', true);
    vm.set('panelinfo.btnInfoErrorSave', false);
    vm.set('panelinfo.iconInfoError', true);
  },

  onBeforeDelete: function () {
    let me = this,
      vm = me.getViewModel()

    if (this.toolBar) {
      this.toolBar.disable();
    }

    vm.set('panelinfo.iconInfoStart', true);
    vm.set('panelinfo.iconInfoError', false);
    vm.set('panelinfo.btnInfoErrorLoad', false);
    vm.set('panelinfo.btnInfoErrorSave', false);
    vm.set('panelinfo.consoleInfo', '<h3>' + Locale.t('global.btn.delete.progress') + '</h3>');
    this.getView().setActiveItem(this.panelInfo);
  },
  onAfterDeleteFailure: function () {
    let vm = this.getViewModel();

    vm.set('panelinfo.iconInfoStart', false);
    vm.set('panelinfo.iconInfoError', true);
    vm.set('panelinfo.btnInfoErrorLoad', true);
    vm.set('panelinfo.btnInfoErrorSave', true);
  },

  onDelete: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      consoleInfo = vm.get('panelinfo.consoleInfo')

    Ext.Msg.show({
      title: Locale.t('global.btn.delete.text'), iconCls: 'x-fa fa-trash', msg: Locale.t('global.btn.delete.confirm'),
      buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
        if (b === 'yes') {
          me.onBeforeDelete();
          record.erase({
            success: function (record) {
              bdFunctions.bdTips.msg(vm.get('title'), Locale.t('global.btn.delete.ok'));
              me.refreshGrid = true;
              me.onClose();
            },
            failure: function (dati, esito) {
              let consoleInfo;
              try {
                let rest = esito.error.response.responseJson;
                consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
              } catch (e) {
                consoleInfo = '<h3><span style="color:red">' + Locale.t('global.error.server') + '</span></h3>';
              }

              vm.set('panelinfo.consoleInfo', consoleInfo);
              me.onAfterDeleteFailure()
            }
          });
        }
      }
    });
  },


  onBeforeCronology: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record')

    // storeCronology
    vm.set('toolbar.hideMain', true)
    vm.set('toolbar.hideCronology', false)
    this.cronology.fireEvent('popolate', record.id, vm.get('form'))
    this.getView().setActiveItem(this.cronology);
  },
  onCloseCronology: function () {
    let me = this,
      vm = me.getViewModel()
    vm.set('toolbar.hideCronology', true)
    vm.set('toolbar.hideMain', false)
    this.getView().setActiveItem(this.form);
  },
  onPressCronology: function (btn) {
    this.cronology.fireEvent('onTogle', btn)
  },
  onReloadCronology: function (btn) {
    this.cronology.fireEvent('reoladStore')
  },


  onClickCard: function (btn) {
    this.getViewModel().set('cardactive', btn.posizione)
    let obj = this.listForms,
      toolBarCard = this.toolBarCard;

    toolBarCard.items.each(function (item) {
      if (item.posizione === btn.posizione) {
        item.toggle(true)
        // item.setStyle({'background-color': 'LightBlue'});
      } else {
        item.toggle(false)
        // item.setStyle({'background-color': ''});
      }

    }, this);

    //attivo card selezionato
    const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === btn.posizione);
    if (pos) {
      this.form.setActiveItem(obj[pos].card)
    }
  }
});
