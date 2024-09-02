/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('sdc.view.forms.sharedupd.cards.GridMailto', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.plugin.CellEditing'
    ],
    minHeight: 220,
    header: false,
    title:'',
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    columns: [
        {text: Locale.t('sdc.forms.sharedupd.gridmailto.email'), flex:1, menuDisabled: true, resizable: false,
            sortable: false, dataIndex: 'mailto',
            getEditor: function () {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                return {
                    xtype: 'textfield',vtype:'email',width:300
                }
            }
        },
        {text: Locale.t('sdc.forms.sharedupd.gridmailto.contact'),
        flex:1, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'contact',
        getEditor: function () {
            let vm = this.lookupViewModel()
            if (vm.get('readOnly') === true) {
                return false
            }
            return {
                xtype: 'textfield',width:300
            }
        }
    },
        {text: Locale.t('sdc.forms.sharedupd.gridmailto.ragsoc'),
            flex:1, menuDisabled: true, resizable: false, sortable: false, dataIndex: 'ragsoc',
            renderer: function(value){
                return value;
            },
            getEditor: function () {
               let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                return {xtype: 'textfield',width:300}
            }
        }
    ]
});