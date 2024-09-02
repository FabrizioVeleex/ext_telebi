/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerGridClMer', {
  mixins: [
    'portal.v1.global.Util'
  ],
  onAfterRenderGridClMer: function (grid) {
    this.logDev('genero colonne')
  },

  onRemoveFilterClMer: function (view, rowIndex) {
    this.logDev('onRemoveFilterClMer')
    view.getStore().removeAt(rowIndex);
    let vm = this.getViewModel(),
      hide = view.getStore().data.items.length === 0;

    if (hide) {
      vm.set('hidecard.nazionalita', hide)
      vm.set('hidecard.nazioni', hide)
      vm.set('hidecard.regioni', hide)
      vm.set('hidecard.clienti', hide)
    }

    // Aggiorno lista classe merceologica
    let cd_clm = [],
      store = view.getStore();
    for (let x = 0; x < store.data.items.length; x++) {
      cd_clm.push(store.data.items[x].data.cd_clm)
    }
    vm.set('filtri.cd_clm', cd_clm);
  },

  onSelectFilterClMer: function (combo, record) {
    this.logDev('onSelectFilterClMer')
    let vm = this.getViewModel(),
      store = vm.getStore("storeFilterGridClMer"),
      filtri = vm.get('filtri');

    combo.clearValue();
    if (!record.data) return;

    for (let i = 0; i < store.data.length; i++) {
      if (store.data.items[i].data.cd_clm === record.data.cd_clm)
        return;
    }
    store.insert(0, record);

    //--------------------------------------------
    //popolo lista clMer nei filtri
    let cd_clm = []
    for (let x = 0; x < store.data.items.length; x++) {
      cd_clm.push(store.data.items[x].data.cd_clm)
    }
    vm.set('filtri.cd_clm', cd_clm);

    //--------------------------------------------
    // gestione amilitazioni
    vm.set('hidecard.nazionalita', false);

    if (filtri.nazionalita === 'it' && filtri.regione !== '') {
      vm.set('hidecard.regioni', false)
      vm.set('hidecard.nazioni', true)
      vm.set('hidecard.clienti', false)
    }
    if (filtri.nazionalita === 'ee' && filtri.cd_naz !== '') {
      vm.set('hidecard.regioni', true)
      vm.set('hidecard.nazioni', false)
      vm.set('hidecard.clienti', false)
    }

  },
  generateColumnsClMer: function () {
    this.logDev('generateColumnsClMer')
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      store = vm.getStore('storeClMer');

    // Imposto spinner caricamento
    me.clMer.setIconCls('fas fa-spinner');
    me.clMer.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.clmer.title')} (...)`)

    let columns = [{
      text: 'cl.Mer.',
      minWidth: 150,
      flex: 1,
      dataIndex: "cl_mer",
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
    me.gridClMer.reconfigure(columns);
    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
    store.load(function (records, operation, success) {
      if (!success) {
        Ext.Msg.alert('Attenzione', operation.error.response.responseJson.msg);
        me.clMer.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.clmer.title')} (error)`)
      } else {
        me.clMer.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.clmer.title')} (${records.length})`)
      }
      // Imposto spinner caricamento
      me.clMer.setIconCls('fas fa-layer-group');
    });
  }
})