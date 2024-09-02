/**
 * Created by luca on 07/11/2016.
 */
Ext.define('gpr.store.grids.immagini.Veicolo', {
    extend: 'Ext.data.Store',
    alias:'store.v1-veicolo',
    fields: [
        {name: 'codice',type: 'string'},
        {name: 'descrizione',type: 'string'}
    ],
    data : [
        {codice:'V',descrizione: Locale.t('gpr.grids.immagini.filtri.V')},
        {codice:'C',descrizione: Locale.t('gpr.grids.immagini.filtri.C')},
        {codice:'I',descrizione: Locale.t('gpr.grids.immagini.filtri.I')}
    ]
});