
/**
 * Created by luke on 07/08/23.
 */
Ext.define('snp.view.forms.scheda.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'snp.view.forms.scheda.Controller',
        'snp.view.forms.scheda.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-scheda',
    viewModel: 'v1-scheda',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});