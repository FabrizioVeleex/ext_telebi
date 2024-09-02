/**
 * Created by luke on 04/05/21.
 */
Ext.define('rec.view.forms.step.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.step.Controller',
        'rec.view.forms.step.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-step',
    viewModel: 'v1-step',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
})