/**
 * Created by luke on 12/05/22.
 */
Ext.define('stver.view.forms.mese.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stver.view.forms.mese.Controller',
        'stver.view.forms.mese.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-andamentomese',
    viewModel: 'v1-andamentomese',
    listeners: {
        afterRender: 'onAfterRender'
    }
});