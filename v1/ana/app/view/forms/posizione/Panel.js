/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.posizione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.posizione.Controller',
        'ana.view.forms.posizione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-posizione',
    viewModel: 'v1-posizione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});