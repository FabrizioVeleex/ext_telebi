/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.modulo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'stt.view.forms.modulo.Controller',
        'stt.view.forms.modulo.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-modulo',
    viewModel: 'v1-modulo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});