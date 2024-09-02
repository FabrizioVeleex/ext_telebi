Ext.define('dip.view.forms.parametro.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'dip.view.forms.parametro.Model',
        'dip.view.forms.parametro.Controller'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-parametro',
    viewModel: 'v1-parametro',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});