

/**
 * @param {number} number
 * @param {number} bitPosition - zero based.
 * @return {number}
 */
function getBit(number, bitPosition) {
    return (number >> bitPosition) & 1;
}


var zvtCommands = {
    '0101': { 'bez': 'RFU' },
    '0401': { 'bez': 'Set Date and Time' },
    '040f': { 'bez': 'StatusInformation', 'bmpstart': 6 },
    '04ff': { 'bez': 'IntermediateStatusInformation', 'bmpstart': 8 },
    '0600': { 'bez': 'Registration' },
    '0601': { 'bez': 'Authorization', 'bmpstart': 6 },
    '0602': { 'bez': 'LogOff' },
    '0603': { 'bez': 'AccountBalanceRequest' },
    '0604': { 'bez': 'ActivateCard' },
    '0605': { 'bez': 'Procurement' },
    '060f': { 'bez': 'Completion', 'bmpstart': 6 },
    '0618': { 'bez': 'ResetTerminal' },
    '061a': { 'bez': 'PrintSystemConfiguration' },
    '061b': { 'bez': 'SetResetTerminalID' },
    '061e': { 'bez': 'Abort' },

    '06b0': { 'bez': 'Abort' },
    '0622': { 'bez': 'Reservation' },
    '0630': { 'bez': 'Reversal' },
    '06d3': { 'bez': 'PrintTextBloc', 'bmpstart': 6 },

    '8000': { 'bez': 'Ack', 'bmpstart': 6 }
}

var bmpStruct = {
    '01': { 'leng': 1, 'format': 'binary', 'bez': 'timeout' },
    '02': { 'leng': 1, 'format': 'binary', 'bez': 'Maximal number of status informationseout' },
    '03': { 'leng': 1, 'format': 'binary', 'bez': 'Service byte' },
    '04': { 'leng': 6, 'format': 'bcd', 'bez': 'Amount' },
    '05': { 'leng': 1, 'format': 'binary', 'bez': 'Pump number' },
    '06': { 'leng': 'TLV', 'format': 'TLVcontainer', 'bez': 'TLV-container' },
    '0b': { 'leng': 3, 'format': 'bcd', 'bez': 'Trace number' },
    '0c': { 'leng': 3, 'format': 'bcd', 'bez': 'Time' },
    '0d': { 'leng': 2, 'format': 'bcd', 'bez': 'Date' },
    '0e': { 'leng': 2, 'format': 'bcd', 'bez': 'ExpiryDate' },
    '17': {
        'bez': 'Card sequence-number',
        'leng': 2,
        'format': 'bcd'
    },
    '19': {
        'bez': 'typ',
        'leng': 1,
        'format': 'binary'
    },
    '22': {
        'bez': 'pan',
        'leng': 'LL',
        'format': 'bcd'
    },
    '27': {
        'bez': 'Result Code',
        'leng': 1,
        'format': 'binary'
    },
    '29': {
        'bez': 'tid',
        'leng': 4,
        'format': 'bcd'
    },
    '2a': {
        'bez': 'VU-number',
        'leng': 15,
        'format': 'ASCII'
    },


    '3b': {
        'bez': 'AID authorisation-attribute',
        'leng': 8,
        'format': 'binary'
    },

    '49': {
        'bez': 'currency',
        'leng': 2,
        'format': 'bcd'
    }, '3c': {
        'bez': 'additionalData...',
        'leng': 'LLL',
        'format': 'bcd'
    }, '60': {
        'bez': 'Individual totals...',
        'leng': 'LLL',
        'format': 'bcd'
    },
    '87': {
        'bez': 'Receipt-number',
        'leng': 2,
        'format': 'bcd'
    },
    '8a': { 'leng': 1, 'format': 'binary', 'bez': 'Card-type' },
    '8b': { 'leng': 'LL', 'format': 'bcd', 'bez': 'Card-name' },
    '8c': { 'leng': 1, 'format': 'binary', 'bez': 'Card-type-ID' }


}



var errorMessage = {
    //'00': 'no error',
    '64': 'card not readable',
    '65': 'card-data not present',
    '66': 'processing-error',
    '67': 'function not permitted for ec- and Maestro-cards',
    '68': 'function not permitted for credit- and tank-cards',
    '6c': 'abort via timeout or abort-key'
}



//2703140101
var tlvStruct = {
    '01': { 'bez': 'reversal-ID' },
    '02': { 'bez': 'driver-number' },
    '03': { 'bez': 'auto-number' },
    '04': { 'bez': 'mileage' },
    '0a': { 'bez': 'ZVT-command' },

    '10': { 'bez': 'number of columns and number of lines merchant-display' },
    '12': { 'bez': 'number of characters per line of the printer' },
    '14': { 'bez': 'ISO character set' },
    '15': { 'bez': 'Language-code' },

    '1a': { 'bez': 'maximum length of the APDU' },

    '1f01': { 'bez': 'receipt-ID' },
    '1f04': { 'bez': 'receipt-parameter' },
    '1f05': { 'bez': 'transaction-parameter' },

    '1f10': { 'bez': 'cardholder authentication' },
    '1f11': { 'bez': 'online flag' },
    '1f12': { 'bez': 'card-technology' },

    '26': { 'bez': 'list of permitted ZVT-Commands' },
    '27': { 'bez': 'list of supported character-sets' },
    '28': { 'bez': 'list of supported languages' },

    '2f': { 'bez': 'payment-type' },
    '40': { 'bez': 'EMV-config-parameter' }

};

function getTlvLength(meldung, tlvStart) {
    let tlvLength = {};

    let tlvleng = parseInt(meldung.substr(tlvStart, 2), 16);
    tlvLength['len'] = 2;
    tlvLength['tlvleng'] = tlvleng;

    if (tlvleng <= 127) {
        //bmpleng = tlvleng;
        tlvLength['tlvleng'] = tlvleng;
    } else if (tlvleng == 129) {
        //one length-byte follows
        tlvLength['tlvleng'] = parseInt(meldung.substr(start, 2), 16);
        tlvLength['len'] += 2;
    } else if (tlvleng == 130) {
        //tow length-byte follows
        let tlvlengHigh = parseInt(meldung.substr(start, 2), 16);
        tlvLength['len'] += 2;
        let tlvlengLow = parseInt(meldung.substr(start, 2), 16);
        tlvLength['len'] += 2;
        bmpleng = (tlvlengHigh * 255) + tlvlengLow;
        tlvLength['tlvleng'] = (tlvlengHigh * 255) + tlvlengLow;;
    } else {
        // ERROR tlvleng nicht definiert
        console.error('tlvleng nicht definiert ' + tlvleng);
        tlvLength['len'] = 1000;
        tlvLength['tlvleng'] = 1000;
    }
    console.log('tlvLength ' + JSON.stringify(tlvLength));
    return tlvLength;
}

function getTlvTag(meldung, tlvStart) {
    let tlvTagInfo = {};
    //Defautvalue (Error)
    tlvTagInfo['tagNr'] = 0;
    tlvTagInfo['bez'] = 'unbekannt';

    let tag = meldung.substr(tlvStart, 2);
    tlvStart += 2;
    tlvTagInfo['len'] = 2;
    let tagNr = parseInt(tag, 16);

    // die letzen 5 Bit sind gesetzt
    let tagNumberInNextByte = ((tagNr & 31) == 31);
    if (tagNumberInNextByte) {
        console.info('tagNumberInNextByte');
        tag += meldung.substr(tlvStart, 2);
        tlvStart += 2;
        tlvTagInfo['len'] = 4;

        tagNr = parseInt(tag, 16);
        let notLastByte = getBit(tagNr, 7);
        if (notLastByte) {
            console.error('notLastByte not suportet');
        }
    }

    let constructedDataObject = getBit(tagNr, 5);
    tlvTagInfo['tag'] = tag;
    tlvTagInfo['tagNr'] = tagNr;
    tlvTagInfo['constructedDataObject'] = constructedDataObject;

    if (tag in tlvStruct) {
        tlvTagInfo['bez'] = tlvStruct[tag]['bez'];
    }

    // console.log('getTlvTag tag ' + tag + ' tagNr:' + tagNr + ' tagNumberInNextByte:' + tagNumberInNextByte + ' Bits: ' + tagNr.toString(2) + ' tlvTagInfo: ' + JSON.stringify(tlvTagInfo));

    return tlvTagInfo;
}

function getTLVBmpInfo(meldung, tlvStart) {
    console.log('getTLVBmpInfo tlvStart:' + tlvStart + ' meldung ' + meldung);
    let returnvalue = [];

    let searchnext = true;
    while (searchnext) {
        let tlv = {};
        let tagInfo = getTlvTag(meldung, tlvStart);
        tlvStart += tagInfo['len'];

        let tag = tagInfo['tag'];

        tlv[tag] = {};
        tlv[tag]['bez'] = tagInfo['bez'];

        if (tagInfo['bez'] == 'unbekannt') {
            console.error('unbekantes tlv tag:' + tag);
        }
        if (tag in tlvStruct) {
            tlv[tag]['bez'] = tlvStruct[tag]['bez'];
        }

        let tlvLength = getTlvLength(meldung, tlvStart);

        let tlvleng = tlvLength['tlvleng'];
        if (isNaN(tlvleng) !== false) {
            console.error('unbekante tlvleng: ' + tlvleng);
            searchnext = false;
        }

        tlvStart += tlvLength['len'];

        tlv[tag]['tlvleng'] = tlvleng;
        tlv[tag]['val'] = meldung.substr(tlvStart, 2 * tlvleng);

        //console.log('tlv tag ' + tag + ' (len ' + tlvLength['len'] + ') tlvleng:' + tlvleng + 'val ' + tlv[tag]['val']  +' tlvStart:'+tlvStart);

        if (tagInfo['constructedDataObject']) {
            //console.log('tag ' + tag + ' constructedDataObject tlvStart:' + tlvStart);
            tlv[tag]['val2'] = [];
            let meldung2 = meldung.substr(tlvStart, 2 * tlvleng)

            let tlv2 = getTLVBmpInfo(meldung2, 0);
            tlvStart += meldung2.length;
            //console.log('tag ' + tag + ' constructedDataObject meldung2.leng:' +meldung2.length+'  tlvStart: ' +tlvStart);
            //console.log('getTLVBmpInfo val2.push :' + JSON.stringify(tlv2));
            tlv[tag]['val2'].push(tlv2);
            //console.log('constructedDataObject tag ' + tag + '  tlvStart: ' + tlvStart + ' ml: ' + meldung.length  +' tlvleng:'+tlvleng);

            if (isNaN(tlvStart) !== false) {
                console.error('tlvStart ungültig ');
                searchnext = false;
            }
            if (tlvStart >= meldung.length) {
                searchnext = false;
            }
        } else {
            tlvStart += (2 * tlvleng);
            //console.log('primitiveDataObject tag ' + tag + ' tlvStart: ' + tlvStart + ' ml: ' + meldung.length);
            if (tlvStart >= meldung.length) {
                searchnext = false;
            }
        }

        //console.log('getTLVBmpInfo returnvalue.push :' + JSON.stringify(tlv));
        returnvalue.push(tlv);
    }

    //console.log('getTLVBmpInfo return :' + JSON.stringify(returnvalue));
    return returnvalue;
}

function getZvtBmpInfo(meldung, start) {
    let bmps = {};
    let bmpOk = true;
    while (bmpOk) {
        let bmp = meldung.substr(start, 2);
        start += 2;

        if (bmp.length == 0) {
            bmpOk = false;
            break;
        }
        console.log("bmp: " + bmp);
        bmps[bmp] = {};
        if (bmp in bmpStruct) {
            bmps[bmp]['bez'] = bmpStruct[bmp]['bez'];
            let bmpleng = bmpStruct[bmp]['leng'];
            bmps[bmp]['format'] = bmpStruct[bmp]['format'];
            if (bmpleng == 'LL') {
                bmpleng = meldung.substr(start + 1, 1);
                start += 2;
                bmpleng += meldung.substr(start + 1, 1);
                start += 2;
                bmpleng = parseInt(bmpleng);
            } else if (bmpleng == 'LLL') {
                bmpleng = meldung.substr(start + 1, 1);
                start += 2;
                bmpleng += meldung.substr(start + 1, 1);
                start += 2;
                bmpleng += meldung.substr(start + 1, 1);
                start += 2;
                bmpleng = parseInt(bmpleng);
            } else if (bmpleng == 'TLV') {

                let tlvLength = getTlvLength(meldung, start);
                start += tlvLength['len'];
                let tlvleng = tlvLength['tlvleng'];
                bmpleng = tlvleng;
                let val = meldung.substr(start);
                bmps[bmp]['val'] = val;
            }

            bmps[bmp]['leng'] = bmpleng;
            if (isNaN(bmpleng) !== false) {
                console.error('unbekannte BMP Länge: ' + bmpleng);
                var statusInfo = document.getElementById('status');
                statusInfo.innerHTML += ' unbekannte BMP Länge: ' + bmpleng;
                statusInfo.setAttribute("style", "background-color:yellow");

                break;
            }

            if (bmpStruct[bmp]['format'] == 'binary') {
                bmpleng = 2 * bmpleng;
                let val = meldung.substr(start, bmpleng);
                start += bmpleng;
                bmps[bmp]['val'] = val;

                if (bmp == '27') {
                    //Result Code
                    if (val in errorMessage) {
                        bmps[bmp]['valBez'] = errorMessage[val];
                    }
                }


            } else if (bmpStruct[bmp]['format'] == 'bcd') {
                bmpleng = 2 * bmpleng;
                let val = meldung.substr(start, bmpleng);
                start += bmpleng;
                bmps[bmp]['val'] = val;

                if (bmp == '04') {
                    //amount in x.xx Format wandeln
                    let amount = parseInt(val);
                    if (isNaN(amount) === false) {
                        bmps[bmp]['val'] = (amount / 100).toFixed(2);
                    }
                }
            } else if (bmpStruct[bmp]['format'] == 'ASCII') {
                bmpleng = 2 * bmpleng;
                let val = meldung.substr(start, bmpleng);
                start += bmpleng;

                var str = '';
                for (var i = 0; i < val.length; i += 2) {
                    str += String.fromCharCode(parseInt(val.substr(i, 2), 16));
                }
                bmps[bmp]['val'] = str;
            } else if (bmpStruct[bmp]['format'] == 'TLVcontainer') {
                bmpleng = 2 * bmpleng;
                let tlv = getTLVBmpInfo(meldung.substr(start), 0);

                console.log('start = start (' + start + ') + bmpleng (' + bmpleng + ')');
                start += bmpleng;

                bmps[bmp]['tlv'] = tlv;

            } else {
                bmps[bmp]['ERROR'] = 'unbekanntes BMP Format';
                var statusInfo = document.getElementById('status');
                statusInfo.innerHTML += ' ' + bmps[bmp]['ERROR'];
                statusInfo.setAttribute("style", "background-color:yellow");
            }
        } else {
            var statusInfo = document.getElementById('status');
            statusInfo.innerHTML += ' unbekanntes BMP' + bmp;
            statusInfo.setAttribute("style", "background-color:yellow");
            bmps[bmp]['ERROR'] = 'unbekanntes BMP';
            bmpOk = false;
        }
    }
    return bmps;
}

function getZvtMessage(meldung) {
    meldung = meldung.toLowerCase();
    var istatusBez = {
        '02': { 'bez': 'Please watch PIN - Pad' },
        '03': { 'bez': 'Not accepted', 'error': true },
        '04': { 'bez': 'PT is waiting for response from FEP' },
        '07': { 'bez': 'Card not admitted', 'error': true },
        '08': { 'bez': 'Card unknown', 'error': true },
        '09': { 'bez': 'Expired card', 'error': true },
        '0a': { 'bez': 'Insert card' },
        '0b': { 'bez': 'Please remove card!' },
        '0c': { 'bez': 'Card not readable', 'error': true },
        '0d': { 'bez': 'Processing error', 'error': true },
        '0e': { 'bez': 'Please wait...' },
        '10': { 'bez': 'Invalid card', 'error': true },
        '12': { 'bez': 'System malfunction', 'error': true },
        '13': { 'bez': 'Payment not possible', 'error': true },
        '17': { 'bez': 'Please wait...' },
        'd2': { 'bez': 'Connecting dial-up' }
    }

    let zvtMessage = {};
    let ccrc = meldung.substr(0, 2);
    let aprc = meldung.substr(2, 2);

    zvtMessage['ccrc'] = ccrc;
    zvtMessage['aprc'] = aprc;
    zvtMessage['msglen'] = meldung.length;
    let cmd = ccrc + aprc;
    if (cmd in zvtCommands) {
        console.log('zvtCommands exist:  ' + cmd);
        zvtMessage['command'] = zvtCommands[cmd]['bez'];

        if (cmd == '0600') {
            // 'Registration'
            if (meldung.length > 12) {
                zvtMessage['password'] = meldung.substr(6, 6);
            }
            if (meldung.length > 14) {
                zvtMessage['config-byte'] = meldung.substr(12, 2);
            }
            if (meldung.length > 14) {
                zvtMessage['CC'] = meldung.substr(14, 4);
                zvtCommands[cmd]['bmpstart'] = 18;
            }



        } else if (cmd == '04ff') {
            //IntermediateStatusInformationformation
            istatus = meldung.substr(6, 2);
            zvtMessage['status'] = {};
            zvtMessage['status']['code'] = istatus;
            if (istatus in istatusBez) {
                zvtMessage['status']['bez'] = istatusBez[istatus]['bez'];
                if (istatusBez[istatus]['error']) {
                    zvtMessage['error'] = istatusBez[istatus]['bez'];
                }
            }
            if (meldung.length > 10) {
                zvtMessage['timeout'] = meldung.substr(8, 2);
                zvtCommands[cmd]['bmpstart'] = 10;
            }
        }

    }

    if (zvtCommands[cmd])
        if (zvtCommands[cmd]['bmpstart']) {
            var bmps = getZvtBmpInfo(meldung, zvtCommands[cmd]['bmpstart']);
            zvtMessage['bmp'] = bmps;
        }
    return zvtMessage;
}



export { getZvtMessage, getZvtBmpInfo, getTLVBmpInfo }; // a list of exported variables