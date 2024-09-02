/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerGridNazionalita', {
  mixins: [
    'portal.v1.global.Util'
  ],
  generateColumnsNazionalita: function () {
    this.logDev('generateColumnsNazionalita')
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      store = vm.getStore('storeNazionalita');

    // Imposto spinner caricamento
    me.nazionalita.setIconCls('fas fa-spinner');
    me.nazionalita.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.nazionalita.title')} (...)`)

    let columns = [{
      text: Locale.t('stt.forms.budget.analisi.cards.nazionalita.columns.nazionalita'),
      minWidth: 150,
      flex: 1,
      dataIndex: "nazionalita",
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
    me.gridNazionalita.reconfigure(columns);
    store.getProxy().extraParams.filtri = JSON.stringify(filtri);
    store.load();
    store.load(function (records, operation, success) {
      if (!success) {
        Ext.Msg.alert('Attenzione', operation.error.response.responseJson.msg);
        me.nazionalita.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.nazionalita.title')} (error)`)
      } else {
        me.nazionalita.setTitle(`${Locale.t('stt.forms.budget.analisi.cards.nazionalita.title')} (${records.length})`)
      }
      // Imposto spinner caricamento
      me.nazionalita.setIconCls('fas fa-globe');
    });
  },

  onAfterRenderGridNazionalita: function () {
    this.logDev('onAfterRenderGridNazionalita')
  },
  // -----------------------------------------------------
  // Cambio nazionalità
  onChangeNazionalita: function (obj, newValue, oldValue) {
    this.logDev('onChangeNazionalita', newValue, oldValue)
    if (this.startInit === true) return; // prima apertura con radio non valorizzato 
    // if (oldValue === undefined) return; // prima apertura old undefined

    let me = this,
      vm = me.getViewModel(),
      hidecard = vm.get('hidecard'),
      filtri = vm.get('filtri');

    me.emptyStoreClienti();
    vm.set('filtri.cd_sogg_fat', null);
    vm.set('filtri.cd_fam', '');
    vm.set('filtri.cd_naz', '');
    vm.set('filtri.regione', '');

    vm.set('filtri.nazionalita', newValue);

    hidecard.clienti = true;
    hidecard.articoli = true;
    if (newValue === 'it') {
      hidecard.nazioni = true;
      hidecard.regioni = false;
    } else if (newValue === 'ee') {
      hidecard.nazioni = false;
      hidecard.regioni = true;
      if (filtri.cd_naz !== '') {
        hidecard.clienti = false;
      }
    } else {
      hidecard.nazioni = true;
      hidecard.regioni = true;
      if (filtri.regioni !== '') {
        hidecard.clienti = false;
      }
    }
    vm.set('hidecard', hidecard);

    let task = new Ext.util.DelayedTask(function (count) {
      if (!hidecard.nazioni) {
        me.center.setActiveTab(me.nazioni)
      }
      if (!hidecard.regioni) {
        me.center.setActiveTab(me.regioni)
      }
    }, me, [hidecard])
    task.delay(250);
  },

})