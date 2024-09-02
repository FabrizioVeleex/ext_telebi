/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerGridArticoliDettaglio', {
  mixins: [
    'portal.v1.global.Util'
  ],
  generateColumnsArticoliDettaglio: function (record) {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      store = vm.getStore('storeArticoliDettaglio');

    let cliente = '';
    if (filtri.cd_sogg_fat) {
      cliente = filtri.cd_sogg_fat
    }
    // Imposto spinner caricamento
    let cl = Locale.t('stt.forms.budget.analisi.cards.articoli.columns.cliente')
    let ar = Locale.t('stt.forms.budget.analisi.cards.articoli.columns.cd_art')
    me.south.setIconCls('fas fa-spinner');
    me.south.setTitle(` ${cl}: ${cliente}, ${ar}: ${+ record.data.cd_art}  - ${record.data.descr_art} (...)`)

    let columns = [{
      text: Locale.t('stt.forms.budget.analisi.cards.articoli.columns.year'),
      width: 150,
      dataIndex: "year",
    },];

    for (let mese = 1; mese <= 12; mese++) {
      let m = mese < 10 ? '0' + mese : '' + mese;
      columns.push({
        text: Locale.t(`global.calendar.mese.${m}`),
        width: 70,
        align: 'end',
        dataIndex: '' + m,
        xtype: 'numbercolumn', format: '0,000'
      })
    }
    me.gridArticoliDettaglio.reconfigure(columns);
    filtri.cd_art = record.data.cd_art;
    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
    store.load();
    store.load(function (records, operation, success) {
      if (!success) {
        Ext.Msg.alert('Attenzione', operation.error.response.responseJson.msg);
        me.south.setTitle(`${cl}: ${cliente}, ${ar}: (error)`)
      } else {
        me.south.setTitle(`${cl}: ${cliente}, ${ar}:${+ record.data.cd_art}  - ${record.data.descr_art}`)
      }
      // Imposto spinner caricamento
      me.south.setIconCls('fas fa-list-ul');
    });
  },

  emptyStoreArticoliDettaglio: function () {
    this.logDev('emptyStoreArticoliDettaglio')
    let me = this,
      vm = me.getViewModel(),
      storeArticoliDettaglio = vm.getStore('storeArticoliDettaglio');

    storeArticoliDettaglio.loadData([], false);
    // me.articoli.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.articoli.title')} (--)`)
  },
  onAfterRenderGridArticoliDettaglio: function () {
    this.logDev('onAfterRenderGridArticoliDettaglio')
  },


})