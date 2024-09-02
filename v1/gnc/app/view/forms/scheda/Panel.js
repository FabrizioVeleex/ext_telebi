/**
 * Created by luke on 01/08/22.
 */
Ext.define('gnc.view.forms.scheda.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'gnc.view.forms.scheda.Controller',
        'gnc.view.forms.scheda.Model'
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