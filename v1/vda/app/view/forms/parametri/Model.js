/**
 * Created by luca on 16/07/2018.
 */
Ext.define('vda.view.forms.parametri.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-parametri',

    requires: [
        'vda.store.forms.parametri.ComboCategoria'
    ],

    stores: {
        storeCategorie:{type:'v1-combocategoria'}
    }
});