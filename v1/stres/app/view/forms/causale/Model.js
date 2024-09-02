/**
 * Created by luca on 16/07/2018.
 */
Ext.define('stres.view.forms.causale.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stres-causale',

    requires: [
        'stres.store.forms.causale.GridStore'
    ],
    stores: {
        storeCausali:{type:'v1-stres-causale'}, //store resi x cliente
     //   clientiStore:{type:'v1-stcom-clienti'}, //filtro cliente
       // nazioneStore:{type:'v1-stcom-nazione'}, //filtro nazione
       // regioneStore:{type:'v1-stcom-regione'}, //filtro regione

    }
})