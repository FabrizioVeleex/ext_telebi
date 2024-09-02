/**
 * Created by luke on 02/09/2020.
 */
Ext.define('bolfor.forms.bolla.cards.GridArticoli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Number',
        'Ext.grid.plugin.CellEditing'
    ],
    minHeight: 120,
    bind: {
        store: '{storeArticoli}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
    },
    columns: [
        {text: Locale.t('bolfor.forms.bolla.gridarticoli.cd_art'), width:200, dataIndex: 'cd_art'},
        {text: Locale.t('bolfor.forms.bolla.gridarticoli.descrizione'),flex:1, dataIndex: 'descrizione'},
        {text: Locale.t('bolfor.forms.bolla.gridarticoli.um'), width:130, dataIndex: 'um'},
        {text: Locale.t('bolfor.forms.bolla.gridarticoli.qta'), width:200, dataIndex: 'qta',
            getEditor: function(record) {
                let vm = this.lookupViewModel()
                vm.set('maxqta',record.data.residuo) //imposto valore massimo da residuo riga
                return {xtype: 'numberfield',minValue:1,
                    hideTrigger: true,decimalSeparator:',',
                    bind:{ maxValue: '{maxqta}'}
                }
            }
        },
        {text: Locale.t('bolfor.forms.bolla.gridarticoli.residuo'), width:200, dataIndex: 'residuo'}
    ]
});