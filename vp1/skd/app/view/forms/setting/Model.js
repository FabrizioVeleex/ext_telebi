/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cards',

    stores: {
    },

    data: {
        posizioneCard:'dashboard',
        connection:''
    },
    formulas: {
        formTitle: {
            get: function (data) {
                return '<div class="titleForm">' +
                    '<img class="logo" src="/images/azienda/logo_32.png" alt="&nbsp;">' +
                    '<span class="title"> ' + Locale.t('skd.forms.cards.title') + '</span>' +
                    '</div>';
            }
        }
    }
});
