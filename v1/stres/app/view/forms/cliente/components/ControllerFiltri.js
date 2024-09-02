/**
 * Created by luke on 25/03/22.
 */
Ext.define('stres.view.forms.cliente.components.ControllerFiltri', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    onChangeCliente:function(rdg,newval) {
        let vm = this.getViewModel()
        let comboclienti='';
        let clienti= [];
        if (newval.length>0) {
            Ext.Array.forEach(newval,function(item) {
                clienti.push(item.data.cdcli);
            }, this);
            comboclienti=Ext.encode(clienti);
        }
        vm.set("cdcli", comboclienti) //imposto variabile x filtri
        vm.set("hideart", false) //visualizzo filtro articolo
        if (vm.get("tabattivo")===1) {
            this.reloadChartCli()
        } else {
            let store=this.gridClienti.getStore()
            if (store) {
                store.getProxy().extraParams.cdcli = comboclienti
                store.load()
            }
            let storeart = vm.getStore('articoliStore')
            storeart.getProxy().extraParams.cdcli = comboclienti
        }
    },
    onSpecialkeyCliente: function (item) {
        let vm = this.getViewModel()
        vm.set("cdcli", '') //pulisco variabile x filtri
        vm.set("cdart", '') //pulisco variabile x filtri
        vm.set("hideart", true) //visualizzo filtro articolo
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartCli()
        } else {
            let store=this.gridClienti.getStore()
            if (store) {
                store.getProxy().extraParams.cdcli = ''
                store.getProxy().extraParams.cdart = ''
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
            this.reloadChartCli()
        } else {
            let store=this.gridClienti.getStore()
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
            this.reloadChartCli()
        } else {
            let store=this.gridClienti.getStore()
            if (store) {
                store.getProxy().extraParams.cdart = ''
                store.load()
            }
        }
    }
});