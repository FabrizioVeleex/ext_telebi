/**
 * Created by luke on 04/04/23.
 */
Ext.define('vms.view.forms.intervento.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vms.view.forms.intervento.Controller',
        'vms.view.forms.intervento.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-intervento',
    viewModel: 'v1-intervento',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});