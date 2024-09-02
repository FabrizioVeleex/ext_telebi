/**
 * Created by luke on 12/05/22.
 */
Ext.define('sting.view.forms.ingresso.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'sting.view.forms.ingresso.Controller',
        'sting.view.forms.ingresso.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-sting-ingresso',
    viewModel: 'v1-sting-ingresso',
    listeners: {
        afterRender: 'onAfterRender'
    }
});