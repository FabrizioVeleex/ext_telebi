/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.budget.controller.ControllerFiltri', {
  mixins: [
    'portal.v1.global.Util'
  ],
  toggleFiltri: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      hidecard = vm.get('hidecard');
    vm.set('hidecard.filtri', !hidecard.filtri);
  },

  // ------------------------------------------------------------
  // riciamato da init controller

  onInitControllerFromFiltri: function () {
    let me = this,
      vm = me.getViewModel()

    this.annoCorrente = parseInt(Ext.Date.format(new Date(), 'Y'));

    if (!Ext.global.Vars.confMod.forms.budget || !Ext.global.Vars.confMod.forms.budget[this.getView().itemId]) {
      Ext.global.Vars.confMod.forms.budget = {
        [this.getView().itemId]: {
          filtri: {
            anno: {
              inizio: this.annoCorrente - 5,
              fine: this.annoCorrente,
            },
            cd_clm: [],
            nazionalita: 'it',
            regioni: '',
            nazioni: '',
            cd_naz: '',
            cd_sogg_fat: null,
            cd_fam: null
          }
        }
      }
      this.setConfMod();
    }
    // verifico valori filtri
    let filtri = Ext.global.Vars.confMod.forms.budget[this.getView().itemId].filtri;

    // delete Ext.global.Vars.confMod.forms.budget[this.getView().itemId].filtri.cl_mer
    // Ext.global.Vars.confMod.forms.budget[this.getView().itemId].filtri.cd_sogg_fat = '';


    Ext.global.Vars.confMod.forms.budget[this.getView().itemId].filtri = filtri;
    vm.set('filtri', filtri);
    this.logDev({ 'filtri': filtri })
  },

  // ############################################################
  // Prima apertura pannello
  onAfterRenderNoth: function () {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri');

    // Gestione caricamenti selettivi
    this.filtroOld = {
      anno: {
        inizio: 0,
        fine: 0
      },
      cd_clm: [],
      nazionalita: '',
      cd_naz: '',
      regione: '',
      cd_sogg_fat: null,
      cd_fam: null
    }
    // Popolo filtri su grid classe merceologica
    if (filtri.cd_clm.length > 0) {
      let store = vm.getStore('storeFilterGridClMer');
      for (let x = 0; x < filtri.cd_clm.length; x++) {
        store.add({ cd_clm: filtri.cd_clm[x] });
      }
    }

    // abllito nazionalita
    if (filtri.cd_clm.length > 0) {
      vm.set('hidecard.nazionalita', false);
    }

    // abllito clienti
    if (filtri.cd_naz !== '') {
      vm.set('hidecard.clienti', false);
      vm.set('hidecard.aritcoli', false);
    }
    vm.set('filtri.cd_art', '')
    vm.set('filtri.cd_sogg_fat', null)
  },

  // -----------------------------------------------------
  // Gesione ricarica informazioni form 
  onAvviaFiltro: function () {
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      hidecard = vm.get('hidecard'),
      id = vm.get('id');


    // GESTIONE CARICAMENTI SELETTIVI
    //--------------------------------------------
    // Avvio rigenerazione colonne grid clMer
    if (this.filtroOld.anno.inizio !== filtri.anno.inizio || this.filtroOld.anno.fine !== filtri.anno.fine) {
      me.generateColumnsClMer(filtri)
      this.filtroOld.anno.inizio = filtri.anno.inizio
      this.filtroOld.anno.fine = filtri.anno.fine
    }

    //--------------------------------------------
    // Avvio rigenerazione colonne grid nazionalita
    if (filtri.cd_clm.length > 0) {
      me.generateColumnsNazionalita(filtri)
    }

    //--------------------------------------------
    // Avvio rigenerazione colonne grid nazioni
    if (filtri.cd_clm.length > 0 && filtri.nazionalita) {
      if (filtri.nazionalita === 'it') {
        hidecard.nazioni = true;
        hidecard.regioni = false;
        //TODO gestire ricaricamento selettivo
        me.generateColumnsRegioni(filtri)
      } else {
        hidecard.nazioni = false;
        hidecard.regioni = true;
        //TODO gestire ricaricamento selettivo
        me.generateColumnsNazioni(filtri)
      }

    } else {
      hidecard.nazioni = true;
      hidecard.regioni = true;
      hidecard.cllienti = true;
    }


    //--------------------------------------------
    // Avvio rigenerazione colonne grid clienti
    if (filtri.cd_clm.length > 0 && filtri.nazionalita && filtri.cd_naz !== '') {
      hidecard.clienti = false;
      me.generateColumnsClienti(filtri);
    }

    //--------------------------------------------
    // Avvio rigenerazione colonne grid articoli
    if (filtri.cd_clm.length > 0 && filtri.nazionalita && filtri.cd_naz !== '' && filtri.cd_sogg_fat) {
      this.logDev({ 'filtri.clienti': filtri.clienti })
      hidecard.articoli = false;
      me.generateColumnsArticoli(filtri)
    }

    // Setto visibilità
    vm.set('hidecard', hidecard)
    this.logDev(hidecard)

    //--------------------------------------------
    // salvo impostazione filtri
    Ext.global.Vars.confMod.forms.budget[id].filtri = filtri;
    this.setConfMod();
  },

  // -----------------------------------------------------
  // resetto filtro
  onAnnullaFiltro: function () {
    this.logDev('anulli filtro');
    let me = this,
      vm = me.getViewModel(),
      filtri = vm.get('filtri'),
      storeFiltriClMer = vm.getStore('storeFilterGridClMer');

    storeFiltriClMer.loadData([], false);
    vm.set('filtri', {
      ...filtri,
      cd_clm: [],
      nazionalita: '',
      cd_naz: '',
      regione: '',
      cd_sogg_fat: null
    })

    vm.set('hidecard', {
      clmer: false,
      nazionalita: true,
      nazioni: true,
      regioni: true,
      tipologia: true,
      clienti: true,
      famiglia: true,
      articoli: true,
      flitri: false,
      south: true
    })
    this.onAvviaFiltro()
  },

})