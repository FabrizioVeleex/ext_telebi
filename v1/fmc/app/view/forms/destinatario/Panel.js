/**
 * Created by luke on 10/12/22.
 */
Ext.define('fmc.view.forms.destinatario.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.destinatario.Controller',
        'fmc.view.forms.destinatario.Model'
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