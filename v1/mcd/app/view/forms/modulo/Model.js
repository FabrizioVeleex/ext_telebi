/**
 * Created by luke on 05/03/21.
 */
Ext.define('mcd.view.forms.modulo.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-modulo',

    requires: [
        'mcd.store.forms.modulo.Combodip',
        'mcd.store.forms.modulo.Combosede',
        'mcd.store.forms.modulo.GridMateriali'
    ],

    stores: {
        comboSede:{type:'v1-combosede'},
        comboDip:{type:'v1-combodip'},
        gridMateriali:{type:'v1-gridmateriali'}
    }
});