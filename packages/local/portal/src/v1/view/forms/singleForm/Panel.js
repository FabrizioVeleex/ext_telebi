Ext.define('portal.v1.view.forms.singleForm.Panel', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.layout.container.Card',
        'Ext.container.Container'
    ],
    bind: {
        title: '{panelTitle}',
        closable: '{panelClosable}',
    },
    layout :{
        type:'card'
    },
    closable: false,
    dockedItems: [
    ],
    listeners: {
    },
})
