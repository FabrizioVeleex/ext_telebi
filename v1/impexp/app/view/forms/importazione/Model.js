/**
 * Created by luca on 16/07/2018.
 */
Ext.define('impexp.view.forms.importazione.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-importazione',
    requires: [
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    stores:{
        storeAllegati: { model: 'portal.v1.view.main.global.upload.GridAttachModel' }
    }
})