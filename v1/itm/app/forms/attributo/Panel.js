/**
 * Created by luke on 21/02/23.
 */
Ext.define('itm.forms.attributo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.attributo.Controller',
        'itm.forms.attributo.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    // bodyPadding: 15,
    controller: 'v1-attributo',
    viewModel: 'v1-attributo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});