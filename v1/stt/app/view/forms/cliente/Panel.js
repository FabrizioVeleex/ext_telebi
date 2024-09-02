/**
 * Created by fabrizio on 09/01/2022.
 */
Ext.define('stt.view.forms.cliente.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'stt.view.forms.cliente.Controller',
        'stt.view.forms.cliente.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-forms-cliente',
    viewModel: 'v1-forms-cliente',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});