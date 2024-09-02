/**
 * Created by luke on 21/02/23.
 */
Ext.define('itm.forms.kit.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.kit.Controller',
        'itm.forms.kit.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'acr_v1-kit',
    viewModel: 'acr_v1-kit',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});