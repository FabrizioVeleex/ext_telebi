/**
 * Created by luke on 12/02/21.
 */
Ext.define('ana.view.forms.parametri.Model', {
  extend: 'portal.v1.view.forms.mainCard.Model',
  alias: 'viewmodel.v1-parametri',
  requires: [
    'ana.store.forms.parametri.ComboGruppo',
    'portal.v1.store.forms.combo.GetUsers'
  ],

  stores: {
    comboUtente: {type: 'v1-getusers'}, //store combo resp commerciale IT
    comboUtente2: {type: 'v1-getusers'}, //store combo resp commerciale EE
    comboGruppo:{type:'v1-combogruppo'}, //store combo ruolo funzionale notifica utenti
    comboAnomalie:{type:'v1-combogruppo'} //store combo ruolo funzionale notifica utenti
  }
});
