/**
 * Created by luke on 21/02/24.
 */
Ext.define('cde.view.forms.listsconto.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'cde.view.forms.listsconto.Controller',
        'cde.view.forms.listsconto.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-cde-form-listsconto',
    viewModel: 'v1-cde-form-listsconto',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});