/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.view.forms.importazione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'impexp.view.forms.importazione.Controller',
        'impexp.view.forms.importazione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-importazione',
    viewModel: 'v1-importazione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});