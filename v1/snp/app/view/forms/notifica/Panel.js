/**
 * Created by luke on 07/11/23.
 */
Ext.define('snp.view.forms.notifica.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'snp.view.forms.notifica.Controller',
        'snp.view.forms.notifica.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-notifica',
    viewModel: 'v1-notifica',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});