/**
 * Created by luke on 26/06/22.
 */
Ext.define('gpr.view.forms.lingua.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'gpr.view.forms.lingua.Controller',
        'gpr.view.forms.lingua.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-lingua',
    viewModel: 'v1-lingua',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});