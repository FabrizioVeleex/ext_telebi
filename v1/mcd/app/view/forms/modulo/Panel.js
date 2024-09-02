/**
 * Created by luke on 03/03/21.
 */
Ext.define('mcd.view.forms.modulo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'mcd.view.forms.modulo.Controller',
        'mcd.view.forms.modulo.Model'
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