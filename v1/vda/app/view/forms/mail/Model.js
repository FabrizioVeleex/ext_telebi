/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.view.forms.mail.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-mail',

    requires: [
        'portal.v1.view.main.global.upload.GridAttachModel',
        'vda.store.forms.mail.Store'
    ],

    stores: {
        storeDestinatari: {type: "v1-destinatari"},
        storeAllegati: {model: 'portal.v1.view.main.global.upload.GridAttachModel'}
    }
})