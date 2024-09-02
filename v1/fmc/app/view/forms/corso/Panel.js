/**
 * Created by luke on 09/12/22.
 */
Ext.define('fmc.view.forms.corso.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.corso.Controller',
        'fmc.view.forms.corso.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-corso',
    viewModel: 'v1-corso',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});