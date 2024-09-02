/**
 * Created by luke on 20/01/23.
 */
Ext.define('ama.view.forms.scheda.cards.Altro', {
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'ama.view.forms.scheda.cards.GridParametri'
    ],
    scrollable:'y',
    items: [
        {
            xtype: 'fieldset', collapsible: false, collapsed: false,
            title: '<span style="color: black;font-weight:lighter">' + Locale.t('ama.forms.scheda.gridparametri.title') + '</span>',
            style: {'background-color': "transparent;"},
            items: [
                {xtype:'gridparametri'},
                {xtype: 'container', itemId: 'altrofld'} //allegati
            ]
        }
    ]
});