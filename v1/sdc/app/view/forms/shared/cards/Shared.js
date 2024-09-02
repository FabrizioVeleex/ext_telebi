/**
 * Created by fabrizio on 13/02/2020.
 */
Ext.define('sdc.view.forms.shared.cards.Shared', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.form.field.*',
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    bodyPadding: '0 15',
    items: [
        {xtype: 'container', flex: 1, layout: { type: "hbox" },
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'datefield', fieldLabel: Locale.t('sdc.forms.shared.fields.datestop'),labelWidth:150,allowBlank: false,
                    width: 200, format: 'd/m/Y', submitFormat: 'Y-m-d',
                    bind: { value: '{record.datestop}', readOnly: '{readOnlyDate}' }
                }
            ]
        },
        {xtype: 'container', flex: 1, layout: { type: "hbox" },
            defaults: {margin: 5, msgTarget: 'side'},
            items: [
                {
                    xtype: 'radiogroup', fieldLabel: Locale.t('sdc.forms.shared.fields.elimina'), columns: 3, width: 800, labelWidth: 150,simpleValue: true,
                    items: [
                        { boxLabel: Locale.t('sdc.forms.shared.fields.mai'), inputValue: 0 },
                        { boxLabel: Locale.t('sdc.forms.shared.fields.scadenza'), inputValue: 1 },
                        { boxLabel: Locale.t('sdc.forms.shared.fields.data'), inputValue: 2 }
                    ],
                    bind: { value: '{record.filesdelete}', readOnly: '{readOnlyDate}' }
                },
                {
                    xtype: 'datefield', fieldLabel:'', allowBlank: false,
                    width: 180, format: 'd/m/Y', submitFormat: 'Y-m-d',
                    bind: { value: '{record.datedelete}', readOnly: '{readOnlyDate}' }
                }
            ]
        },
        {xtype: 'container', flex: 1,layout: {type: "hbox"},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'textfield', fieldLabel: Locale.t('sdc.forms.shared.fields.subject'), flex: 1, labelWidth: 150,
                    bind: { readOnly: '{readOnly}', value: '{record.subject}' }
                }
            ]
        },
         {
            xtype: 'container', flex: 1,
            layout: {type: "hbox"},
             bind:{hidden:'{hideprogetto}'},
            defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('sdc.forms.shared.fields.idprogetto'),
                    flex:1, displayField: 'titolo', valueField: 'id',autoLoadOnValue:true,
                    queryMode: 'remote', forceSelection: true,
                    bind: {store: '{storeProgetti}', value: '{record.idprogetto}', readOnly: '{readOnly}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            bind:{hidden:'{hideprogetto}'},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'htmleditor',scrollable: true, style: 'font-size:14px;',fieldLabel: Locale.t('sdc.forms.shared.fields.commento'),flex:1,
                    bind: {readOnly: '{readOnly}',value: '{record.commento}'}
                }
            ]
        },
        {xtype: 'container', flex: 1, layout: { type: "hbox" },
            defaults: { margin: 5 },
            bind:{hidden:'{hidewarning}'},
            items: [
                {xtype: 'box',
                    height:Ext.global.Vars.infoUser.theme==='big'?50:30,
                    html: Locale.t('sdc.limiteupload')}
            ]
        },
        {xtype: 'container', flex: 1, layout: { type: "hbox" },
            defaults: { margin: 5 },
            bind:{hidden:'{hidearchived}'},
            items: [
                {
                    xtype: 'box', html: Locale.t('sdc.archividel'),  height:Ext.global.Vars.infoUser.theme==='big'?50:30
                }
            ]
        }
    ]
});