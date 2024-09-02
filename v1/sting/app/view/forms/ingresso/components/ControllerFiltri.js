/**
 * Created by luke on 25/03/22.
 */
Ext.define('sting.view.forms.ingresso.components.ControllerFiltri', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-sting-filtri',
    requires: [

    ],
    onChangeFornitore:function(rdg,newval) {
        let vm = this.getViewModel()
        let combofornitori='';
        let fornitori= [];
        if (newval.length>0) {
            Ext.Array.forEach(newval,function(item) {
                fornitori.push(item.data.cdfor);
            }, this);
            combofornitori=Ext.encode(fornitori);
        }
        vm.set("cdfor", combofornitori) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartIng()
        } else {
            let store=this.gridIngressi.getStore()
            if (store) {
                store.getProxy().extraParams.cdfor = combofornitori
                store.load()
            }
        }
    },
    onSpecialkeyFornitore: function (item) {
        let vm = this.getViewModel()
        vm.set("cdfor", '') //pulisco variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartIng()
        } else {
            let store=this.gridIngressi.getStore()
            if (store) {
                store.getProxy().extraParams.cdfor = ''
                store.load()
            }
        }
    },
    onChangeArticolo:function(rdg,newval) {
        let vm = this.getViewModel()
        let comboarticoli='';
        let articoli= [];
        if (newval.length>0) {
            Ext.Array.forEach(newval,function(item) {
                articoli.push(item.data.cdart);
            }, this);
            comboarticoli=Ext.encode(articoli);
        }
        vm.set("cdart", comboarticoli) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartIng()
        } else {
            let store=this.gridIngressi.getStore()
            if (store) {
                store.getProxy().extraParams.cdart = comboarticoli
                store.load()
            }
        }
    },
    onSpecialkeyArticolo: function (item) {
        let vm = this.getViewModel()
        vm.set("cdart", '') //pulisco variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartIng()
        } else {
            let store=this.gridIngressi.getStore()
            if (store) {
                store.getProxy().extraParams.cdart = ''
                store.load()
            }
        }
    },
    onChangeTipo:function(chk,newval) {
        let vm = this.getViewModel()
        vm.set("tipo", newval) //pulisco variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartIng()
        } else {
            let store=this.gridIngressi.getStore()
            if (store) {
                store.getProxy().extraParams.tipo = newval
                store.load()
            }
        }
    }
});