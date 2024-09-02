/**
 * Created by luke on 15/09/22.
 */
Ext.define('vms.view.forms.destinatario.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vms.view.forms.destinatario.Controller',
        'vms.view.forms.destinatario.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-destinatario',
    viewModel: 'v1-destinatario',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});