/**
 * Created by luke on 12/05/22.
 */
Ext.define('stver.view.forms.anno.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stver.view.forms.anno.Controller',
        'stver.view.forms.anno.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-andamentoanno',
    viewModel: 'v1-andamentoanno',
    listeners: {
        afterRender: 'onAfterRender'
    }
});