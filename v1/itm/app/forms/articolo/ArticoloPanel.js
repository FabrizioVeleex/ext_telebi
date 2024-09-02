/**
 * Created by luke on 18/02/23.
 */
Ext.define('itm.forms.articolo.ArticoloPanel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.articolo.ArticoloController',
        'itm.forms.articolo.ArticoloViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    // bodyPadding: 15,
    controller: 'v1-itm-form-articolo',
    viewModel: 'v1-itm-form-articolo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});