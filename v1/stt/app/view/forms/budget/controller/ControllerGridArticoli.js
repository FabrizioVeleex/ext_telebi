/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerGridArticoli', {
  mixins: [
    'portal.v1.global.Util'
  ],
  generateColumnsArticoli: function () {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      store = vm.getStore('storeArticoli');

    // Imposto spinner caricamento
    me.articoli.setIconCls('fas fa-spinner');
    me.articoli.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.articoli.title')} (...)`)

    let columns = [{
      text: Locale.t('stt.forms.budget.analisi.cards.articoli.columns.cd_art'),
      width: 150,
      dataIndex: "cd_art",
    }, {
      text: Locale.t('stt.forms.budget.analisi.cards.articoli.columns.descr_art'),
      minWdth: 170,
      flex: 1,
      dataIndex: "descr_art",
    }];
    if (filtri.cd_fam === null) {
      columns.push({
        text: Locale.t('stt.forms.budget.analisi.cards.articoli.columns.cd_fam'),
        width: 80,
        dataIndex: 'cd_fam',
      })
    }
    for (let anno = filtri.anno.inizio; anno <= filtri.anno.fine; anno++) {
      columns.push({
        text: anno,
        width: 80,
        align: 'end',
        dataIndex: '' + anno,
        xtype: 'numbercolumn', format: '0,000'
      })
    }

    me.gridArticoli.reconfigure(columns);
    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
    store.load();
    store.load(function (records, operation, success) {
      if (!success) {
        Ext.Msg.alert('Attenzione', operation.error.response.responseJson.msg);
        me.articoli.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.articoli.title')} (error)`)
      } else {
        me.articoli.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.articoli.title')} (${records.length})`)
      }
      // Imposto spinner caricamento
      me.articoli.setIconCls('fas fa-box');
    });
  },

  emptyStoreArticoli: function () {
    this.logDev('emptyStoreArticoli')
    let me = this,
      vm = me.getViewModel(),
      storeArticoli = vm.getStore('storeArticoli');

    storeArticoli.loadData([], false);
    me.articoli.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.articoli.title')} (--)`)
  },
  onAfterRenderGridArticoli: function () {
    this.logDev('onAfterRenderGridArticoli')
  },
  onItemClickGridArticoli: function (view, record) {
    this.logDev('onItemClickGridArticoli')

    this.generateColumnsArticoliDettaglio(record)
    this.logDev({ 'record': record })

  }
})