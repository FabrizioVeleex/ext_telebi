/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.stato.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.stato.Controller',
        'ana.view.forms.stato.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stato',
    viewModel: 'v1-stato',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});