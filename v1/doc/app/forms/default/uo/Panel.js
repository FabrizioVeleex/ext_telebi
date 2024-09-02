/**
 * Created by luke on 18/02/23.
 */
Ext.define('doc.view.forms.default.uo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        // 'itm.view.forms.default.classe.Controller',
        // 'itm.view.forms.default.classe.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    // controller: 'v1-classe',
    // viewModel: 'v1-classe',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});