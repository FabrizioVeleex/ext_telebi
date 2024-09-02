/**
 * Created by luke on 07/08/23.
 */
Ext.define('snp.view.forms.destinatario.cards.Destinatario', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('snp.forms.destinatario.fields.idrisorsa'),
                    width: 800, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    displayField: 'nomecognome', valueField: 'id',minChars:3,
                    queryMode: 'remote', forceSelection: true,autoLoadOnValue: true,
                    bind: {store: '{comboUtente}', value: '{record.idrisorsa}', readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {
                type: "hbox"
            },
            defaults: {margin: 5,labelWidth:200,labelAlign:'top'},
            items: [
                {xtype: 'radiogroup',fieldLabel:Locale.t('snp.forms.destinatario.fields.opzione'),
                    columns: 3,flex:1,simpleValue: true,allowBlank: false,blankText: Locale.t('global.form.blanktext'),
                    items: [
                        {boxLabel:Locale.t('snp.forms.destinatario.fields.acqportiera'),inputValue:1},
                        {boxLabel:Locale.t('snp.forms.destinatario.fields.acqoe'),inputValue:2},
                        {boxLabel:Locale.t('snp.forms.destinatario.fields.acqace'),inputValue:3}
                    ],
                    bind: {value:'{record.opzione}',readOnly: '{readOnly}'}
                }
            ]
        }
    ]
});