/**
 * Created by luca on 16/07/2018.
 */
Ext.define('amm.view.forms.parametri.Model', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-parametri',
    requires: [
        'amm.store.forms.parametri.Combotipo'
    ],
    stores: {
        comboTipo: { type: 'v1-combotipo' }
    },
    formulas: {
        infoPsw: {
            get: function () {
                return '<div><a class="add" href="javascript:void(0)"><img src="/images/icons/eye.png" title="' + Locale.t('amm.forms.parametri.fields.showpsw') + '" alt="Mostra password"><img></a></div>';
            }
        }
    }
});