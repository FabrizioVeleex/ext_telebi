/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.categoria.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.categoria.Controller',
        'ana.view.forms.categoria.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-categoria',
    viewModel: 'v1-categoria',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});