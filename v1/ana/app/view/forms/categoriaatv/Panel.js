/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.categoriaatv.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.categoriaatv.Controller',
        'ana.view.forms.categoriaatv.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-categoriaatv',
    viewModel: 'v1-categoriaatv',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});