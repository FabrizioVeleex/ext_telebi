/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.forms.scheda.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.scheda.Controller',
        'fmc.view.forms.scheda.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-scheda',
    viewModel: 'v1-scheda',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});