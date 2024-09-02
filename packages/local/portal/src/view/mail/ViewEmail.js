/**
 * Created by fabrizio on 08/10/17.
 */
Ext.define('portal.view.mail.ViewEmail', {
    extend: 'Ext.view.View',
    requires:[
        'Ext.form.ComboBox',
        'Ext.data.Store'
        // 'portal.store.email.Email'
    ],
    storeCombo:null,
    insertNewEmail:true,
    userCls:'email-panel',
    tpl: new Ext.XTemplate(
        '<tpl for=".">',
        '       <tpl if="isnew !== 2 ">',
        '           <div class="email-wrap email-select">',
        '               <span data-qtip=" {tooltip:htmlEncode} ">{shortName:htmlEncode}</span>',
        '               <span class="email-remove " style="{hidden}" data-qtip="Remove <hr>{tooltip:htmlEncode}">x</span>',
        '       </tpl>',
        '       <tpl if="isnew == 2 ">',
        '           <div class="email-wrap span-email">',
        '               <span class="email-combobox" style="width:100px"></span>',
        '       </tpl>',
        '   </div>',
        '</tpl>'+
        '<div class="x-clear"></div>'
    ),
    // enableTextSelection:true,
    itemSelector: 'div.email-wrap',
    deferInitialRefresh:true,
    prepareData: function(data) {
        var shortName = data.name,
            display= 'contents';
        if (data.name===''){
            shortName = data.email;
        }
        if (this.readOnly===true){
            display = 'none';
        }
        Ext.apply(data, {
            hidden:'display:'+display,
            tooltip: data.name+'<br>'+data.email,
            shortName: shortName //Ext.util.Format.ellipsis(shortName, 15)
        });
        return data;
    },

    listeners:{
        itemclick: function(view, record, item, index, e, eOpts) {
            var clickedEl = Ext.get(e.target),
                itemIndex = null;
            if (clickedEl.hasCls('email-remove')){
                view.store.each(function (rec) {
                    if (record.get('id')===rec.get('id')){
                        itemIndex = view.store.data.indexOf(record);
                    }
                });
                if (itemIndex!==null){
                    view.store.removeAt(itemIndex );
                }
            }
        },
        beforeitemclick: function( cnt, record, item, index, e){
            if (record.data['isnew']===2){
                e.stopEvent();
                return false;
            }
        }
    },
    checkEmail:function(store,value){
        var ereg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            name = '',
            email = '';
        var t = value.split('<');
        if (t.length===2){
            var e = t[1].split('>');
            if (e.length===2){
                name = t[0];
                email = e[0];
            }
        }else{
            email = value;
        }
        if (ereg.test(email)) {
            store.insert(1, {
                email: email.toLowerCase(),
                name: name,
                isnew: 1,
                action: 1
            });
            return true;
        }
        return false;
    },
    refresh: function(){
        var me = this;
        if (this.storeCombo===null){
            this.storeCombo = Ext.create('Ext.data.Store', {
                fields: ['name', 'email'],
                data : []
            });
        }

        if (this.readOnly===false) {
            this.callParent(arguments);
            Ext.select('.email-combobox', this.el).each(function (el) {
                var comboValue = Ext.create('Ext.form.ComboBox', {
                    value: '',
                    // value: el.dom.innerHTML,
                    store: me.storeCombo,
                    hideTrigger: true,
                    padding: 0,
                    margin: 0,
                    grow: true,
                    minGrow:10, //FIXME non funge.....
                    emptyText: 'add',
                    matchFieldWidth: false,
                    userCls: 'combo-email',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'email',
                    renderTo: el,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function(field,e) {
                            if (e.getKey() === e.ENTER) {

                                if (me.checkEmail(me.store,field.value)===true){

                                    var task = new Ext.util.DelayedTask(function (field) {
                                        field.clearValue();
                                    }, this, [field]);
                                    task.delay(20);
                                }

                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        },
                        select: function (combo, value) {
                            var data = me.store.data;
                            me.store.insert(1, {
                                email: value.data['email'],
                                name: value.data['name'],
                                isnew: 1,
                                action: 1
                            });
                            var task = new Ext.util.DelayedTask(function (combo) {
                                combo.clearValue();
                            }, this, [combo]);
                            task.delay(20);
                        }
                    }
                });
            });
        }
        //gestisco ridimensionamento pannello superiore su inserimento combo.
        // var task = new Ext.util.DelayedTask(function () {
        //     var panel = this.up('panel');
        //     if (panel)
        //         panel.setHeight(this.el.dom.offsetHeight);
        // }, this, []);
        // task.delay(50);
    },
    setReadOnly: function(readOnly) {
        var me = this,
            inputEl = me.inputEl,
            old = me.readOnly;

        readOnly = !!readOnly;
        me[readOnly ? 'addCls' : 'removeCls'](me.readOnlyCls);
        me.readOnly = readOnly;

        if (inputEl) {
            inputEl.dom.readOnly = readOnly;
            inputEl.dom.setAttribute('aria-readonly', readOnly);
        }
        else if (me.rendering) {
            me.setReadOnlyOnBoxReady = true;
        }
        if (readOnly !== old) {
            me.fireEvent('writeablechange', me, readOnly);
        }
    }
});