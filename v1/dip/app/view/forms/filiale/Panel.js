Ext.define('dip.view.forms.filiale.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'dip.view.forms.filiale.Model',
        'dip.view.forms.filiale.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-filiale',
    viewModel: 'v1-filiale',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});