/**
 * Created by luke on 28/06/23.
 */
Ext.define('amm.view.forms.azienda.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.azienda.Controller',
        'amm.view.forms.azienda.Model'
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