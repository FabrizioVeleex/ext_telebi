/**
 * Created by luca on 13/06/2017.
 */
Ext.define('amm.view.forms.voce.cards.Voce', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.form.TextField',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox'
    ],
    scrollable:'y',
    items: [
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.voce.fields.voce'),
                    flex:1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    maxLength: 250,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.voce}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.voce.fields.descrizione'),
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.descrizione}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('amm.forms.voce.fields.tipovoce'),
                    width: 600, displayField: 'descrizione', valueField: 'id',
                    allowBlank: false, blankText: Locale.t('global.form.blanktext'),
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{storeVoci}', value: '{record.tipovoce}', readOnly: '{readOnly}'},
                    listeners: {
                        select:function(cmb) {
                            let vm = this.lookupViewModel(),ctl = this.lookupController()
                            if (cmb.value==='LINK') {
                                vm.set('hideModulo',true)
                                vm.set('hideLink',false)
                                ctl.form.down('#percorsoid').setValue('')
                            } else {
                                vm.set('hideModulo',false)
                                vm.set('hideLink',true)
                            }
                        }
                    }
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top', msgTarget: 'side'},
            items: [
                {
                    xtype: 'combo', fieldLabel: Locale.t('amm.forms.voce.fields.modulo'),
                    width: 600, displayField: 'titolo', valueField: 'id',
                    queryMode: 'local', forceSelection: true,
                    bind: {store: '{storeModuli}', value: '{record.percorso}', readOnly: '{readOnly}', hidden: '{hideModulo}'}
                }
            ]
        },
        {xtype: 'container', flex: 1,
            layout: {type: "hbox"},
            defaults: {margin: 5,labelAlign:'top',msgTarget: 'side'},
            items: [
                {xtype: 'textfield', fieldLabel: Locale.t('amm.forms.voce.fields.percorso'),itemId: 'percorsoid',
                    flex:1, maxLength: 250,maxLengthText:Locale.t('global.form.maxlengthtext'),
                    bind: {readOnly: '{readOnly}', value: '{record.percorso}', hidden: '{hideLink}'}
                }
            ]
        }
    ]
});