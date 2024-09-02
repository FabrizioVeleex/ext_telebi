Ext.define('skd.view.forms.pick.dettaglio.panel.form.Controller', {
  onActivate: function () {
    let me = this;
    if (this.isLoaded === false) {
      me.getView().fireEvent('firstRender', me.getView());
      me.isLoaded = true;
    }
  },

  // ------------------------------------------------------------------
  //richiamato da data_check_giac
  onChangeDettaglioDate: function (campo, newValue) {
    if (newValue !== null) {
      if (!campo.isValid()) {
        return;
      }
    }
    let me = this,
      vm = me.getViewModel(),
      recordForm = vm.get("recordForm");

    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        sc_op_lab: recordForm.get('sc_op_lab'),
        component: recordForm.get('component'),
        field: campo.name,
        value: newValue
      },
      url: Backend.REST_API + 'forms/pick/changedettaglio/',
      success: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
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

  // ------------------------------------------------------------------
  // richiamato da qta_preparata e da nota 
  onChangeDettaglio: function (campo, value) {

    let me = this,
      vm = me.getViewModel(),
      recordForm = vm.get("recordForm"),
      disableUpdate = vm.get('disableUpdate');

    // eccezzione ricalco su click, viene effettuata solo de la qta_preparata varia
    let updateQta = true;
    if (disableUpdate === true) return;

    //TODO intercettare quando viene selzionato magari non cambia e non eseguire
    if (campo.name === 'qta_preparata') {
      updateQta = value !== recordForm.get("qta_preparata")

      if (this.updateQta) {
        updateQta = true;
        this.updateQta = false;
      }
      if (updateQta) {
        vm.set("alertMaxValue", "");
        vm.set("fielLabelqta_preparata", "");
        if (!campo.validate()) return;

      }

    }

    if (updateQta) {
      Ext.Ajax.request({
        method: 'POST',
        jsonData: {
          sc_op_lab: recordForm.get('sc_op_lab'),
          component: recordForm.get('component'),
          mat_per_lab: recordForm.get('mat_per_lab'),
          field: campo.name,
          value: value
        },
        url: Backend.REST_API + 'forms/pick/changedettaglio/',
        success: function (response) {
          try {
            let resp = Ext.decode(response.responseText);
            if (resp['success'] === false) {
              me.errorChangeData(resp['msg']);
            } else {
              if (campo.name === 'qta_preparata') {
                me.aggiornaDataGrid(recordForm.get('component'), value, recordForm.get('mat_per_lab'), campo.name);
              }
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

    }
  },

  // ------------------------------------------------------------------
  // Gestione azioni qta preparata
  onClickActionQtyDown: function () {
    this.onClickActionQty(0);
  },
  onClickActionQtyUp: function () {
    let me = this,
      vm = me.getViewModel(),
      recordForm = vm.get('recordForm');
    this.onClickActionQty(recordForm.get('mat_per_lab'));
  },
  onClickActionQty: function (value) {
    let me = this,
      vm = me.getViewModel(),
      recordForm = vm.get('recordForm');

    this.updateQta = true;
    Ext.Ajax.request({
      method: 'POST',
      jsonData: {
        sc_op_lab: recordForm.get('sc_op_lab'),
        mat_per_lab: recordForm.get('mat_per_lab'),
        component: recordForm.get('component'),
        value: value
      },
      url: Backend.REST_API + 'forms/pick/changeqtapreparata/',
      success: function (response) {
        try {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === false) {
            me.errorChangeData(resp['msg']);
          } else {
            recordForm.set('qta_preparata', resp['qta']);


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
  aggiornaDataGrid: function (component, value, mat_per_lab, campo = "") {
    let me = this,
      vm = me.getViewModel(),
      store = vm.getStore("store"),
      recordForm = vm.get("recordForm"),
      list = store.data.items,
      tot = list.length,
      i;

    for (i = 0; i < tot; i++) {
      if (list[i].data.component === component) {
        if (value === null) {
          list[i].data['qta_mancante'] = null;
        } else {
          list[i].data['qta_mancante'] = mat_per_lab - value;
        }
        list[i].data['qta_preparata'] = value;
        list[i].commit();
      }
    }


    if (campo === 'qta_preparata') {
      vm.set("alertMaxValue", "");
      vm.set("fielLabelqta_preparata", "");
      if (value !== null) {
        let fielLabelqta_preparata = "";
        let alertMaxValue = "";
        if (recordForm.get('qta_preparata') > recordForm.get("disponibile")) {
          alertMaxValue = "y-alert-maxvalue_1"
          fielLabelqta_preparata = "[Qta maggiore disp.]";
        }
        if (recordForm.get('mat_per_lab') - value < 0) {
          alertMaxValue = "y-alert-maxvalue"
          fielLabelqta_preparata = "[Oltre valore max]";
        }
        vm.set("fielLabelqta_preparata", fielLabelqta_preparata);
        vm.set("alertMaxValue", alertMaxValue);
        recordForm.set('qta_mancante', recordForm.get('mat_per_lab') - value)
      } else {
        recordForm.set('qta_mancante', null)
        recordForm.set('qta_preparata', null)
      }
    }
  }
})