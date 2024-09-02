/**
 * Created by luke on 23/07/23.
 */
Ext.define('sgv.view.forms.segnalazione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'sgv.view.forms.segnalazione.Controller',
        'sgv.view.forms.segnalazione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-segnalazione',
    viewModel: 'v1-segnalazione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});