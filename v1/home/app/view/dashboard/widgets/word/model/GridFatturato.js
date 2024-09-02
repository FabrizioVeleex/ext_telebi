/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.word.model.GridFatturato', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'codcli',default:''},
        { name: 'ragsoc',default:''},
        { name: 'fatturato',default:0},
        { name: 'bollettato',default:0},
        { name: 'evaso',default:0},
        { name: 'totriga',default:0},
        { name: 'fattglobale',default:0},
        { name: 'ultimiglobale',default:0},
        { name: 'meseglobale',default:0},
        { name: 'ordglobale',default:0},
        { name: 'ordsuccglobale',default:0},
        { name: 'residuoglobale',default:0}
    ]
});
