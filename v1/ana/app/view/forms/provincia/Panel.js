/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.provincia.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.provincia.Controller',
        'ana.view.forms.provincia.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-provincia',
    viewModel: 'v1-provincia',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});