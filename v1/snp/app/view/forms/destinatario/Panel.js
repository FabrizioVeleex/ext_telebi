/**
 * Created by luke on 07/08/23.
 */
Ext.define('snp.view.forms.destinatario.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'snp.view.forms.destinatario.Controller',
        'snp.view.forms.destinatario.Model'
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