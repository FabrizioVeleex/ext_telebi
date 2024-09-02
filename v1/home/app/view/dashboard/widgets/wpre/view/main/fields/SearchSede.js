/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wpre.view.main.fields.SearchSede', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'v1-wpre-sede',
    simpleValue: true,
    hideLabel :true,
    items: [
        {boxLabel:Locale.t('wpre.tutti'),name:'sede',inputValue:0,minWidth:90,checked:true},
        {boxLabel:Locale.t('wpre.rolcar'),name:'sede',inputValue:1,minWidth:90,checked:false,
            bind:{
                hidden:'{hideSede}'
            }
        },
        {boxLabel:Locale.t('wpre.cicagna'),name:'sede',inputValue:2,minWidth:90,checked:false,
            bind:{
                hidden:'{hideCicagna}'
            }
        },
        {boxLabel:Locale.t('wpre.tunisia'),name:'sede',inputValue:3,minWidth:90,checked:false,
            bind:{
                hidden:'{hideTunisia}'
            }
        }
    ],
    listeners:{
        change:'onChangeSede'
    }
});
