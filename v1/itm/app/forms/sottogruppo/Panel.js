/**
 * Created by luke on 21/02/23.
 */
Ext.define('itm.forms.sottogruppo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.sottogruppo.Controller',
        'itm.forms.sottogruppo.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-sottogruppo',
    viewModel: 'v1-sottogruppo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});