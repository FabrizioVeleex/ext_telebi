/**
 * Created by luke on 12/05/22.
 */
Ext.define('impexp.view.forms.modulo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'impexp.view.forms.modulo.Controller',
        'impexp.view.forms.modulo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-modulo',
    viewModel: 'v1-modulo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});