/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.famiglia.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-famiglia',
    requires: [
        'itm.forms.famiglia.component.classe.StoreClasse'
    ],
    stores: {
        storeClassi: { type: 'itm-form-fam-comboclasse' } //store classi
    }
})