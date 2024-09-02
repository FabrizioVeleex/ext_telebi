Ext.define('dip.view.forms.ruolo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'dip.view.forms.ruolo.Model',
        'dip.view.forms.ruolo.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-ruolo',
    viewModel: 'v1-ruolo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});