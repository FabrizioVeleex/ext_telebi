/**
 * Created by luke on 15/11/23.
 */
Ext.define('bolfor.forms.tipologia.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'bolfor.forms.tipologia.Controller',
        'bolfor.forms.tipologia.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-bolfor-tipologia',
    viewModel: 'v1-bolfor-tipologia',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});