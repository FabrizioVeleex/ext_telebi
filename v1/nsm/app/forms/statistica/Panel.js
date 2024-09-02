Ext.define('nsm.forms.statistica.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'nsm.forms.statistica.ViewModel',
        'nsm.forms.statistica.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-statistica',
    viewModel: 'v1-statistica',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});