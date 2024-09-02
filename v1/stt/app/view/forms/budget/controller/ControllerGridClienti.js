/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerGridClienti', {
  mixins: [
    'portal.v1.global.Util'
  ],
  generateColumnsClienti: function () {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      store = vm.getStore('storeClienti');


    // Imposto spinner caricamento
    me.clienti.setIconCls('fas fa-spinner');
    me.clienti.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.clienti.title')} (...)`)


    let columns = [
      {
        xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
        items: [{
          getClass: function (view, meta, record) {
            if (record.get('associazione') !== '') {
              meta.tdAttr = `data-qtip="${Locale.t('stt.forms.budget.analisi.cards.clienti.lista')} <hr>${record.get('associazione')}"`;
              return 'x-fas x-fas fa-info-circle bd-color-blue bd-action-null';
            }
            return 'bd-action-null';
          },
        }]
      },
      {
        text: Locale.t('stt.forms.budget.analisi.cards.clienti.columns.cd_sogg_fat'),
        width: 70,
        dataIndex: "cd_sogg_fat",
      }, {
        text: Locale.t('stt.forms.budget.analisi.cards.clienti.columns.rag_soc'),
        minWdth: 170,
        flex: 1,
        dataIndex: "rag_soc",
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
    me.gridClienti.reconfigure(columns);
    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
    store.load();
    store.load(function (records, operation, success) {
      if (!success) {
        Ext.Msg.alert('Attenzione', operation.error.response.responseJson.msg);
        me.clienti.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.clienti.title')} (error)`)
      } else {
        me.clienti.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.clienti.title')} (${records.length})`)
      }
      // Imposto spinner caricamento
      me.clienti.setIconCls('fas fa-industry');
    });
  },
  onAfterRenderGridClienti: function () {
    this.logDev('onAfterRenderGridClienti')
  },

  onItemDblClickGridClienti: function (view, record) {
    this.logDev('onItemDblClonItemDblClickGridClientiickGridNazioni')

    let me = this,
      vm = me.getViewModel();

    vm.set('filtri.cd_sogg_fat', record.data.cd_sogg_fat)
    me.onAvviaFiltro();
    me.center.setActiveTab(me.articoli)

  },
  // COMBO CLIENTI
  onBeforeLoadFiltriClienti: function (store, operation) {
    this.logDev('onBeforeLoadClienti')
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri')

    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
  },
  emptyStoreClienti: function () {
    this.logDev('emptyStoreClienti')
    let me = this,
      vm = me.getViewModel(),
      storeClienti = vm.getStore('storeClienti');

    storeClienti.loadData([], false);
    me.clienti.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.clienti.title')} (--)`)
  },
  onSelectFilterCliente: function (combo, record) {
    this.logDev('onSelectFilterCliente')
    let me = this,
      vm = me.getViewModel();

    vm.set('filtri.cd_sogg_fat', record.data.cd_sogg_fat);
    vm.set('hidecard.articoli', false);
    vm.set('hidecard.famiglia', false);

  },
  onChangeFilterCliente: function (obj, newValue, oldValue) {
    this.logDev('onChangeFilterCliente')
    let me = this,
      vm = me.getViewModel();
    if (this.startInit) {
      vm.set('filtri.cd_sogg_fat', null);
      vm.set('hidecard.articoli', true);
      vm.set('hidecard.famiglia', true);
      return
    }

    if (newValue === null) {
      vm.set('filtri.cd_sogg_fat', null);
      vm.set('hidecard.famiglia', true);
    } else {
      vm.set('hidecard.famiglia', false);
    }
  },

  // COMBO FAMIGLIA
  onBeforeLoadFiltriFamiglie: function (store, operation) {
    this.logDev('onBeforeLoadFamiglia')
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri')

    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
  },
  onSelectFilterFamiglie: function (combo, record) {
    this.logDev('onSelectFilterFamiglie')

  },
  onChangeFilterFamiglie: function (obj, newValue, oldValue) {
    this.logDev('onChangeFilterFamiglie')
    let me = this,
      vm = me.getViewModel();
    if (newValue === null) {
      vm.set('filtri.cd_fam', '');
    }
  },
})