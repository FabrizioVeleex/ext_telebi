Ext.define('nsm.view.grids.jobs.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.jobs',
  requires: [
    'Ext.menu.Menu',
    'nsm.model.grids.Jobs',
    'nsm.view.forms.job.Panel'
  ],
  init: function () {
    let me = this,
      vm = this.getViewModel()

    //gestione menu
    this.listBtnTop = [
      { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
    ]

    if (this.checkRuoli(['99', '2'])) {
      this.listBtnTop.push({
        tooltip: Locale.t('nsm.grids.jobs.btn.new.tooltip'),
        text: Locale.t('nsm.grids.jobs.btn.new.text'),
        ui: 'green',
        iconCls: 'x-fas fa-plus',
        handler: 'onNew'
      });
    }


    this.listBtnTop.push(
      {
        text: 'Azioni',
        iconCls: 'x-fas fa-wrench',
        menu: [
          { text: 'Schedula tutto', action: 'activeOn', nomeJob: 'ALL', handler: 'onActionJob', iconCls: ' x-fas fa-play bd-color-green' },
          { text: 'Rimuovi tutte le schedulazioni', action: 'activeOff', nomeJob: 'ALL', handler: 'onActionJob', iconCls: ' x-fas fa-stop bd-color-red' },
        ]
      }
    )

    this.toolbarFilter = Ext.create('Ext.Toolbar', {
      dock: 'top',
      bind: {
        hidden: '{toolbar}'
      },
      items: [
        // {
        //   xtype: 'combo', fieldLabel: Locale.t('nsm.grids.jobs.filtri.applicazione'), width: 500,
        //   displayField: 'titolo',
        //   valueField: 'titolo',
        //   labelWidth: 150,
        //   queryMode: 'remote',
        //   forceSelection: true,
        //   campo: 'applicazione',
        //   bind: {
        //     store: '{comboApplicazione}'
        //   },
        //   listeners: {
        //     change: 'onChangeComboFiltro',
        //   }
        // },
        {
          xtype: 'combo',
          fieldLabel: Locale.t('nsm.grids.jobs.filtri.tiposervizio'), width: 500,
          displayField: 'id',
          valueField: 'id',
          queryMode: 'local',
          labelWidth: 150,
          queryMode: 'remote',
          forceSelection: true,
          campo: 'tipoServizio',
          bind: {
            store: '{comboTipoServizio}'
          },
          listeners: {
            change: 'onChangeComboFiltro',
          }
        }
      ]
    })

    this.callParent(arguments)

    // Aggiungo nuovo toolbar
    this.getView().addDocked(this.toolbarFilter)
  },

  onChangeComboFiltro: function (combo, rec) {
    let store = this.getViewModel().getStore('store')
    store.getProxy().extraParams[combo.campo] = rec;
    store.load();
  },

  onActionJob: function (btn) {
    let me = this
    Ext.Ajax.request({
      url: Backend.REST_API + 'grids/jobs/actionjob/',
      method: 'POST',
      params: {
        'action': btn.action,
        'nomeJob': btn.nomeJob
      },
      success: function (response, o) {
        let resJson = Ext.decode(response.responseText);
        me.getView().getStore().reload()
      },
      failure: function (response) {
        let msg = Locale.t('global.errore')
        if (response) {
          try {
            let res = Ext.decode(response.responseText);
            if (res['msg']) {
              msg = '<b style="color:red">' + res['msg'] + '</b>'
            }
          } catch (err) {

          }
        }
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: msg,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        });

      }
    });

  },
  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('nsm.model.grids.Jobs', {
      id: this.randomString(32),
      isnew: 1,
      status: 1
    });
    this.createForm(view, NewRecord, 1);
  },

  createForm: function (view, record, isnew, tipo) {
    let itemId = 'f' + record.data['id'];

    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }

    this.getView().fireEvent('createTab', Ext.create('nsm.view.forms.job.Panel', {
      itemId: 'f' + record.data['id'],
      record: record,
      storeForm: view.getStore(),
      valori: {
        id: record.data['id'],
        isnew: isnew,
        tipo: tipo
      }
    }), view)
  },
  onItemContextMenu: function (node, record, item, index, e) {
    e.stopEvent();
    let me = this
    let items = [];
    //verifico stato
    if (record.data['running'] === true) {
      items.push({
        scope: me,
        text: 'Annulla processo in esecuzione',
        iconCls: ' x-fas fa-times-circle bd-color-red',
        handler: 'onActionJob',
        action: 'forceStop',
        nomeJob: record.data['filejs']
      });
    } else {
      items.push({
        scope: me,
        text: 'Avvia adesso',
        iconCls: ' x-fas fa-play bd-color-blue',
        handler: 'onActionJob',
        action: 'runOne',
        nomeJob: record.data['filejs']
      });
    }

    if (record.data['enable'] === true) {
      items.push({
        scope: me,
        text: 'disattiva schedulazione',
        iconCls: ' x-fas fa-stop bd-color-red',
        handler: 'onActionJob',
        action: 'activeOff',
        nomeJob: record.data['filejs']
      });
      items.push({
        scope: me,
        text: 'Riavvia il servizio',
        iconCls: ' x-fas fa-redo bd-color-gray',
        handler: 'onActionJob',
        action: 'restart',
        nomeJob: record.data['filejs']
      });
    } else {
      items.push({
        scope: me,
        text: 'Attiva schedulazione',
        iconCls: ' x-fas fa-play bd-color-green',
        handler: 'onActionJob',
        action: 'activeOn',
        nomeJob: record.data['filejs']
      });
    }
    let contextMenu = Ext.create('Ext.menu.Menu', {
      items: items
    });
    contextMenu.showAt(e.getXY());
  },

  onAddFilterApp: function (node) {
    if (node.data.id_padre) {
      let me = this,
        vm = me.getViewModel(),
        store = vm.getStore('store');
      store.getProxy().extraParams.applicazione = node.data.id_padre;
      store.load();
    }


  },
});