/**
 * Created by luke on 30/05/23.
 */
Ext.define('cli.forms.cliente.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'cli.forms.cliente.ViewController',
        'cli.forms.cliente.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-cli-form-controller',
    viewModel: 'v1-cli-form-cliente',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});