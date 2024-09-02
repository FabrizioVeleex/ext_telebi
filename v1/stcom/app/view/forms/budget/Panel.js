/**
 * Created by luke on 04/06/24.
 */
Ext.define('stcom.view.forms.budget.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'stcom.view.forms.budget.Controller',
        'stcom.view.forms.budget.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-budget',
    viewModel: 'v1-budget',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});