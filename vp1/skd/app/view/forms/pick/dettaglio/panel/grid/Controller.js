Ext.define('skd.view.forms.pick.dettaglio.panel.grid.Controller', {

  onOpenMaterialiGrid: function (view, rowIndex, colIndex, item, opt, record) {
    let card = this.getView().up('panel');
    record.data['contract'] = record.data['sc_op_contract'];
    record.data['part_no'] = record.data['component'];
    card.fireEvent('openMateriali', view, record);
  },


  onSelectionChange: function (view, record) {
    let vm = this.getViewModel();
    if (record) {
      vm.set('recordForm', record);
    } else {
      vm.set('recordForm', null);
    }
  },


  //---------------------------------------
  onRedererMancante: function (value, metaData, rec) {
    let qta_mancante = rec.get('qta_mancante');
    let qta_preparata = rec.get('qta_preparata');
    let mat_per_lab = rec.get('mat_per_lab');

    switch (true) {
      case qta_preparata === null: //TODO verifica quando modifichi
        metaData.tdCls = '';
        break;
      case qta_mancante === 0:
        metaData.tdCls = ' cell_giacenza_positiva';
        break;
      case qta_mancante === mat_per_lab:
        metaData.tdCls = ' cell_giacenza_negativa';
        break;
      case qta_mancante < 0:
        metaData.tdCls = ' cell_giacenza_arancione';
        break;
      case qta_mancante > 0:
        metaData.tdCls = ' cell_giacenza_gialla';
        break;
      default:
        break;
    }
    // if (value !== null) {
    //   if (value % 1 !== 0) {
    //     return value.toFixed(2);
    //   }
    // }
    return value;
  },

  //-----------------------------------------------------
  // azione da orologio in grid
  onClickActionMonitoring: function (view, rowIndex, colIndex, item, opt, record) {
    if (!this.checkRuoli(['11'])) {
      return;
    }
    let me = this,
      vm = me.getViewModel(),
      disableUpdate = vm.get("disableUpdate"),
      azione = 'add';

    vm.set("recordForm", record);
    if (disableUpdate) return;
    if (record.get('data_ini_contr_ric') !== null) {
      azione = 'remove';
    }

    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        sc_op_lab: record.data['sc_op_lab'],
        component: record.data['component'],
        azione: azione
      },
      params: {
        _fn: 'changeDataCheck'
      },
      url: Backend.REST_API + 'forms/pick/changedatacheck/',
      success: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
          } else {
            me.aggiornaDataGridCheck(record.data['component'], resp['data'])
            record.set('data_ini_contr_ric', resp['data']);
          }
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
  aggiornaDataGridCheck: function (component, value) {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("store"),
      list = store.data.items,
      tot = list.length,
      i;

    for (i = 0; i < tot; i++) {
      if (list[i].data['component'] === component) {
        list[i].data['data_ini_contr_ric'] = value;
        list[i].commit();
      }
    }
  },

})