/**
 * Created by luke on 18/01/23.
 */
Ext.define('ama.view.forms.scheda.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ama.view.forms.scheda.Controller',
        'ama.view.forms.scheda.Model'
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