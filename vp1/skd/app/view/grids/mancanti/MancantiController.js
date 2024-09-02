/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.mancanti.MancantiController', {
  extend: 'skd.view.grids.GridsController',
  alias: 'controller.mancanti',

  requires: [
    'Ext.form.field.TextArea',
    'Ext.grid.column.Action',
    'skd.model.grids.mancanti.Mancanti',
    'skd.store.grids.mancanti.Mancanti',
    'skd.view.grids.mancanti.Grid'
  ],
  mixins: ['portal.v1.global.Util'],
  /**
   * Called when the view is created
   */

  onAfterRender: function () {
    this.callParent(arguments);
    // this.getViewModel().set('widthNote', Ext.global.Vars.confMod.main.filtriCdl.widthNote);
  },
  onActivate: function () {
    this.callParent(arguments);
    this.setToolBar();
  },
  /* ---------------------------------------------------------------------------------------------------------
   * Gestione visualizzazione tasti
   * ---------------------------------------------------------------------------------------------------------*/
  setToolBar: function () {
    this.toolBarCenter.removeAll();

    this.toolBarCenter.add(
      this.btnReloadGrid
    );

    this.callParent(arguments);
  },

  onLoadGrid: function () {
    this.getView().fireEvent('loadDataGrid', this.getView().id, true);
  },

  onRenderQtyValue: function (value) {
    return Ext.util.Format.number(value, '0,000.0');
  },
  onPrepareStoreData: function (resp) {
    this.onAfterLoadDataGrid(resp);
  },
  onAfterLoadDataGrid: function (resp) {
    this.getView().removeAll();

    this.storeMancanti = Ext.create('skd.store.grids.mancanti.Mancanti', {
      model: 'skd.model.grids.mancanti.Mancanti',
      data: resp.data
    });

    this.grid = Ext.create('skd.view.grids.mancanti.Grid', {
      store: this.storeMancanti
    });

    this.getView().add(this.grid);
    this.getView().el.unmask();
  },

  onCellSelect: function (cellmodel, record, row, column) {
    //click su colonna info stato
    if (column < 2) {
      return;
    }
    let me = this,
      header = cellmodel.view.up().columns,
      dataIndex = header[column].dataIndex,
      cell = record.get(dataIndex);

  },
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
    if (value !== null) {
      if (value % 1 !== 0) {
        return value.toFixed(2);
      }
    }
    return value;
  },
  onOpenMaterialiGrid: function (view, rowIndex, colIndex, item, opt, record) {
    let grid = view.up('grid');
    record.data['contract'] = "GOMA";
    record.data['part_no'] = record.data['component_part'];
    this.getView().fireEvent('openWinMateriali', view, record);
  },
  onClickActionMonitoring: function (grid, rowIndex, colIndex, item, opt, record) {
    if (!this.checkRuoli(['11'])) {
      return;
    }
    if (record.get('completato_senza_mancanti') === 1) {
      return
    }
    let me = this,
      // record = grid.getStore().getAt(rowIndex),
      vm = me.getViewModel(),
      azione = 'add';

    if (record.get('data_ini_contr_ric') !== null) {
      azione = 'remove';
    }

    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        sc_op_lab: record.data['lab'],
        component: record.data['component_part'],
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
            me.aggiornaDataGridCheck(record.data['component_part'], resp['data'], record.data['lab'])
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
  aggiornaDataGridCheck: function (component, value, lab) {
    let store = this.storeMancanti,
      list = store.data.items,
      tot = list.length,
      i;

    for (i = 0; i < tot; i++) {
      if (list[i].data['component_part'] === component && list[i].data['lab'] === lab) {
        list[i].data['data_ini_contr_ric'] = value;
        list[i].commit();

      }
    }
  },
  onClickActionQtyDown: function (view, rowIndex, colIndex, item, opt, record) {
    this.updateQtaPreparata(record, 0);
  },
  onClickActionQtyUp: function (view, rowIndex, colIndex, item, opt, record) {
    this.updateQtaPreparata(record, record.get('mat_per_lab'));

  },
  updateQtaPreparata: function (record, value) {
    let me = this,
      vm = me.getViewModel();

    let checkRuoli = function (ruoli) {
      if (!Ext.global.Vars.infoApp && !Ext.global.Vars.infoApp.ruoli) return false
      for (let r of Ext.global.Vars.infoApp.ruoli) {
        if (ruoli.filter(el => el === r.valore).length > 0) {
          return true
        }
      }
      return false
    }
    if (!checkRuoli(['11'])) {
      return
    }

    // if (record.get('completato_senza_mancanti') === 1) {
    //   return
    // }
    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        sc_op_lab: record.data['lab'],
        mat_per_lab: record.data['mat_per_lab'],
        component: record.data['component_part'],
        value: value
      },
      url: Backend.REST_API + 'forms/pick/changeqtapreparata/',
      success: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
          } else {
            record.set('qta_preparata', resp['qta']);
            record.commit();
            me.aggiornaDataGrid(record.data['component_part'], value, record.data['mat_per_lab'], record.data['lab']);


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
  aggiornaDataGrid: function (component, value, mat_per_lab, lab) {
    let store = this.storeMancanti,
      list = store.data.items,
      tot = list.length,
      i;

    for (i = 0; i < tot; i++) {
      if (list[i].data['component_part'] === component && list[i].data['lab'] === lab) {
        if (value === null) {
          list[i].data['qta_mancante'] = null;
        } else {
          list[i].data['qta_mancante'] = mat_per_lab - value;
        }
        list[i].data['qta_preparata'] = value;
        list[i].commit();
      }
    }
  },


  onChangeDettaglio: function (campo, value) {

    let me = this,
      vm = me.getViewModel(),
      recordStore = this._selectedRecord;

    if (vm.get('disableUpdate') === true) {
      return;
    }

    // if (campo.identificativo_name === 'qta_preparata') {
    let v = recordStore.data['mat_per_lab'];
    if (recordStore.data['onhand'] > recordStore.data['mat_per_lab']) {
      v = recordStore.data['onhand'];
    }
    // if (value > v) {
    //   value = null;
    // }
    // }
    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        sc_op_lab: recordStore.data['lab'],
        component: recordStore.data['component_part'],
        mat_per_lab: recordStore.data['mat_per_lab'],
        field: 'qta_preparata',
        value: value
      },
      url: Backend.REST_API + 'forms/pick/changedettaglio/',
      success: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
          } else {
            recordStore.commit();
            // if (campo.identificativo_name === 'qta_preparata') {
            me.aggiornaDataGrid(recordStore.data['component_part'], value, recordStore.data['mat_per_lab'], recordStore.data['lab']);
            // }
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
  errorChangeData: function (err) {
    Ext.Msg.show({
      title: 'ATTENZIONE', //Locale.t('skd.forms.footer.connection.title'),
      msg: err,
      buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
    });
  },

});
