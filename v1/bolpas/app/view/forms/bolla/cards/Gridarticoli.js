/**
 * Created by luke on 02/09/2020.
 */
Ext.define('bolpas.view.forms.bolla.cards.Gridarticoli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.RadioGroup',
        'Ext.form.field.Text',
        'Ext.grid.column.Widget',
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
    dockedItems: [
        {xtype:'toolbar', dock: 'top',
            items: [{xtype:'textfield', width:450, hasSearch : false, paramName : 'query',fieldLabel:Locale.t('bolpas.forms.bolla.gridarticoli.filtra'),labelWidth:80,
                triggers: {
                    clear: {cls: 'x-form-clear-trigger', hidden:true, handler: 'onClearTriggetSearch'
                    },
                    search: {cls: 'x-form-search-trigger', handler: 'onSearchTriggetSearch'
                    }
                },
                listeners:{specialkey:'onSpecialkeySearch'}
            }
            ]
        }
    ],
    columns: [
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.cdpar'), width:130, dataIndex: 'cdpar'},
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.cdpfo'), width:130, dataIndex: 'cdpfo'},
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.depar'), width:400, dataIndex: 'depar'},
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.qtmov'), width:90, dataIndex: 'qtmov'},
       {text: Locale.t('bolpas.forms.bolla.gridarticoli.tipo'), flex:1, xtype: 'widgetcolumn', dataIndex: 'tipo',
           widget: {xtype: 'radiogroup', simpleValue: true,
               onWidgetAttach: function (column, widget, rec) {
                   widget.down(`[inputValue=${rec.get('tipo')}]`).setValue(2);
               },
               items: [{boxLabel: Locale.t('bolpas.forms.bolla.gridarticoli.nessuno'), inputValue: 0},
                   {boxLabel: Locale.t('bolpas.forms.bolla.gridarticoli.modifica'), inputValue: 1},
                   {boxLabel: Locale.t('bolpas.forms.bolla.gridarticoli.pezzo'), inputValue: 2},
                   {boxLabel: Locale.t('bolpas.forms.bolla.gridarticoli.lotto'), inputValue: 3}
               ],
               listeners:{
                   change: function(radiogroup, value){
                       let recwidg = radiogroup.getWidgetRecord();
                       if (recwidg) {
                           recwidg.set('tipo', value);
                       }
                   }
               }
           }
       }
    ]
});