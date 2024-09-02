/**
 * Created by fabrizio on 13/02/2020.
 */
Ext.define('sdc.view.forms.sharedupd.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-sharedupd',

    requires: [
        'portal.v1.view.main.global.upload.GridAttachModel',
        'sdc.store.forms.sharedupd.GridDownloads',
        'sdc.store.forms.sharedupd.GridMailto'
    ],
    stores:{
        storeAllegati: { model: 'portal.v1.view.main.global.upload.GridAttachModel' }, //allegati standard
        storeDownloads: { type: 'v1-griddownloadsupd' },
        storeMailto: { type: 'v1-gridmailtoupd' }
    },
    data: {
       
    }
});