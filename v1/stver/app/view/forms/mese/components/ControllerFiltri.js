/**
 * Created by luke on 25/03/22.
 */
Ext.define('stver.view.forms.mese.components.ControllerFiltri', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    onChangeAnno:function(cmb,newval) {
        let vm = this.getViewModel()
        vm.set("anno", newval.data.anno) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChartMese()
        } else {
            if (vm.get("tabattivo")===2) {
                this.reloadChartMeseProg()
            } else {
                let store=this.gridAndamentoMese.getStore()
                if (store) {
                    store.getProxy().extraParams.anno = newval.data.anno
                    store.load()
                }
            }
        }
    }
});