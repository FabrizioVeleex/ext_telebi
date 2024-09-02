/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.sottogruppo.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-sottogruppo',
    requires: [
        'itm.forms.sottogruppo.component.ComboClasse',
        'itm.forms.sottogruppo.component.ComboFamiglia',
        'itm.forms.sottogruppo.component.ComboGruppo',
    ],
    stores: {
        storeClassi: { type: 'v1-s-comboclasse' }, //store classi
        storeFamiglie: { type: 'v1-s-combofamiglia' }, //store famiglie
        storeGruppi: { type: 'v1-s-combogruppo' } //store gruppi
    }
})