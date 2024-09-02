/**
 * Created by luke on 10/12/22.
 */
Ext.define('fmc.view.forms.verifica.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.verifica.Controller',
        'fmc.view.forms.verifica.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-verifica',
    viewModel: 'v1-verifica',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});