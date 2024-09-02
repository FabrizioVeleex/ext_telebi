/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.utente.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.utente.Controller',
        'amm.view.forms.utente.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-utente',
    viewModel: 'v1-utente',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});