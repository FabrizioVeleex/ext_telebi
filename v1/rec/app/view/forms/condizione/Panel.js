/**
 * Created by luke on 30/04/21.
 */
Ext.define('rec.view.forms.condizione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.condizione.Controller',
        'rec.view.forms.condizione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-condizione',
    viewModel: 'v1-condizione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});