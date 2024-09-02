/**
 * Created by luke on 18/02/23.
 */
Ext.define('itm.forms.distinta.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.distinta.Controller',
        'itm.forms.distinta.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    // bodyPadding: 15,
    controller: 'v1-itm-form-distinta',
    viewModel: 'v1-itm-form-distinta',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});