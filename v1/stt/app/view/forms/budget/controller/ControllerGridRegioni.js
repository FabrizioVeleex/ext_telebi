/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerGridRegioni', {
  mixins: [
    'portal.v1.global.Util'
  ],
  generateColumnsRegioni: function () {
    this.logDev('generateColumnsRegioni')
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      store = vm.getStore('storeRegioni');

    // Imposto spinner caricamento
    me.regioni.setIconCls('fas fa-spinner');
    me.regioni.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.regioni.title')} (...)`)

    let columns = [{
      text: Locale.t('stt.forms.budget.analisi.cards.regioni.columns.regione'),
      monWidth: 150,
      flex: 1,
      dataIndex: "regione",
    },];
    for (let anno = filtri.anno.inizio; anno <= filtri.anno.fine; anno++) {
      columns.push({
        text: anno,
        width: 80,
        align: 'end',
        dataIndex: '' + anno,
        xtype: 'numbercolumn', format: '0,000'
      })
    }
    me.gridRegioni.reconfigure(columns);
    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
    store.load();
    store.load(function (records, operation, success) {
      if (!success) {
        Ext.Msg.alert('Attenzione', operation.error.response.responseJson.msg);
        me.regioni.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.regioni.title')} (error)`)
      } else {
        me.regioni.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.regioni.title')} (${records.length})`)
      }
      // Imposto spinner caricamento
      me.regioni.setIconCls('fas fa-map-marker-alt');
    });
  },

  onAfterRenderGridRegioni: function () {
    this.logDev('onAfterRenderGridRegioni')
  },
  onItemDblClickGridRegioni: function (view, record) {
    this.logDev('onItemDblClickGridRegioni')

    let me = this,
      vm = me.getViewModel();

    vm.set('filtri.regione', record.data.regione)
    vm.set('filtri.cd_sogg_fat', null)
    me.emptyStoreArticoli();
    me.onAvviaFiltro();
    me.center.setActiveTab(me.clienti)

  },
  // ------------------------------------------------------------
  // Gestione filtri combo
  onSelectFilterRegioni: function (combo, record) {
    this.logDev('onSelectFilterRegione')
    let me = this,
      vm = me.getViewModel();
    vm.set('hidecard.clienti', false);

    vm.set('filtri.cd_sogg_fat', null);
    vm.set('filtri.cd_fam', '');

  },
  onChangeFilterRegioni: function (obj, newValue, oldValue) {
    this.logDev('onChangeFilterRegione', newValue, oldValue)
    let me = this,
      vm = me.getViewModel();
    if (this.startInit) {
      vm.set('filtri.cd_sogg_fat', null);
      vm.set('filtri.cd_fam', '');

      vm.set('hidecard.clienti', true);
      vm.set('hidecard.articoli', true);
      me.emptyStoreClienti();
      me.emptyStoreArticoli();
    }

    // if (newValue === null && oldValue !== null) {
    //   vm.set('filtri.cd_naz', '');
    //   vm.set('filtri.cd_sogg_fat', '');
    //   vm.set('filtri.cd_fam', '');

    //   vm.set('hidecard.clienti', true);
    //   me.emptyStoreClienti();
    //   me.emptyStoreArticoli();
    //   me.center.setActiveTab(me.nazioni)
    // }
  }
})