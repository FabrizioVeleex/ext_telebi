/**
 * Created by Fabrizio on 14/10/21.
 */
Ext.define('sdc.view.forms.dominio.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.dominio',

    requires: [
        'sdc.store.forms.dominio.ComboTipoDominio'
    ],
    stores: {
        comboDominio: {
            type: 'v1-tipodominio',
            data : [
                {"id":0, "valore":Locale.t('sdc.forms.dominio.tipo.0')},
                {"id":1, "valore":Locale.t('sdc.forms.dominio.tipo.1')}
            ]
        },

    },
    data:{
        cardactive:'dominio',
        valueDisplayAccessi:'',
        valueFieldAccessi:'',
        valueDisplayPredef:'',
    },
    formulas: {

    }
});