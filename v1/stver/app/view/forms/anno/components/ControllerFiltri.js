/**
 * Created by luke on 25/03/22.
 */
Ext.define('stver.view.forms.anno.components.ControllerFiltri', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    onChangeAnno:function(cmb,newval) {
        let vm = this.getViewModel()
        vm.set("anno", newval.data.anno) //imposto variabile x filtri
        if (vm.get("tabattivo")===1) {
            this.reloadChart()
        } else {
            let store=this.gridAndamento.getStore()
            if (store) {
                store.getProxy().extraParams.anno = newval.data.anno
                store.load()
            }
        }
    }
});