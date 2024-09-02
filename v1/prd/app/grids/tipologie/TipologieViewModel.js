/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.grids.tipologie.TipologieViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-prd-tipologie',
    requires: [
        'prd.grids.tipologie.TipologieStore',
    ],
    stores: {
        storeTipologie: { type: 'v1-prd-tipologie', autoLoad: false },
    },
    data: {
        titolo: Locale.t('prd.grids.tipologie.title'),
    }
});