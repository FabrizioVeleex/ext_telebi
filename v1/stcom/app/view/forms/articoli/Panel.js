/**
 * Created by luke on 12/05/22.
 */
Ext.define('stcom.view.forms.articoli.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stcom.view.forms.articoli.Controller',
        'stcom.view.forms.articoli.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stcom-articoli',
    viewModel: 'v1-stcom-articoli',
    listeners: {
        afterRender: 'onAfterRender'
    }
});