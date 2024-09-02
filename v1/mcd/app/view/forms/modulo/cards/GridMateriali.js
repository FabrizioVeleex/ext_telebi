/**
 * Created by luca on 18/07/2018.
 */
Ext.define('mcd.view.forms.modulo.cards.GridMateriali', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Check',
        'Ext.form.field.Text',
        'Ext.form.field.Number'
    ],
    minHeight: 120,
    bind: {
        store: '{gridMateriali}'
    },
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    columns: [
        {text: Locale.t('mcd.forms.modulo.gridmateriali.materiale'), menuDisabled:true,
            resizable:false, sortable:false, dataIndex: 'descrizione', width:400,
        },
        {width:100,xtype: 'checkcolumn',text: Locale.t('mcd.forms.modulo.gridmateriali.seleziona'), dataIndex: 'valido',
            bind:{
                disabled: '{readOnly}'
            },
            listeners:{
                checkchange: function (colonna, rowIndex,checked) {
                    if (!checked) {
                        let grid = colonna.up('grid')
                        let store = grid.getStore()
                        let row = store.getAt(rowIndex)
                        row.set('qta', '')
                        row.set('note', '')
                    }
                }
            }
        },
        {text: Locale.t('mcd.forms.modulo.gridmateriali.qta'), menuDisabled:true,
            resizable:false, sortable:false, dataIndex: 'qta', width:100,
            getEditor: function(record) {
                if (!record.data.valido) {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('mcd.forms.modulo.gridmateriali.obbcheck'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                return {xtype: 'numberfield',minValue:1,hideTrigger: true,decimalSeparator:',',allowDecimals:false}
            }
        },
        {text: Locale.t('mcd.forms.modulo.gridmateriali.note'), menuDisabled:true,
            resizable:false, sortable:false, dataIndex: 'note', flex:1,
            getEditor: function(record) {
                if (!record.data.valido) {
                    Ext.Msg.show({
                        title: Locale.t('global.attenzione'),
                        msg: Locale.t('mcd.forms.modulo.gridmateriali.obbcheck'),
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                return {xtype: 'textfield', value:'',maxLength: 60}
            }
        }
    ],
    items: []
});