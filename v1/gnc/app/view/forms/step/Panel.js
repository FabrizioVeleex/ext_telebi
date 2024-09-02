/**
 * Created by luke on 01/08/22.
 */
Ext.define('gnc.view.forms.step.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'gnc.view.forms.step.Controller',
        'gnc.view.forms.step.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-step',
    viewModel: 'v1-step',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});