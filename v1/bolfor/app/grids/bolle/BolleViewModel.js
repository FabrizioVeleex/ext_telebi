/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.bolle.BolleViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-bolfor-bolle',
    requires: [
        'bolfor.grids.bolle.annullate.Store',
        'bolfor.grids.bolle.associate.Store',
        'bolfor.grids.bolle.completate.Store',
        'bolfor.grids.bolle.nuove.Store'
    ],
    stores: {
        storeNuove: { type: 'v1-bolfor-nuove', autoLoad: false },
        storeAssociate: { type: 'v1-bolfor-associate', autoLoad: false },
        storeCompletate: { type: 'v1-bolfor-completate', autoLoad: false },
        storeAnnullate: { type: 'v1-bolfor-annullate', autoLoad: false }
    },
    data: {
        titolonuove: Locale.t('bolfor.grids.nuove.title'),
        titoloassociate: Locale.t('bolfor.grids.associate.title'),
        titolocompletate: Locale.t('bolfor.grids.completate.title'),
        titoloannullate: Locale.t('bolfor.grids.annullate.title')
    }
});