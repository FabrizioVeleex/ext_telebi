/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerGridNazioni', {
  mixins: [
    'portal.v1.global.Util'
  ],
  generateColumnsNazioni: function () {

    this.logDev('generateColumnsNazioni')
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      store = vm.getStore('storeNazioni');

    // Imposto spinner caricamento
    me.nazioni.setIconCls('fas fa-spinner');
    me.nazioni.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.nazioni.title')} (...)`)

    let columns = [{
      text: Locale.t('stt.forms.budget.analisi.cards.nazioni.columns.cd_naz'),
      width: 70,
      dataIndex: "cd_naz",
    }, {
      text: Locale.t('stt.forms.budget.analisi.cards.nazioni.columns.descr_naz'),
      minWidth: 170,
      flex: 1,
      dataIndex: "desc_naz",
    }];
    for (let anno = filtri.anno.inizio; anno <= filtri.anno.fine; anno++) {
      columns.push({
        text: anno,
        width: 80,
        align: 'end',
        dataIndex: '' + anno,
        xtype: 'numbercolumn', format: '0,000'
      })
    }
    me.gridNazioni.reconfigure(columns);
    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
    store.load();
    store.load(function (records, operation, success) {
      if (!success) {
        Ext.Msg.alert('Attenzione', operation.error.response.responseJson.msg);
        me.nazioni.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.nazioni.title')} (error)`)
      } else {
        me.nazioni.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.nazioni.title')} (${records.length})`)
      }
      // Imposto spinner caricamento
      me.nazioni.setIconCls('fas fa-globe-europe');
    });
  },

  onAfterRenderGridNazioni: function () {
    this.logDev('onAfterRenderGridNazioni')
  },

  onItemDblClickGridNazioni: function (view, record) {
    this.logDev('onItemDblClickGridNazioni')

    let me = this,
      vm = me.getViewModel();

    vm.set('filtri.cd_naz', record.data.cd_naz)
    vm.set('filtri.cd_sogg_fat', null)
    me.emptyStoreArticoli();
    me.onAvviaFiltro();
    me.center.setActiveTab(me.clienti)

  },
  // ------------------------------------------------------------
  // Gestione filtri combo
  onSelectFilterNazione: function (combo, record) {
    this.logDev('onSelectFilterNazione')
    let me = this,
      vm = me.getViewModel();
    vm.set('hidecard.clienti', false);

    vm.set('filtri.cd_sogg_fat', null);
    vm.set('filtri.cd_fam', '');

  },
  onChangeFilterNazione: function (obj, newValue, oldValue) {
    this.logDev('onChangeFilterNazione', newValue, oldValue)
    let me = this,
      vm = me.getViewModel();
    if (this.startInit) {
      this.logDev({ newValue, oldValue })
      this.logDev({ 'nazione': 'start' })
      // vm.set('filtri.cd_naz', '');
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