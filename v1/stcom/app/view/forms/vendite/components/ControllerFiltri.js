/**
 * Created by luke on 25/03/22.
 */
Ext.define('stcom.view.forms.vendite.components.ControllerFiltri', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.v1-stcom-filtri',
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
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.cdcli = comboclienti
                store.load()
            }
        }
    },
    onSpecialkeyCliente: function (item) {
        let vm = this.getViewModel()
        vm.set("cdcli", '') //pulisco variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.cdcli = ''
                store.load()
            }
        }
    },
    onChangeTipocli:function(rdg,newval) {
        let vm = this.getViewModel()
        vm.set("tipocli", newval.data.codice) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.tipocli = newval.data.codice
                store.load()
            }
        }
    },
    onSpecialkeyTipocli: function (item) {
        let vm = this.getViewModel()
        vm.set("tipocli", '') //imposto variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.tipocli = ''
                store.load()
            }
        }
    },
    onChangeCapoarea:function(rdg,newval) {
        let vm = this.getViewModel()
        let comboarea='';
        let aree= [];
        if (newval.length>0) {
            Ext.Array.forEach(newval,function(item) {
                aree.push(item.data.area);
            }, this);
            comboarea=Ext.encode(aree);
        }
        vm.set("capoarea", comboarea) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.capoarea = comboarea
                store.load()
            }
        }
    },
    onSpecialkeyCapoarea: function (item) {
        let vm = this.getViewModel()
        vm.set("capoarea", '') //imposto variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.capoarea = ''
                store.load()
            }
        }
    },
    onChangeNazione:function(rdg,newval) {
        let me=this,vm = this.getViewModel()
        vm.set("nazione",  newval.data.nazione) //imposto variabile x filtri
        if (newval.data.nazione.toLowerCase()==='italia') {
            vm.set("hideRegione",false)
        } else {
            vm.set("hideRegione",true) //nascondo regione e pulisco valore
            me.regione.clearValue()
            vm.set("regione",  '') //imposto variabile x filtri
        }
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.nazione = newval.data.nazione
                if (newval.data.nazione.toLowerCase()!=='italia') {
                    store.getProxy().extraParams.regione = ''
                }
                store.load()
            }
        }
    },
    onSpecialkeyNazione: function (item) {
        let me=this,vm = this.getViewModel()
        vm.set("nazione",  '') //imposto variabile x filtri
        vm.set("regione",  '') //imposto variabile x filtri
        item.clearValue()
        vm.set("hideRegione",true) //nascondo regione e pulisco valore
        me.regione.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.nazione = ''
                store.getProxy().extraParams.regione = ''
                store.load()
            }
        }
    },
    onChangeRegione:function(rdg,newval) {
        let vm = this.getViewModel()
        let comboregioni='';
        let regioni= [];
        if (newval.length>0) {
            Ext.Array.forEach(newval,function(item) {
                regioni.push(item.data.regione);
            }, this);
            comboregioni=Ext.encode(regioni);
        }
        vm.set("regione", comboregioni) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.regione = comboregioni
                store.load()
            }
        }
    },
    onSpecialkeyRegione: function (item) {
        let vm = this.getViewModel()
        vm.set("regione", '') //imposto variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.regione = ''
                store.load()
            }
        }
    },
    onChangeMese:function(rdg,newval) {
        let vm = this.getViewModel()
        let combomesi='';
        let mesi= [];
        if (newval.length>0) {
            Ext.Array.forEach(newval,function(item) {
                mesi.push(item.data.codice);
            }, this);
            combomesi=Ext.encode(mesi);
        }
        vm.set("mese", combomesi) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.mese = combomesi
                store.load()
            }
        }
    },
    onSpecialkeyMese: function (item) {
        let vm = this.getViewModel()
        item.clearValue()
        vm.set("mese", '') //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartFat()
        } else {
            let store=this.gridVendite.getStore()
            if (store) {
                store.getProxy().extraParams.mese = ''
                store.load()
            }
        }
    }
});