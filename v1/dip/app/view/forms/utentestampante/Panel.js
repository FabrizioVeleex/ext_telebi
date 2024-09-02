Ext.define('dip.view.forms.utentestampante.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'dip.view.forms.utentestampante.Model',
        'dip.view.forms.utentestampante.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stampante',
    viewModel: 'v1-stampante',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});