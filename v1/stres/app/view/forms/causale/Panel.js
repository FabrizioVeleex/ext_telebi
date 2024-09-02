/**
 * Created by luke on 12/05/22.
 */
Ext.define('stres.view.forms.causale.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stres.view.forms.causale.Controller',
        'stres.view.forms.causale.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stres-causale',
    viewModel: 'v1-stres-causale',
    listeners: {
        afterRender: 'onAfterRender'
    }
});