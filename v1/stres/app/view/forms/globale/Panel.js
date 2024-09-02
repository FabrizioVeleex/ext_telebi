/**
 * Created by luke on 12/05/22.
 */
Ext.define('stres.view.forms.globale.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stres.view.forms.globale.Controller',
        'stres.view.forms.globale.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stres-globale',
    viewModel: 'v1-stres-globale',
    listeners: {
        afterRender: 'onAfterRender'
    }
});