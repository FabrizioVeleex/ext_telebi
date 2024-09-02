/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.gruppo.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-gruppo',
    requires: [
        'itm.forms.gruppo.component.ComboClasse',
        'itm.forms.gruppo.component.ComboFamiglia'
    ],
    stores: {
        storeClassi: { type: 'v1-comboclasse' }, //store classi
        storeFamiglie: { type: 'v1-combofamiglia' } //store famiglie
    }
})