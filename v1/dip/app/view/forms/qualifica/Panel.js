Ext.define('dip.view.forms.qualifica.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'dip.view.forms.qualifica.Model',
        'dip.view.forms.qualifica.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-qualifica',
    viewModel: 'v1-qualifica',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});