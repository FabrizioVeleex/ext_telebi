/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.cruscotto.CruscottoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cruscotto',
    requires: [
        'Ext.container.Container',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Accordion',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.util.DelayedTask',
        'skd.store.forms.cruscotto.Giacenza',
        'skd.store.forms.cruscotto.GiacenzaComponenti',
        'skd.store.forms.cruscotto.Revisioni',
        'skd.view.forms.cruscotto.Giacenza',
        'skd.view.forms.cruscotto.GiacenzaComponenti',
        'skd.view.forms.cruscotto.Pianificazione',
        'skd.view.forms.cruscotto.Revisioni',
        'skd.view.forms.cruscotto.TestataOdp'
    ],
    mixins:['portal.v1.global.Util'],
    /**
     * Called when the view is created
     */
    init: function() {

    },

    onLoadData: function (selectCell,row,infoCell) {
        let me = this,
            vm = this.getViewModel();

        if (Ext.global.Vars.confMod.main.filtri.negativi){
            vm.set('negativi',Ext.global.Vars.confMod.main.filtri.negativi);
        }else{
            vm.set('negativi',false);
        }
        if (Ext.global.Vars.confMod.main.west.pianificazione){
            vm.set('pianificazione',Ext.global.Vars.confMod.main.west.pianificazione);
        }
        if (Ext.global.Vars.confMod.main.west.revisioni){
            vm.set('revisioni',Ext.global.Vars.confMod.main.west.revisioni);
        }
        if (Ext.global.Vars.confMod.main.west.previsioni){
            vm.set('revisioni',Ext.global.Vars.confMod.main.west.previsioni);
        }

        if (infoCell===null ){
            this.onEmptyData();
            return;
        }

        vm.set('tipo',row['tipo']);
        vm.set('selectCell',selectCell);
        vm.set('infoCell',infoCell);

        vm.set('hiddenPdf',false);
        vm.set('hiddenInfo',false);

        infoCell['key'] = row['key'];
        infoCell['contract'] = row['contract'];
        infoCell['lab'] = row['lab'];
        infoCell['part_no'] = row['part_no'];
        infoCell['eng_chg_level'] = row['eng_chg_level'];
        infoCell['order_no'] = row['order_no'];
        infoCell['sequence_no'] = row['sc_op_sequence_no'];
        infoCell['release_no'] = row['sc_op_release_no'];
        infoCell['order_no'] = row['order_no'];
        infoCell['tabActive'] = Ext.global.Vars.confMod.main.tabActive;
        infoCell['negativi'] = Ext.global.Vars.confMod.main.filtri.negativi;
        this.recordActive = {
            key:row['key'],
            contract:row['contract'],
            lab:row['lab'],
            part_no:row['part_no'],
            eng_chg_level:row['eng_chg_level']

        };
        this.getView().el.mask(Locale.t('skd.forms.cruscotto.mask'));
        Ext.Ajax.request({
            method: 'POST',
            jsonData: infoCell,
            url: Backend.REST_API + 'forms/cruscotto/getcruscotto/',
            success:function(response){
                me.getView().el.unmask();
                let resp = Ext.decode(response.responseText);
                if (resp['success']===true){
                    me.managerView(infoCell,resp,1);
                }else{
                    me.managerView(infoCell,resp,0);
                }
            },
            failure:function(response){
                me.getView().el.unmask();
                me.managerView(resp,-1);
            }
        });
    },

    /**
     * success 1= success = true
     * success 0= success = false
     * success -1= failure
     *
     * @param infoCell
     * @param resp
     * @param success
     */
    managerView: function (infoCell,resp,success) {
        let vm = this.getViewModel(),
            row = vm.get('row');
        vm.set('pianificazioneStore',resp.data.mag);
        vm.set('testataOdp',resp.data.testataOdp);
        this.getView().removeAll();


        this.pianificazione = Ext.create('skd.view.forms.cruscotto.Pianificazione');

        this.testataOdp = Ext.create('skd.view.forms.cruscotto.TestataOdp');

        this.storeRev = Ext.create('skd.store.forms.cruscotto.Revisioni');
        this.revisioni = Ext.create('skd.view.forms.cruscotto.Revisioni',{
            store:this.storeRev
        });
        this.storeRev.loadData(resp.data.rev);

        //giacenze part_no
        this.storeGiacenza = Ext.create('skd.store.forms.cruscotto.Giacenza');
        this.giacenza = Ext.create('skd.view.forms.cruscotto.Giacenza',{
            store:this.storeGiacenza
        });
        this.storeGiacenza.loadData(resp.data.giacenza);

        //dettaglio giacenzacomponenti
        this.storeGiacenzaComponenti = Ext.create('skd.store.forms.cruscotto.GiacenzaComponenti');
        this.giacenzaComponenti = Ext.create('skd.view.forms.cruscotto.GiacenzaComponenti',{
            store:this.storeGiacenzaComponenti
        });

        let giacenzaComponenti = this.oncheckNegativi(resp.data.giacenzaComponenti);
        this.storeGiacenzaComponenti.loadData(giacenzaComponenti);

        let list = resp.data.odp,
            listObj = [],
            readOnly=false;

        //verifico se è abilitato a modificare gli operatori 2,99
        let abilitato = false;
        if (this.checkRuoli(['99','2'])  ){
            abilitato = true;
        }
        if (row['tipo']!=='ODP'){
            abilitato =false;
        }
        if (abilitato===false){
            readOnly=true;
        }

        for (let i=0;i<list.length;i++){
            if (list[i]['ope_operatore']===null){
                list[i]['ope_operatore']='[ASSENTE]'
            }
            listObj[i]= Ext.create('Ext.form.FieldSet',{
                title:list[i]['ope_operation_no']+' '+list[i]['ope_operation_description'],
                uswindowserCls:'sql-fieldSet',
                collapsible:true,
                collapsed:false,
                defaults:{
                    labelWidth:130,
                    userCls:'label_cruscotto'
                },
                items:[
                    {
                        xtype:'combobox',
                        queryMode: 'remote',
                        fieldLabel: Locale.t('skd.forms.cruscotto.odp.fields.operatore'),
                        flex:1,
                        minChars:2,
                        readOnly:readOnly,
                        bind:{
                            disabled:'{statusApp}',
                            store:'{storeComboOperatore}'
                        },
                        listObj :list[i],
                        displayField: 'ope_operatore',
                        valueField:'ope_operatore',
                        typeAhead: true,
                        value:list[i]['ope_operatore'],
                        forceSelection:true,
                        emptyText:Locale.t('skd.top.filtri.seleziona'),
                        listConfig: {
                            emptyText: Locale.t('skd.top.filtri.grids.operatore.emptyText'),
                            getInnerTpl: function(a,b) {
                                return '<div class="item">' +
                                    '<b>{ope_operatore}</b>'+
                                    ' </div>';
                            }
                        },
                        listeners : {
                            select:'onSelectOperatore'
                        }
                    },
                    {
                        xtype:'displayfield',
                        fieldLabel: Locale.t('skd.forms.cruscotto.odp.fields.ope_work_center_no'),
                        value:list[i]['ope_work_center_no']
                    },
                    {
                        xtype:'displayfield',
                        fieldLabel: Locale.t('skd.forms.cruscotto.odp.fields.ope_op_start_date'),
                        value:list[i]['ope_op_start_date']
                    },
                    {
                        xtype:'displayfield',
                        fieldLabel: Locale.t('skd.forms.cruscotto.odp.fields.ope_op_finish_date'),
                        value:list[i]['ope_op_finish_date']
                    },
                    {
                        xtype:'displayfield',
                        fieldLabel: Locale.t('skd.forms.cruscotto.odp.fields.ope_oper_status_code'),
                        value:'<b>'+list[i]['ope_oper_status_code']+'</b>'
                    },
                    {
                        xtype:'displayfield',
                        fieldLabel: Locale.t('skd.forms.cruscotto.odp.fields.ope_crew_size'),
                        value:list[i]['ope_crew_size']
                    },
                    {
                        xtype:'container',
                        flex: 1,
                        userCls:'goma-odp-hbox',
                        layout: {
                            type: "hbox"
                        },
                        defaults: {
                            flex: 1,
                            labelAlign: 'top',
                            msgTarget: 'under',
                            margin:5
                        },
                        items:[
                            {
                                xtype:'displayfield',
                                userCls:'label_cruscotto',
                                fieldLabel:Locale.t('skd.forms.cruscotto.odp.fields.ope_op_revised_qty_due'),
                                value:list[i]['ope_op_revised_qty_due']
                            },
                            {
                                xtype:'displayfield',
                                fieldLabel:Locale.t('skd.forms.cruscotto.odp.fields.ope_op_qty_complete'),
                                userCls:'label_cruscotto',
                                value:list[i]['ope_op_qty_complete']
                            },
                            {
                                xtype:'displayfield',
                                fieldLabel:Locale.t('skd.forms.cruscotto.odp.fields.ope_res_op_ordine'),
                                userCls:'label_cruscotto',
                                value:list[i]['ope_res_op_ordine']
                            }
                        ]
                    },
                    {
                        msgTarget: 'under',
                        labelAlign: 'top',
                        margin:2,
                        readOnly:true,
                        xtype: 'textareafield',
                        grow: true,
                        growMin: 31,
                        growAppend: 'W',
                        preventScrollbars: true,
                        fieldLabel: Locale.t('skd.forms.cruscotto.odp.fields.nota'),
                        anchor    : '100%',
                        value:list[i]['ope_note_text']
                    }
                ]
            });
        }


        this.form = Ext.create('Ext.form.Panel',{
            padding:5,
            flex:1,
            width:'100%',
            autoHeight: true,
            scrollable: true,
            layout:{
                type:'accordion'
            },
            defaults:{
                xtype:'panel',
                listeners:{
                    expand:'onActivate'
                }
            },
            items:[
                {
                    title:Locale.t('skd.forms.cruscotto.pianificazione.title'),
                    layout: 'fit',
                    userCls:'panel-pianificazione',
                    posizione:'pianificazione',
                    itemId:'pianificazione',
                    items:[
                        {
                            xtype:'panel',
                            scrollable: 'y',
                            items:[
                                this.pianificazione
                            ]
                        }
                    ]
                },
                {
                    title:Locale.t('skd.forms.cruscotto.rev.title'),
                    posizione:'revisioni',
                    userCls:'panel-revisioni',
                    itemId:'revisioni',
                    layout: 'fit',
                    items:[
                        this.revisioni
                    ]
                },
                {
                    title:Locale.t('skd.forms.cruscotto.giacenze.title'),
                    posizione:'giacenza',
                    userCls:'panel-giacenza',
                    itemId:'giacenza',
                    layout: 'fit',
                    items: [
                        this.giacenza
                    ]
                },
                {
                    title:Locale.t('skd.forms.cruscotto.testataodp.title'),
                    layout: 'fit',
                    userCls:'panel-testataOdp',
                    posizione:'testataodp',
                    itemId:'testataodp',
                    items:[
                        {
                            xtype:'panel',
                            scrollable: 'y',
                            items:[
                                this.testataOdp
                            ]
                        }
                    ]
                }
            ]
        });

        this.form.add({
            title:Locale.t('skd.forms.cruscotto.odp.title'),
            layout: 'fit',
            posizione:'odp',
            userCls:'panel-odp',
            itemId:'odp',
            items: [{
                xtype: 'panel',
                scrollable: 'y',
                items: listObj
            }]
        });

        this.form.add({
            title:Locale.t('skd.forms.cruscotto.giacenzacomp.title'),
            posizione:'giacenza-materiali',
            userCls:'panel-materiali',
            itemId:'giacenza-materiali',
            layout: 'fit',
            items: [
                this.giacenzaComponenti
            ]
        });


        this.infoTestata = {
            width:'100%',
            bodyStyle:'padding:5px',
            height:80,
            padding:' 10',
            border:true,
            xtype:'panel',
            html:'<i>Ordine</i>: '+infoCell['order_no']+' - '+infoCell['sequence_no']+' - '+infoCell['release_no']+', <i>Part n°</i>: '+infoCell['part_no']
                +'<br><i>Descrizione:</i> '+resp.data.testataOdp['pa_mag_description']
                +'<br><i>Lab</i>: '+infoCell['lab']+', '+row['sc_op_priority_description']
                +'</br><i>Stato</i>: '+row['sc_op_objstate']+' - <i>Inizio</i>: '+row['start_time']
        };

        this.panelCruscotto = Ext.create('Ext.panel.Panel',{
            layout:{
              type:'vbox'
            },
            items:[
                this.infoTestata,
                this.form
            ]
        });

        this.getView().add( this.panelCruscotto);
        let posizione = 'pianificazione';
        if (Ext.global.Vars.confMod.main.west.posizione){
            posizione = Ext.global.Vars.confMod.main.west.posizione;
        }
        let panel = this.form.down('#'+posizione);
        if (!panel){
            panel = this.form.down('#pianificazione');
            if (!panel){
                return;
            }
        }
        panel.expand();
    },

    onEmptyData:function () {
        this.getView().removeAll();
        this.getView().add({
            xtype:'container',
            html:'Cella vuota'
        });
    },
    onRemoveData:function () {
        this.getView().removeAll();
        this.getView().add({
            xtype:'container',
            html:'nessuna cella selezionata'
        });

        this.getViewModel().set('hiddenPdf',true);
        this.getViewModel().set('hiddenInfo',true);
    },

    onSelectOperatore: function(combo,value){
        let jsonData ={
            contract:this.recordActive.contract,
            part_no:this.recordActive.part_no,
            ope_operation_no:combo.listObj['ope_operation_no'],
            sc_op_order_no:combo.listObj['sc_op_order_no'],
            sc_op_release_no:combo.listObj['sc_op_release_no'],
            sc_op_sequence_no:combo.listObj['sc_op_sequence_no'],
            ope_operatore:value.data.ope_operatore

        };

        Ext.Ajax.request({
            method: 'POST',
            jsonData: jsonData,
            url: Backend.REST_API + 'forms/cruscotto/setoperatore/',
            success:function(response){
                let resp = Ext.decode(response.responseText);
                // if (resp['success']===true){
                //
                // }else{
                //     //TODO
                // }
            },
            failure:function(response){
                //TODO messaggio errore su loaddata gtid
            }
        });

    },
    onActivate:function (panel) {
        this.getView().fireEvent('collapseCruscotto',panel);
    },

    onRenderQty: function (value,meta,record,rowIndex,colIndex,store,view) {
        let v,
            v1 = record.data['qty_supply'] - record.data['qty_demand'];
        if (v1<0){
            v ='-'+Ext.util.Format.number(record.data['qty_demand'],'0,000.0');
            meta.tdCls +=' cell_qta_negativa ';
        }else{
            v =Ext.util.Format.number(record.data['qty_supply'],'0,000.0');
            meta.tdCls +=' cell_qta_positiva ';
        }
        return v;
    },

    onRenderQtyGiacenza: function (value,meta,record,rowIndex,colIndex,store,view) {
        if (value>=0){
            meta.tdCls +=' cell_qta_positiva ';
        } else{
            meta.tdCls +=' cell_qta_negativa ';
        }
        return Ext.util.Format.number(value,'0,000.0');
    },
    onRenderQtyProgettato: function (value,meta,record,rowIndex,colIndex,store,view) {
        if (value>=0){
            meta.tdCls +=' cell_qta_positiva ';
        } else{
            meta.tdCls +=' cell_qta_negativa ';
        }
        meta.tdCls +=' grid_festivo ';
        return Ext.util.Format.number(value,'0,000.00');
        // return value;
    },

    onRenderQtyValue: function (value,meta,record,rowIndex,colIndex,store,view) {
        return Ext.util.Format.number(value,'0,000.0');
    },

    onReloadGiacenzeMateriali:function(resp){
        let giacenzaComponenti = this.oncheckNegativi(resp.data);
        this.storeGiacenzaComponenti.loadData(giacenzaComponenti);
    },
    onChangeFitriNegativi:function(chk,newValue,oldValue){
        let me = this,
            vm = this.getViewModel(),
            selectCell = vm.get('selectCell'),
            infoCell = vm.get('infoCell'),
            selectCellV = vm.get('selectCellV');

        Ext.global.Vars.confMod.main.filtri.negativi=newValue;
        this.setConfMod();
        Ext.Ajax.request({
            method: 'POST',
            jsonData: {
                negativi:newValue,
                selectCell:infoCell
            },
            url: Backend.REST_API + 'forms/cruscotto/getgiacenzereload/',
            success:function(response){
                let resp = Ext.decode(response.responseText);
                me.onReloadGiacenzeMateriali(resp);
            },
            failure:function(response){

            }
        });

    },
    onOpenMateriali:function (view, rowIndex, colIndex, item, opt, record) {
        this.getView().fireEvent('openWinMateriali',view,record);
    },

    oncheckNegativi:function(data){
        let dataFiltri =[],
            filtri = Ext.global.Vars.confMod.main.filtri;

        if (Ext.global.Vars.confMod.main.tabActive==='gridCdl'){
            filtri = Ext.global.Vars.confMod.main.filtriCdl;
        }
        if (Ext.global.Vars.confMod.main.filtri.negativi===true){
            for (let i =0; i<data.length;i++){
                let value = data[i];

                if (filtri.produzione === filtri.acquisti) {
                    if (filtri.giacenza ===0) { //giacenza
                        if (value['p_giacenza_eff']<0){
                            dataFiltri.push(value);
                        }else {
                            if (value['m_giacenza_eff'] < 0) {
                                dataFiltri.push(value);
                            }
                        }
                    }
                    if (filtri.giacenza ===4) { //giacenza presunta
                        if (value['p_giacenza']<0){
                            dataFiltri.push(value);
                        }else {
                            if (value['m_giacenza'] < 0) {
                                dataFiltri.push(value);
                            }
                        }

                    }
                    if (filtri.giacenza ===1) { //giacenza prod
                        if (value['p_giacenza_rda'] <0) {
                            dataFiltri.push(value);
                        }else {
                            if (value['m_giacenza_rda'] < 0) {
                                dataFiltri.push(value);
                            }
                        }
                    }
                    if (filtri.giacenza ===2) { //giacenza no RDA
                        if (value['p_giacenza_pop'] <0) {
                            dataFiltri.push(value);
                        }else{
                            if (value['m_giacenza_pop'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                    }
                    if (filtri.giacenza ===3) { //giacenza no POP RDA
                        if (value['p_giacenza_rda_pop'] <0) {
                            dataFiltri.push(value);
                        }else {
                            if (value['m_giacenza_rda_pop'] < 0) {
                                dataFiltri.push(value);
                            }
                        }
                    }
                } else {
                    if (filtri.produzione === true) {
                        if (filtri.giacenza ===0) { //giacenza
                            if (value['m_giacenza_eff'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===4) { //giacenza presunta
                            if (value['m_giacenza'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===1) { //giacenza prod
                            if (value['m_giacenza_rda'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===2) { //giacenza no RDA
                            if (value['m_giacenza_pop'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===3) { //giacenza no POP RDA
                            if (value['m_giacenza_rda_pop'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                    }
                    if (filtri.acquisti === true) {
                        if (filtri.giacenza ===0) { //giacenza
                            if (value['p_giacenza_eff'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===4) { //giacenza presunta
                            if (value['p_giacenza'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===1) { //giacenza prod
                            if (value['p_giacenza_rda'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===2) { //giacenza no RDA
                            if (value['p_giacenza_pop'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                        if (filtri.giacenza ===3) { //giacenza no POP RDA
                            if (value['p_giacenza_rda_pop'] <0) {
                                dataFiltri.push(value);
                            }
                        }
                    }
                }
            }
            return dataFiltri;
        }

        return data;
    },
    onSetStatusApp:function (syncAll) {
        return
    },
    setConfMod : function() {
        this.setConfModRun++;
        let count = this.setConfModRun,
            task =new Ext.util.DelayedTask(function(count){
                if (count === this.setConfModRun){
                    Ext.Ajax.request({
                        method:'POST',
                        params:{
                            'data':Ext.encode(Ext.global.Vars.confMod)
                        },
                        url:Backend.REST_API+'setconfmod'
                    });
                }
            },this,[count]);
        task.delay(3000);
    }
});
