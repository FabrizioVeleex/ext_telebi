/**
 * Created by luke on 26/06/22.
 */
Ext.define('gpr.view.forms.azienda.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'gpr.view.forms.azienda.Controller',
        'gpr.view.forms.azienda.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-azienda',
    viewModel: 'v1-azienda',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});