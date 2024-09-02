Ext.define('skd.view.forms.pick.dettaglio.panel.filtri.Controller', {
  managerViewFiltri: function () {
    let me = this;

    let field_data_ini_preparazione = Ext.create('Ext.ux.DateTimeField', {
      padding: '0 5',
      margin: '2 5',
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.data_pre_prog'),
      format: 'd/m/Y H:i',
      hourText: 'HH',
      minuteText: 'Min',
      width: 320,
      labelWidth: 150,
      startDay: 1,
      name: 'data_ini_preparazione',
      bind: {
        disabled: '{disableDate.inizio_preparazione}',
        value: '{record.data_ini_preparazione}'
      },
      onChange: function (newValue, oldValue, c, d) {
        if (newValue !== '') {
          const y = newValue.substr(6, 4)
          const m = newValue.substr(3, 2)
          const d = newValue.substr(0, 2)
          const h = newValue.substr(11, 2)
          const i = newValue.substr(14, 2)
          const dd = new Date(y, m, d, h, i)
          if (dd.toString() === 'Invalid Date') return
        }
        me.onCheckChangeAwait(this, newValue, 'data_ini_preparazione', oldValue)
      }
    })
    let field_data_ini_effettivo = Ext.create('Ext.ux.DateTimeField', {
      padding: '0 5',
      margin: '2 5',
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.prep_start'),
      format: 'd/m/Y H:i',
      hourText: 'HH',
      minuteText: 'Min',
      width: 320,
      labelWidth: 150,
      startDay: 1,
      name: 'data_ini_effettivo',
      bind: {
        disabled: '{disableDate.inizio_effettivo}',
        value: '{record.data_ini_effettivo}'
      },
      onChange: function (newValue, oldValue) {
        me.onCheckChangeAwait(this, newValue, 'data_ini_effettivo', oldValue)
      }
    })
    let field_data_end_preparazione = Ext.create('Ext.ux.DateTimeField', {
      padding: '0 5',
      margin: '2 5',
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.prep_end'),
      format: 'd/m/Y H:i',
      hourText: 'HH',
      minuteText: 'Min',
      width: 320,
      labelWidth: 150,
      startDay: 1,
      name: 'data_end_preparazione',
      msgTarget: 'side',
      bind: {
        disabled: '{disableDate.fine_preparazione}',
        minValue: '{record.data_ini_effettivo}',
        value: '{record.data_end_preparazione}'
      },
      onChange: function (newValue, oldValue) {
        me.onCheckChangeAwait(this, newValue, 'data_end_preparazione', oldValue)
      }
    })

    let completato_senza_mancanti = Ext.create("Ext.form.field.Checkbox", {
      padding: '0 5',
      margin: '2 5',
      width: 320,
      labelWidth: 180,
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.prep_ok'),
      boxLabel: 'Confermato',
      name: 'completato_senza_mancanti',
      reload_request: true,
      disabled: false,
      bind: {
        disabled: '{disableDate.completato_senza_mancanti}',
        value: '{record.completato_senza_mancanti}'
      },
      listeners: {
        change: 'onCheckCompletato'
      },
      inputValue: 1
    },)

    this.formFiltri.items.items[5].add(field_data_ini_preparazione, field_data_ini_effettivo, field_data_end_preparazione, completato_senza_mancanti)

  },
  showFiltri: function (action) {
    let vm = this.getViewModel();
    if (action === true) {
      this.formFiltri.show();
      Ext.global.Vars.confMod.main.filtripick.active = true;
      // vm.set('filtripick', true);
    } else {
      this.formFiltri.hide();
      Ext.global.Vars.confMod.main.filtripick.active = false;
    }
    vm.set('filtripick', Ext.global.Vars.confMod.main.filtripick);
    this.setConfMod();
  },
  onSelectFilterPartOdp: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridDettPartOdp = vm.getStore('storeGridDettPartOdp');

    combo.clearValue();
    if (!record.data) return;


    for (let i = 0; i < storeGridDettPartOdp.data.length; i++) {
      if (storeGridDettPartOdp.data.items[i].data.part_no === record.data.part_no) return;
    }
    storeGridDettPartOdp.insert(0, record);
  },
  onSelectFilterComp: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridDettComp = vm.getStore('storeGridDettComp');

    combo.clearValue();
    if (!record.data) return;


    for (let i = 0; i < storeGridDettComp.data.length; i++) {
      if (storeGridDettComp.data.items[i].data.part_no === record.data.part_no) return;
    }
    storeGridDettComp.insert(0, record);
  },
  onSelectFilterPickReparto: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridReparto = vm.getStore('storeGridPickReparto');
    combo.clearValue();
    if (!record.data) return;
    let r = record.data;
    for (let i = 0; i < storeGridReparto.data.length; i++) {
      if (storeGridReparto.data.items[i].data.rep_cdl_department_no === record.data.rep_cdl_department_no) return;
    }
    storeGridReparto.insert(0, record);
  },
  onChangeCdlFilter: function (view, rowIndex) {
    let grid = view.up('grid'),
      selection = view.getStore().getAt(rowIndex);

    if (selection.data['io'] === 'in') {
      selection.data['io'] = 'out';
    } else {
      selection.data['io'] = 'in';
    }
    grid.getView().refreshNode(selection);
  },
  onChangeRepartoFilter: function (view, rowIndex) {
    let grid = view.up('grid'),
      selection = view.getStore().getAt(rowIndex);

    if (selection.data['io'] === 'in') {
      selection.data['io'] = 'out';
    } else {
      selection.data['io'] = 'in';
    }
    grid.getView().refreshNode(selection);
  },
  onSelectFilterCdl: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridDettCdl = vm.getStore('storeGridDettCdl');

    combo.clearValue();
    if (!record.data) return;


    for (let i = 0; i < storeGridDettCdl.data.length; i++) {
      if (storeGridDettCdl.data.items[i].data.ope_work_center_no === record.data.ope_work_center_no) return;
    }
    storeGridDettCdl.insert(0, record);
  },
  onRemoveFilter: function (view, rowIndex) {
    view.getStore().removeAt(rowIndex);
  },
  onRemoveFilterPreparatore: function (view, rowIndex) {
    view.getStore().removeAt(rowIndex);

    let vm = this.getViewModel(),
      storeGridPreparatorePick = vm.getStore('storeGridPreparatorePick'),
      list = [];
    for (let i = 0; i < storeGridPreparatorePick.data.length; i++) {
      list.push(storeGridPreparatorePick.data.items[i].data.ope_operatore);
    }
    this.onCheckChange(this.winCombo, list);
  },

  onRemoveFilterStato: function (view, rowIndex) {
    view.getStore().removeAt(rowIndex);

    let vm = this.getViewModel(),
      storeGridStatoPick = vm.getStore('storeGridStatoPick'),
      list = [];
    for (let i = 0; i < storeGridStatoPick.data.length; i++) {
      list.push(storeGridStatoPick.data.items[i].data.stato);
    }
    this.onCheckChange(this.winCombo, list);
  },
  onSelectFilterStato: function (combo, record) {
    let vm = this.getViewModel(),
      storeGridStatoPick = vm.getStore('storeGridStatoPick');
    if (!record.data) return;
    for (let i = 0; i < storeGridStatoPick.data.length; i++) {
      if (storeGridStatoPick.data.items[i].data.stato === record.data.stato) return;
    }
    storeGridStatoPick.insert(0, record);
    this.onChangeStato(combo);
  },
  onChangeComboProducibilita: function () {
    let grid = this.gridDettaglio,
      task;

    task = new Ext.util.DelayedTask(function (grid) {
      grid.getStore().reload();
    }, this, [grid]);
    task.delay(200);
  },
  onChangeStato: function (combo) {
    let vm = this.getViewModel(),
      storeGridStatoPick = vm.getStore('storeGridStatoPick'),
      list = [];
    for (let i = 0; i < storeGridStatoPick.data.length; i++) {
      list.push(storeGridStatoPick.data.items[i].data.stato);
    }
    this.onCheckChange(combo, list);
  },
  onCheckCompletato: function (item) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');
    if (item.checked === false) {
      me.executeUpdateDataMulti(item, false);
    } else {
      this.getView().el.mask('Verifica in corso...');
      Ext.Ajax.request({
        method: 'POST',
        params: {
          _fn: 'checkCompletato',
          lab: record.data['lab']
        },
        url: Backend.REST_API + 'forms/pick/checkcompletato/',
        success: function (response) {
          me.getView().el.unmask();
          try {
            let resp = Ext.decode(response.responseText);
            if (resp['success'] === false) {
              me.errorChangeData(resp['msg']);
            } else {
              if (resp['qta'] > 0) {
                Ext.Msg.show({
                  title: 'ATTENZIONE',
                  msg: 'Esistono delle righe non completamente prelevate o sottoposte a controllo. <br>Aggiornamento non consentito.',
                  buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
                });
                item.setValue(false);
              } else {
                me.executeUpdateDataMulti(item, true);
              }
            }
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
    }
  },
  executeUpdateDataMulti: function (item, newValue) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        id: record.data['id'],
        field: item.name,
        value: newValue
      },
      url: Backend.REST_API + 'forms/pick/changedata/',
      success: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
          }
        } catch (err) {
          me.errorChangeData(err);
        }
        me.checkDateRecord()
      },
      failure: function (o) {
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
  onCheckChange: function (item, newValue) {
    this.executeUpdateData(item, newValue);
  },
  executeUpdateData: function (item, newValue) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        id: record.get('id'),
        field: item.name,
        value: newValue
      },
      url: Backend.REST_API + 'forms/pick/changedata/',
      success: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
          }
          me.dataForm.load();
        } catch (err) {
          me.errorChangeData(err);
        }
      },
      failure: function (o) {
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

})