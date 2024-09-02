/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.scrivania.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.scrivania.Controller',
        'amm.view.forms.scrivania.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-scrivania',
    viewModel: 'v1-scrivania',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});