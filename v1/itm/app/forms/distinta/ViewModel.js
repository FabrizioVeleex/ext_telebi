/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.distinta.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-itm-form-distinta',

    requires: [
        // 'itm.forms.distinta.component.gridAttributi.StoreAttributi',
        // 'itm.forms.distinta.component.gridlegami.StoreLegami',

    ],
    stores: {
        storeAttributi: { type: 'v1-itm-grid-articoli-attributi' }, //store attributi
        storeLegami: { type: 'v1-itm-grid-articoli-legami' }, //store attributi
    },
    data: {
        columnLink: true,
        cardactive: "dashboard",
        hide: {
            attributi: true,
            fornutire: true
        },
    }
})