Ext.define('nsm.view.forms.job.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'nsm.view.forms.job.Model',
        'nsm.view.forms.job.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-job',
    viewModel: 'v1-job',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});