/**
 * Created by luke on 25/03/22.
 */
Ext.define('stcom.view.forms.articoli.components.ControllerFiltri', {
    extend: 'Ext.app.ViewController',
   // alias: 'controller.v1-stcom-filtri',
    requires: [

    ],
    onChangeClasse:function(rdg,newval) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        let comboclassi='';
        let classi= [];
        if (newval.length>0) {
            Ext.Array.forEach(newval,function(item) {
                classi.push(item.data.clm);
            }, this);
            comboclassi=Ext.encode(classi);
        }
        vm.set("clm", comboclassi) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.clm = comboclassi
                store.load()
            }
        }
    },
    onSpecialkeyClasse: function (item) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        vm.set("clm", '') //pulisco variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.clm = ''
                store.load()
            }
        }
    },
    onChangeArticolo:function(rdg,newval) {
        this.onCloseDettaglio()
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
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.cdart = comboarticoli
                store.load()
            }
        }
    },
    onSpecialkeyArticolo: function (item) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        vm.set("cdart", '') //pulisco variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.cdart = ''
                store.load()
            }
        }
    },
    onChangeCliente:function(rdg,newval) {
        this.onCloseDettaglio()
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
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.cdcli = comboclienti
                store.load()
            }
        }
    },
    onSpecialkeyCliente: function (item) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        vm.set("cdcli", '') //pulisco variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.cdcli = ''
                store.load()
            }
        }
    },
    onChangeTipocli:function(rdg,newval) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        vm.set("tipocli", newval.data.codice) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.tipocli = newval.data.codice
                store.load()
            }
        }
    },
    onSpecialkeyTipocli: function (item) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        vm.set("tipocli", '') //imposto variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.tipocli = ''
                store.load()
            }
        }
    },
    onChangeCapoarea:function(rdg,newval) {
        this.onCloseDettaglio()
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
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.capoarea = comboarea
                store.load()
            }
        }
    },
    onSpecialkeyCapoarea: function (item) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        vm.set("capoarea", '') //imposto variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.capoarea = ''
                store.load()
            }
        }
    },
    onChangeNazione:function(rdg,newval) {
        this.onCloseDettaglio()
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
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
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
        this.onCloseDettaglio()
        let me=this,vm = this.getViewModel()
        vm.set("nazione",  '') //imposto variabile x filtri
        vm.set("regione",  '') //imposto variabile x filtri
        item.clearValue()
        vm.set("hideRegione",true) //nascondo regione e pulisco valore
        me.regione.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.nazione = ''
                store.getProxy().extraParams.regione = ''
                store.load()
            }
        }
    },
    onChangeRegione:function(rdg,newval) {
        this.onCloseDettaglio()
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
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.regione = comboregioni
                store.load()
            }
        }
    },
    onSpecialkeyRegione: function (item) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        vm.set("regione", '') //imposto variabile x filtri
        item.clearValue()
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.regione = ''
                store.load()
            }
        }
    },
    onChangeMese:function(rdg,newval) {
        this.onCloseDettaglio()
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
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.mese = combomesi
                store.load()
            }
        }
    },
    onSpecialkeyMese: function (item) {
        this.onCloseDettaglio()
        let vm = this.getViewModel()
        item.clearValue()
        vm.set("mese", '') //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartArt()
        } else {
            let store=this.gridArticoli.getStore()
            if (store) {
                store.getProxy().extraParams.mese = ''
                store.load()
            }
        }
    },
    onCloseDettaglio:function() {
        //chiudo righe espanse
        let grid=this.gridArticoli
        let rowExpander = grid.getPlugin('clientiDettaglio');
        let expandedRecords = rowExpander.recordsExpanded;
        let currentExpandedRecord;
        let currentInternalId = 0; // start from 1
        let currentIndex = -1; // start from 0
        for(let prop in expandedRecords) {
            if(expandedRecords.hasOwnProperty(prop)) {
                currentInternalId = parseInt(prop, 10);
                currentExpandedRecord = grid.store.getByInternalId(currentInternalId);
                currentIndex = grid.store.indexOf(currentExpandedRecord);
                rowExpander.toggleRow(currentIndex, currentExpandedRecord);
            }
        }
    }
});