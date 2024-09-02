/**
 * Created by luca on 16/07/2018.
 */
Ext.define('sgv.view.forms.segnalazione.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-segnalazione',
    requires:[
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    stores: {
        storeAllegatiRichiedente: {model:'portal.v1.view.main.global.upload.GridAttachModel'}, //allegati standard
        storeAllegatiGestore: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    }
});