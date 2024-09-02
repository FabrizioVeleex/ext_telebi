/**
 * Created by luca on 16/07/2018.
 */
Ext.define('mcd.view.forms.parametri.cards.Parametri', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    items: [
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('mcd.forms.parametri.fields.iduo'),
                    width: 600, displayField: 'nome', valueField: 'id',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{comboUo}', value: '{record.iduo}', readOnly: '{readOnly}'}
                }
            ]
        },
        {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo',minChars:3, fieldLabel: Locale.t('mcd.forms.parametri.fields.idfolder'),
                    flex: 1, displayField: 'nome', valueField: 'id', forceSelection: true, autoLoadOnValue: true,
                    bind: {
                        store: '{comboFolder}',
                        value: '{record.idfolder}',
                        readOnly: '{readOnly}'
                    },
                    listeners: {
                        //passo la iduo x caricare le sue cartelle
                        beforequery:function (qe) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            delete qe.combo.lastQuery;
                            let storeFolder=vm.get('comboFolder');
                            if (storeFolder) {
                                storeFolder.getProxy().extraParams.iduo=rec.data.iduo;
                            }
                        }
                    }
                }
            ]
        }
    ]
});