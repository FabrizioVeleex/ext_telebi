/**
 * Created by luke on 13/05/24.
 */
Ext.define('webord.view.forms.notifica.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'webord.view.forms.notifica.Controller',
        'webord.view.forms.notifica.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-notifica',
    viewModel: 'v1-notifica',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});