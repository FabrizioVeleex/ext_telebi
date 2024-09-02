/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.organigramma.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.organigramma.Controller',
        'amm.view.forms.organigramma.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-organigramma',
    viewModel: 'v1-organigramma',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});