/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.forms.obbiettivo.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-stt-obbiettivo',
    requires: [
        "stt.view.forms.obbiettivo.cards.Store",
        "stt.view.forms.obbiettivo.cards.StoreDet",
    ],
    stores: {
        store: {
            type: 'v1-stt-store-cli-art', autoLoad: false
        },
        storeDet: {
            type: 'v1-stt-store-cli-art-det', autoLoad: false
        }

    }
});