/**
 * Created by luca on 16/07/2018.
 */
Ext.define('cli.forms.cliente.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-cli-form-cliente',

    requires: [
        'cli.forms.cliente.store.Contatti',
        'portal.v1.store.forms.combo.GetLocalita',
        'portal.v1.store.forms.combo.GetNazioni',
        'portal.v1.view.main.global.upload.GridAttachModel'
    ],
    stores: {
        storeLocalita: { type: 'v1-getlocalita' }, //store località
        storeNazioni: { type: 'v1-getnazioni' }, //store paesi
        storeContatti: { type: 'v1-cli-contatti' }, //store contatti
        storeAllegati: {model:'portal.v1.view.main.global.upload.GridAttachModel'} //allegati standard
    },
    data:{
        cardactive:'anagrafica'
    }
})