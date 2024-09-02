/**
 * Created by luke on 29/04/21.
 */
Ext.define('rec.view.forms.documento.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.documento.Controller',
        'rec.view.forms.documento.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-documento',
    viewModel: 'v1-documento',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});