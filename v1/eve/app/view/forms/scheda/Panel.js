/**
 * Created by luke on 16/03/23.
 */
Ext.define('eve.view.forms.scheda.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'eve.view.forms.scheda.Controller',
        'eve.view.forms.scheda.Model'
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