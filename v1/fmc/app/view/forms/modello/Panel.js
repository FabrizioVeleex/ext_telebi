/**
 * Created by luke on 10/12/22.
 */
Ext.define('fmc.view.forms.modello.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.modello.Controller',
        'fmc.view.forms.modello.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-modello',
    viewModel: 'v1-modello',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});