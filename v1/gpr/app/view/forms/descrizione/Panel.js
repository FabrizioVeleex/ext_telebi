/**
 * Created by luke on 26/06/22.
 */
Ext.define('gpr.view.forms.descrizione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'gpr.view.forms.descrizione.Controller',
        'gpr.view.forms.descrizione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-descrizione',
    viewModel: 'v1-descrizione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});