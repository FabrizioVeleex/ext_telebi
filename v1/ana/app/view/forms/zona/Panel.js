/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.zona.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.zona.Controller',
        'ana.view.forms.zona.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-zona',
    viewModel: 'v1-zona',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});