/**
 * Created by luke on 30/04/21.
 */
Ext.define('rec.view.forms.famiglia.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.famiglia.Controller',
        'rec.view.forms.famiglia.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-famiglia',
    viewModel: 'v1-famiglia',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});