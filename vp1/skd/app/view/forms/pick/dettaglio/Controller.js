/**
 * Created by fabrizio on 02/06/19.
 */
Ext.define('skd.view.forms.pick.dettaglio.Controller', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  alias: 'controller.dettagliopick',
  requires: [
    'Ext.container.Container',
    'Ext.form.field.ComboBox',
    'Ext.form.field.TextArea',
    'Ext.grid.Panel',
    'Ext.grid.column.Action',
    'Ext.grid.feature.Grouping',
    'Ext.layout.container.Border',
    'Ext.layout.container.Fit',
    'Ext.layout.container.HBox',
    'Ext.util.DelayedTask',
    'Ext.window.Window',
    'skd.view.forms.pick.dettaglio.Model',

    "skd.view.forms.pick.dettaglio.panel.filtri.Panel",
    'skd.view.forms.pick.dettaglio.panel.grid.Grid',
    'skd.view.forms.pick.dettaglio.panel.form.Panel',
    'skd.view.forms.pick.dettaglio.panel.testata.Panel',

    'skd.store.forms.filtri.ComboOperatore',
  ],
  mixins: [
    'portal.v1.global.Util',
    "skd.view.forms.pick.dettaglio.panel.filtri.Controller",
    "skd.view.forms.pick.dettaglio.panel.testata.Controller",
    "skd.view.forms.pick.dettaglio.panel.form.Controller",
    "skd.view.forms.pick.dettaglio.panel.grid.Controller",
    "skd.view.forms.pick.dettaglio.panel.testata.Controller",
  ],
  init: function () {

    this.setConfModRun = 0
    let vm = this.getViewModel(),
      i = 0;

    vm.set('isnew', false);
    vm.set('id', '');

    this.job_log = '';
    this.isLoaded = false;

    if (this.checkRuoli(['11'])) {
      vm.set('readOnly', false);
    }

    vm.set('record', this.getView().record);
    vm.set('filtripick', Ext.global.Vars.confMod.main.filtripick);

    if (Ext.global.Vars.confMod.main.filtripick.listComp) {
      let storeGridDettComp = vm.getStore('storeGridDettComp');
      for (i = 0; i < Ext.global.Vars.confMod.main.filtripick.listComp.length; i++) {
        storeGridDettComp.add({ 'part_no': Ext.global.Vars.confMod.main.filtripick.listComp[i] });
      }
    }
    if (Ext.global.Vars.confMod.main.filtripick.listCdl) {
      let storeGridCdl = vm.getStore('storeGridDettCdl');
      for (i = 0; i < Ext.global.Vars.confMod.main.filtripick.listCdl.length; i++) {
        storeGridCdl.add({
          'ope_work_center_no': Ext.global.Vars.confMod.main.filtripick.listCdl[i][0],
          'io': Ext.global.Vars.confMod.main.filtripick.listCdl[i][1]
        });
      }
    }

    if (Ext.global.Vars.confMod.main.filtripick.listRep) {
      let storeGridPickReparto = vm.getStore('storeGridPickReparto');
      for (i = 0; i < Ext.global.Vars.confMod.main.filtripick.listRep.length; i++) {
        storeGridPickReparto.add({
          'rep_cdl_department_no': Ext.global.Vars.confMod.main.filtripick.listRep[i][0],
          'io': Ext.global.Vars.confMod.main.filtripick.listRep[i][1]
        });
      }
    }

    this.dataForm = Ext.create('skd.view.forms.pick.dettaglio.Model');

    this.form = Ext.create('Ext.Container', {
      defaults: {
        bodyPadding: 5,
      },
      layout: {
        type: 'card'
      }
    });
    this.isLoaded = false;
  },

  onAfterRender: function () {
    let me = this,
      vm = this.getViewModel(),
      proxy = this.dataForm.getProxy(),
      record = vm.get('record');

    proxy.extraParams.lab = record['sc_op_lab'];
    this.dataForm.load({
      success: function (record) {
        vm.set('record', record);
        me.managerView();
      },
      falure: function (a, b) {

      }
    });
  },

  managerView: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      store = vm.get("store");

    // gestioen nota e Preparatore
    this.formTestata = Ext.create('skd.view.forms.pick.dettaglio.panel.testata.Panel');

    // Gestione filtri
    this.formFiltri = Ext.create('skd.view.forms.pick.dettaglio.panel.filtri.Panel');

    // Vista principale lista 
    this.gridDettaglio = Ext.create('skd.view.forms.pick.dettaglio.panel.grid.Grid');

    // Form Dx per gestione e visualizzazione dati
    this.formDettaglio = Ext.create('skd.view.forms.pick.dettaglio.panel.form.Panel');

    // Pannello raggruppamento oggetti da visualizzare
    this.cardDettaglio = Ext.create('Ext.panel.Panel', {
      layout: 'fit',
      dockedItems: [
        this.formTestata,
        this.formFiltri
      ],
      items: [
        {
          xtype: 'panel',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          items: [
            this.gridDettaglio,
            this.formDettaglio
          ]
        }
      ]
    });

    this.getView().add(this.form)
    this.form.add(this.cardDettaglio);

    // Caricamento iniziale lista in grid
    store.getProxy().extraParams.lab = record.data.lab;
    store.getProxy().extraParams.filtri = Ext.encode(Ext.global.Vars.confMod.main.filtripick);
    store.load();

    this.managerViewFiltri();
    this.checkDateRecord()
  },

  //-----------------------------------------------------------
  // Caricamento dati in grid
  checkDateRecord: function () {
    try {
      let me = this,
        vm = me.getViewModel(),
        record = vm.get("record"),
        disableDate = {
          inizio_preparazione: false,
          inizio_effettivo: false,
          fine_preparazione: false,
          completato_senza_mancanti: false,
          inizio_produzione: false,
          num: 0
        }

      if (record.get('data_ini_preparazione')) {
        disableDate.num += 10
      }
      if (record.get('data_ini_effettivo')) {
        disableDate.num += 100
      }
      if (record.get('data_end_preparazione')) {
        disableDate.num += 1000
      }
      if (record.get('completato_senza_mancanti')) {
        disableDate.num += 10000
      }

      switch (true) {
        case disableDate.num >= 10000:
          disableDate = {
            inizio_preparazione: true,
            inizio_effettivo: true,
            fine_preparazione: true,
            completato_senza_mancanti: false,
            num: 10000

          }
          break;
        case disableDate.num >= 1000:
          disableDate = {
            inizio_preparazione: true,
            inizio_effettivo: true,
            fine_preparazione: false,
            completato_senza_mancanti: false,
            num: 1000
          }
          break;
        case disableDate.num >= 100:
          disableDate = {
            inizio_preparazione: true,
            inizio_effettivo: false,
            fine_preparazione: false,
            completato_senza_mancanti: true,
            num: 100
          }
          break;

        case disableDate.num >= 10:
          disableDate = {
            inizio_preparazione: false,
            inizio_effettivo: false,
            fine_preparazione: true,
            completato_senza_mancanti: true,
            num: 10
          }
          break;
        default:
          disableDate = {
            inizio_preparazione: false,
            inizio_effettivo: true,
            fine_preparazione: true,
            completato_senza_mancanti: true,
            num: 0
          }
          break;
      }
      vm.set("disableDate", disableDate)
    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  },
  onCheckChangeAwait: function (item, newValue, t, oldValue) {
    let me = this,
      task = new Ext.util.DelayedTask(function () {
        me.onRunChange(item, newValue, oldValue)
      }, this);
    task.delay(500);
  },
  onRunChange: function (item, newValue, oldValue) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    if (item.name === 'data_end_preparazione') {
      if (!item.validate()) return; //FIXME cose?
    }
    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        id: record.data['id'],
        field: item.name,
        value: newValue
      },
      url: Backend.REST_API + 'forms/pick/changedata/',
      success: function (response) {
        let rest = Ext.decode(response.responseText);

        //FIXME spostato
        // if (record.data.in_produzione !== rest.data.in_produzione) {
        //   me.getView().down('#in_produzione').setValue(0)
        // }

        switch (item.name) {
          case 'data_end_preparazione':
            vm.set("record.data_end_preparazione", newValue)
            break;
          case 'data_ini_effettivo':
            vm.set("record.data_ini_effettivo", newValue)
            break;
          case 'data_end_preparazione':
            vm.set("record.data_end_preparazione", newValue)
            break;

          default:
            break;
        }
        me.checkDateRecord();
      },
      failure: function (o) {
        item.setValue(oldValue)
        let consoleInfo;
        try {
          let rest = Ext.decode(o.responseText);
          consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
        } catch (e) {
          consoleInfo = '<h3><span style="color:red">Errore comunicazione server</span></h3>';
        }
        me.errorChangeData(consoleInfo);
      }
    });
  },
  onChangeOrdinamento: function (ordinamento) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("store");

    let sorters = store.getSorters();
    for (const sorter of sorters.items) {
      sorters.remove(sorter._id)
    }

    store.getProxy().extraParams.ordinamento = ordinamento;
    store.load();

  },
  onUpdPreparata: function () {
    let me = this;
    Ext.Msg.show({
      title: 'ATTENZIONE',
      msg: 'Sei sicuro di aggiornare <b>TUTTE</b> le quantità a video.',
      buttons: Ext.Msg.OKCANCEL,
      icon: Ext.MessageBox.QUESTION,
      fn: function (btn) {
        if (btn === 'ok') {
          me.runUpdatePreparata();
        }
      }
    });

  },
  runUpdatePreparata: function () {

    this.getView().el.mask('Aggiornamento dai in corso');
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    Ext.Ajax.request({
      method: 'GET',
      params: {
        lab: record.get('lab'),
        filtri: Ext.encode(Ext.global.Vars.confMod.main.filtripick)
      },
      url: Backend.REST_API + 'forms/pick/updatepreparata/',
      success: function (response) {
        me.getView().el.unmask();
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
          }
          me.getViewModel().getStore("store").load();
        } catch (err) {
          me.errorChangeData(err);
        }
      },
      failure: function (o) {
        me.getView().el.unmask();
        let consoleInfo;
        try {
          let rest = Ext.decode(o._response.responseText);
          consoleInfo = '<h3><span style="color:red">' + rest['msg'] + '</span></h3>';
        } catch (e) {
          consoleInfo = '<h3><span style="color:red">' + Locale.t('global.error connection') + '</span></h3>';
        }
        me.errorChangeData(consoleInfo);
      }
    });

  },
  errorChangeData: function (err) {
    Ext.Msg.show({
      title: 'ATTENZIONE', //Locale.t('skd.forms.footer.connection.title'),
      msg: err,
      buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
    });
  },
  onLoadGrid: function () {
    let i,
      vm = this.getViewModel(),
      store = vm.getStore("store"),
      filtripick = vm.get('filtripick'),
      storeGridDettPartOdp = vm.getStore('storeGridDettPartOdp'),
      storeGridDettComp = vm.getStore('storeGridDettComp'),
      storeGridDettCdl = vm.getStore('storeGridDettCdl'),
      storeGridRep = vm.getStore('storeGridPickReparto'),
      listPartOdp = [],
      listComp = [],
      listRep = [],
      listCdl = [];

    //Svuoto record selezionato
    vm.set('recordForm', null);

    //COMPONENT
    let dataComp = storeGridDettComp.getData();
    for (i = 0; i < dataComp.items.length; i++) {
      listComp.push(dataComp.items[i].data['part_no']);
    }
    filtripick.listComp = listComp;

    // PARTODP
    let dataParOdp = storeGridDettPartOdp.getData();
    for (i = 0; i < dataParOdp.items.length; i++) {
      listPartOdp.push(dataParOdp.items[i].data['part_no']);
    }
    filtripick.listPartOdp = listPartOdp;

    // REPARTO
    let dataRep = storeGridRep.getData();
    for (i = 0; i < dataRep.items.length; i++) {
      listRep.push([dataRep.items[i].data['rep_cdl_department_no'], dataRep.items[i].data['io']]);
    }
    filtripick.listRep = listRep;

    // CDL
    let dataCdl = storeGridDettCdl.getData();
    for (i = 0; i < dataCdl.items.length; i++) {
      listCdl.push([dataCdl.items[i].data['ope_work_center_no'], dataCdl.items[i].data['io']]);
    }
    filtripick.listCdl = listCdl;

    Ext.global.Vars.confMod.main.filtripick = filtripick;
    this.setConfMod();

    store.getProxy().extraParams.filtri = Ext.encode(Ext.global.Vars.confMod.main.filtripick);
    let sorters = store.getSorters();
    for (const sorter of sorters.items) {
      sorters.remove(sorter._id)
    }

    store.load();

  },
  setConfMod: function () {
    this.setConfModRun++;
    let count = this.setConfModRun,
      task = new Ext.util.DelayedTask(function (count) {
        if (count === this.setConfModRun) {
          Ext.Ajax.request({
            method: 'POST',
            params: {
              'data': Ext.encode(Ext.global.Vars.confMod)
            },
            url: Backend.REST_API + 'setconfmod'
          });
        }
      }, this, [count]);
    task.delay(3000);
  },

});
