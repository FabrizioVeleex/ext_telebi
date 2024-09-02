/**
 * Created by luke on 12/05/22.
 */
Ext.define('stcom.view.forms.vendite.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stcom.view.forms.vendite.Controller',
        'stcom.view.forms.vendite.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stcom-vendite',
    viewModel: 'v1-stcom-vendite',
    listeners: {
        afterRender: 'onAfterRender'
    }
});