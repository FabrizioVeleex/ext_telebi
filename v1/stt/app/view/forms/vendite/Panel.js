/**
 * Created by luke on 12/05/22.
 */
Ext.define('stt.view.forms.vendite.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stt.view.forms.vendite.Controller',
        'stt.view.forms.vendite.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stt-vendite',
    viewModel: 'v1-stt-vendite',
    listeners: {
        afterRender: 'onAfterRender'
    }
});