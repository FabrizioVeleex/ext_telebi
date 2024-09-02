/**
 * Created by luke on 02/06/21.
 */
Ext.define('bolpas.view.forms.bolla.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'bolpas.view.forms.bolla.Controller',
        'bolpas.view.forms.bolla.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-bolla',
    viewModel: 'v1-bolla',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});