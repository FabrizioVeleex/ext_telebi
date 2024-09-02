/**
 * Created by luke on 20/02/24.
 */
Ext.define('cde.view.forms.listnetto.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'cde.view.forms.listnetto.Controller',
        'cde.view.forms.listnetto.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-cde-form-listnetto',
    viewModel: 'v1-cde-form-listnetto',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});