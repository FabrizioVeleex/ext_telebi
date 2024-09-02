/**
 * Created by luke on 10/12/22.
 */
Ext.define('fmc.view.forms.competenza.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.competenza.Controller',
        'fmc.view.forms.competenza.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-competenza',
    viewModel: 'v1-competenza',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});