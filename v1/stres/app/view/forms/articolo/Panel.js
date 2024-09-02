/**
 * Created by luke on 12/05/22.
 */
Ext.define('stres.view.forms.articolo.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stres.view.forms.articolo.Controller',
        'stres.view.forms.articolo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stres-articolo',
    viewModel: 'v1-stres-articolo',
    listeners: {
        afterRender: 'onAfterRender'
    }
});