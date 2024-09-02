/**
 * Created by luke on 18/03/22.
 */
Ext.define('amm.view.forms.stabilimento.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.stabilimento.Controller',
        'amm.view.forms.stabilimento.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stabilimento',
    viewModel: 'v1-stabilimento',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});