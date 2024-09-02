/**
 * Created by luke on 14/02/24.
 */
Ext.define('cde.view.forms.notifica.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'cde.view.forms.notifica.Controller',
        'cde.view.forms.notifica.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-form-cde-notifica',
    viewModel: 'v1-form-cde-notifica',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});