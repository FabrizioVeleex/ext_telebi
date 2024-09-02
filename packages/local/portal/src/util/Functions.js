/**
 * funzioni globali portale
 *
 */

Ext.define('portal.util.Functions', {
    alternateClassName: ['bdFunctions'],
    singleton: true,
    requires:[
        'portal.util.Locale',
        'Ext.dom.Helper'
    ],

    sizeformat: function (filesize) {
        if (filesize >= 1073741824) {
            filesize = this.numberFormat(filesize / 1073741824, 2, '.', '') + ' Gb';
        }
        else {
            // if (filesize >= 1048576) {
            if (filesize >= 1024000) {
               // filesize = this.numberFormat(filesize / 1048576, 2, '.', '') + ' Mb';
                filesize = this.numberFormat(filesize / 1024000, 2, '.', '') + ' Mb';
            }
            else {
                if (filesize >= 1024) {
                    filesize = this.numberFormat(filesize / 1024, 0) + ' Kb';
                }
                else {
                    filesize = this.numberFormat(filesize, 0) + ' bytes';
                }
            }
        }
        return filesize;
    },
    numberFormat: function (number, decimals, dec_point, thousands_sep) {

        let n = number
        let c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
        let d = dec_point === undefined ? "," : dec_point;
        let t = thousands_sep === undefined ? "." : thousands_sep
        let s = n < 0 ? "-" : "";
        let i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
        let ja = i.length > 3 ? j % 3 : 0;
        return s + (ja ? i.substr(0, ja) + t : "") + i.substr(ja).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },
    bpRandomString: function (len) {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        let string_length = len;
        let randomstring = '';
        for (let i = 0; i < string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    },

    zeroPad : function (nr,base){
        let  len = (String(base).length - String(nr).length)+1;
        return len > 0? new Array(len).join('0')+nr : nr;
    },
    checkMounth: function (n) {
        switch (n){
            case 1: return Locale.t('global.mese.01');
            case 2: return Locale.t('global.mese.02');
            case 3: return Locale.t('global.mese.03');
            case 4: return Locale.t('global.mese.04');
            case 5: return Locale.t('global.mese.05');
            case 6: return Locale.t('global.mese.06');
            case 7: return Locale.t('global.mese.07');
            case 8: return Locale.t('global.mese.08');
            case 9: return Locale.t('global.mese.09');
            case 10: return Locale.t('global.mese.10');
            case 11: return Locale.t('global.mese.11');
            case 12: return Locale.t('global.mese.12');
        }

    },
    bdTips: function () {

        let msgCt
        function createBox(t, s, i) {
            if (i==='' || i == null){
                i='fa fa-home  fa-size-64';
            }
            return '<div class="msg">' +
                '   <table style="border-collapse: collapse;">' +
                '       <tr>' +
                '           <td rowspan="2" style="width: 70px;height: 64px;"><span style="display:block;width: 64px;height: 64px;" class="x-btn-icon-el x-btn-icon-el-default-toolbar-large '+i+'"></span></td>' +
                '           <td><h3>' + t + '</h3></td>' +
                '       </tr>' +
                '       <tr>' +
                '           <td>' + s + '</td>' +
                '       </tr>' +
                '   </table>' +
                '</div>';
        }

        return {
            msg: function (title, format,i) {
                if (!msgCt) {
                    msgCt = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
                }
                let s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
                let m = Ext.DomHelper.append(msgCt, createBox(title, s,i), true);
                m.hide();
                m.slideIn('t').ghost("t", {delay: 3000, remove: true});
            },
            init: function () {
                if (!msgCt) {
                    msgCt = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
                }
            }
        };
    }()
});
