/**
 * Created by fabrizio on 13/02/2020.
 */
Ext.define('sdc.view.forms.shared.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-shared',

    requires: [
        'portal.v1.view.main.global.upload.GridAttachModel',
        'sdc.store.forms.shared.GridDownloads',
        'sdc.store.forms.shared.GridMailto',
        'sdc.store.forms.shared.ProgettiCombo'
    ],
    stores:{
        storeAllegati: { model: 'portal.v1.view.main.global.upload.GridAttachModel' }, //allegati standard
        storeDownloads: { type: 'v1-griddownloads' },
        storeMailto: { type: 'v1-gridmailto' },
        storeProgetti: {type:'v1-progetticombo'}
    },
    data: {
       
    }
});