Ext.define('dip.view.forms.utente.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'dip.view.forms.utente.Model',
        'dip.view.forms.utente.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-utente',
    viewModel: 'v1-utente',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});