

/**
 * @param {number} number
 * @param {number} bitPosition - zero based.
 * @return {number}
 */
function getBit(number, bitPosition) {
    return (number >> bitPosition) & 1;
}


// ECR-Interface ZVT-Protocol Revision 13.11, Date 20.07.2023
// Kapitel 14 Summary of Commands
var zvtCommands = {
    '0101': { 'bez': 'RFU' },
    '0401': { 'bez': 'Set Date and Time' },
    '040d': { 'bez': 'Input-Request' },
    '040e': { 'bez': 'Menu-Request' },

    '040f': { 'bez': 'StatusInformation' },
    '04ff': { 'bez': 'IntermediateStatusInformation' },

    //[<password>[03<service-byte>][06<TLV-container>]]
    '0501': { 'bez': 'Status-Enquiry' },
    '05ff': { 'bez': 'RFU' },


    '0600': { 'bez': 'Registration' },
    '0601': { 'bez': 'Authorization' },
    '0602': { 'bez': 'LogOff' },
    '0603': { 'bez': 'AccountBalanceRequest' },
    '0604': { 'bez': 'ActivateCard' },
    '0605': { 'bez': 'Procurement' },
    //<prepaid-card-ID 2 byte, BCD> <payment-mode 1 byte> 04<amount>
    '0609': { 'bez': 'Top-Up Prepaid-Cards', 'bmpstartDefault': 12 },
    '060a': { 'bez': 'Tax Free' },
    '060b': { 'bez': 'RFU' },
    '060c': { 'bez': 'Book Tip' },
    '060f': { 'bez': 'Completion' },
    '0610': { 'bez': 'Send Turnover Totals' },
    '0611': { 'bez': 'RFU' },
    '0612': { 'bez': 'Print Turnover Receipts' },
    '0618': { 'bez': 'ResetTerminal' },
    '061a': { 'bez': 'PrintSystemConfiguration' },
    '061b': { 'bez': 'SetResetTerminalID' },
    '061e': { 'bez': 'Abort' },
    '0620': { 'bez': 'Repeat Receipt' },
    '0621': { 'bez': 'Telephonic Authorisation' },
    '0622': { 'bez': 'Reservation' },
    '0623': { 'bez': 'Partial-Reversal of a Pre-Authorisation / Booking of a Reservation' },
    '0624': { 'bez': 'Book Total' },

    '0625': { 'bez': 'Pre-Authorisation Reversal' },
    '0626': { 'bez': 'Reversal of external transaction (Reservation)' },
    '0630': { 'bez': 'Reversal' },
    '0631': { 'bez': 'Refund' },
    '0650': { 'bez': 'End-of-Day' },
    '0651': { 'bez': 'Send offline Transactions' },
    '0652': { 'bez': 'Partial reconciliation' },
    '0670': { 'bez': 'Diagnosis' },
    '0679': { 'bez': 'Selftest' },
    '0682': { 'bez': 'RFU' },
    '0685': { 'bez': 'Display Text (old version)' },
    '0686': { 'bez': 'Display Text with Numerical Input (old version)' },
    '0687': { 'bez': 'PIN-Verification for Customer-Card (old version)' },
    '0688': { 'bez': 'Display Text with Function-Key Input (old version)' },



    '0690': { 'bez': 'RFU' },
    '0691': { 'bez': 'Set Date and Time in PT' },
    '0693': { 'bez': 'Initialisation' },
    '0695': { 'bez': 'Change Password' },
    '06b0': { 'bez': 'Abort' },
    '06c0': { 'bez': 'Read Card' },
    '06c1': { 'bez': 'reserved' },
    '06c2': { 'bez': 'reserved' },
    '06c3': { 'bez': 'reserved' },
    '06c4': { 'bez': 'reserved' },
    '06c5': { 'bez': 'Close Card Session' },
    '06c6': { 'bez': 'Send APDUs' },
    '06ce': { 'bez': 'RFU' },
    '06d0': { 'bez': 'Menu selection with graphic display' },
    '06d1': { 'bez': 'Print Line on PT' },
    '06d3': { 'bez': 'PrintTextBloc' },
    '06d4': { 'bez': 'RUF' },
    '06d8': { 'bez': 'Dial-Up' },
    '06d9': { 'bez': 'Transmit Data via Dial-Up' },
    '06da': { 'bez': 'Receive Data via Dial-Up' },
    '06db': { 'bez': 'Hang-Up' },
    '06dd': { 'bez': 'Transparent-Mode' },
    '06e0': { 'bez': 'Display Text' },
    '06e1': { 'bez': 'Display Text with Function-Key Input' },
    '06e2': { 'bez': 'Display Text with Numerical Input' },
    '06e3': { 'bez': 'PIN-Verification for Customer-Card' },
    '06e4': { 'bez': 'Blocked-List Query to ECR' },
    '06e5': { 'bez': 'MAC calculation' },
    '06e6': { 'bez': 'Card Poll with Authorization' },
    '06e7': { 'bez': 'Display Text with Numerical Input with DUKPT Encryption' },
    '06f0': { 'bez': 'Display Image' },

    '0801': { 'bez': 'Activate Service-Mode' },
    //0802 <protocol-type 1 byte>
    '0802': { 'bez': 'Switch Protocol' },
    //0803 <Service-PW> 06<TLV-container>
    '0803': { 'bez': 'Configure Power Management' },
    '0810': { 'bez': 'Software-Update' },
    '0811': { 'bez': 'Read File' },
    '0812': { 'bez': 'Delete File' },
    '0813': { 'bez': 'Change Configuration' },
    '0814': { 'bez': 'Write File' },
    '0820': { 'bez': 'Start OPT Action' },
    '0821': { 'bez': 'Set OPT Point-in-Time' },
    '0822': { 'bez': 'Start OPT Pre-Initialisation' },
    '0823': { 'bez': 'Output OPT-Data' },
    '0824': { 'bez': 'OPT Out-of-Order' },
    '0830': { 'bez': 'Select Language' },
    '0840': { 'bez': 'Change Baudrate' },
    '0850': { 'bez': 'Activate Card-Reader' },


    '0fca': { 'bez': 'ChipActivator' },

    '8000': { 'bez': 'Ack', 'bmpstartDefault': 6 },
    '8400': { 'bez': 'Ack' },
    //84xx NAK
    '8483': { 'bez': 'NAK unknown bitmaps' },
    '849c': { 'bez': 'Repeat Status Information' }

}


// ECR-Interface ZVT-Protocol Revision 13.11, Date 20.07.2023
// Kapitel 13 Summary of utilised BMPs
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
    '17': { 'leng': 2, 'format': 'bcd', 'bez': 'Card sequence-number' },
    '19': { 'leng': 1, 'format': 'binary', 'bez': 'typ' },
    '22': { 'leng': 'LL', 'format': 'bcd', 'bez': 'pan' },
    '23': { 'leng': 'LL', 'format': 'binary', 'bez': 'Track 2 data' },
    '24': { 'leng': 'LLL', 'format': 'binary', 'bez': 'Track 3 data' },
    '27': { 'leng': 1, 'format': 'binary', 'bez': 'Result Code' },
    '29': { 'leng': 4, 'format': 'bcd', 'bez': 'tid' },
    '2a': { 'leng': 15, 'format': 'ASCII', 'bez': 'VU-number' },
    '2d': { 'leng': 'LL', 'format': 'binary', 'bez': 'Track 1 data' },
    '2e': { 'leng': 'LLL', 'format': 'binary', 'bez': 'Synchronous chip data' },
    '37': { 'leng': 3, 'format': 'bcd', 'bez': 'Trace-number' },
    '3a': { 'leng': 2, 'format': 'bcd', 'bez': 'CVV/CVC value' },
    '3b': { 'leng': 8, 'format': 'binary', 'bez': 'AID authorisation-attribute' },
    '3c': { 'leng': 'LLL', 'format': 'bcd', 'bez': 'additionalData...' },
    '3d': { 'leng': 3, 'format': 'bcd', 'bez': 'Password' },
    '49': { 'leng': 2, 'format': 'bcd', 'bez': 'currency' },
    '60': { 'leng': 'LLL', 'format': 'bcd', 'bez': 'Individual totals...' },
    '70': { 'leng': 4, 'format': 'binary', 'bez': 'Uniquely identifies Display Image request' },
    '71': { 'leng': 4, 'format': 'binary', 'bez': 'Total size of the image that will be displayed' },
    '72': { 'leng': 1, 'format': 'binary', 'bez': 'MIME type of the image.' },
    '73': { 'leng': 1, 'format': 'binary', 'bez': 'image encoding type' },
    '74': { 'leng': 1, 'format': 'binary', 'bez': 'Total number of chunks of the image to display' },
    '75': { 'leng': 1, 'format': 'binary', 'bez': 'Index of the chunk of the image data' },
    '87': { 'leng': 2, 'format': 'bcd', 'bez': 'Receipt-number' },
    '88': { 'leng': 3, 'format': 'bcd', 'bez': 'Turnover record number' },
    '8a': { 'leng': 1, 'format': 'binary', 'bez': 'Card-type' },
    '8b': { 'leng': 'LL', 'format': 'bcd', 'bez': 'Card-name' },
    '8c': { 'leng': 1, 'format': 'binary', 'bez': 'Card-type-ID' },
    '9a': { 'leng': 'LLL', 'format': 'binary', 'bez': 'GeldKarte payments-/ failed-payment record/total record Geldkarte' },
    'a0': { 'leng': 1, 'format': 'binary', 'bez': 'Result-code-AS' },
    'a7': { 'leng': 'LL', 'format': 'binary', 'bez': 'Chip-data, EF_ID' },
    'aa': { 'leng': 3, 'format': 'bcd', 'bez': 'Date' },
    'af': { 'leng': 'LLL', 'format': 'binary', 'bez': 'EF_Info' },
    'ba': { 'leng': 5, 'format': 'binary', 'bez': 'AID-parameter' },
    'd0': { 'leng': 1, 'format': 'binary', 'bez': 'Algorithm key' },
    'd1': { 'leng': 'LL', 'format': 'binary', 'bez': 'Card offset/PIN-data' },
    'd2': { 'leng': 1, 'format': 'binary', 'bez': 'Card output direction' },
    'd3': { 'leng': 1, 'format': 'binary', 'bez': 'DUKPT key identifier' },
    'e0': { 'leng': 1, 'format': 'binary', 'bez': 'Minimal length of the input' },
    'e1': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 1' },
    'e2': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 2' },
    'e3': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 3' },
    'e4': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 4' },
    'e5': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 5' },
    'e6': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 6' },
    'e7': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 7' },
    'e8': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text2 line 8' },
    'e9': { 'leng': 1, 'format': 'binary', 'bez': 'Maximal length of the input' },
    'ea': { 'leng': 1, 'format': 'binary', 'bez': 'Echo the input' },
    'eb': { 'leng': 8, 'format': 'binary', 'bez': 'MAC over text 1 and text 2' },
    'f0': { 'leng': 1, 'format': 'binary', 'bez': 'Display-duration in seconds' },
    'f1': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 1' },
    'f2': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 2' },
    'f3': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 3' },
    'f4': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 4' },
    'f5': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 5' },
    'f6': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 6' },
    'f7': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 7' },
    'f8': { 'leng': 'LL', 'format': 'ASCII', 'bez': 'Text1 line 8' },
    'f9': { 'leng': 1, 'format': 'binary', 'bez': 'Number of beep-tones' },
    'fa': { 'leng': 1, 'format': 'binary', 'bez': 'Card reader activation' },
    'fb': { 'leng': 1, 'format': 'binary', 'bez': 'Confirmation the input with OK required' },
    'fc': { 'leng': 1, 'format': 'binary', 'bez': 'Dialog-control' },
    'fd': { 'leng': 1, 'format': 'binary', 'bez': 'Display device on which text should be shown' }
}


var zvtCardType = {
    1: 'DouglasCard',
    5: 'girocard',
    6: 'Mastercard',
    8: 'American Express',
    10: 'Visa',
    11: 'VISA electron',
    12: 'Diners',
    13: 'V PAY',
    14: 'JCB',
    15: 'REKA Card',
    46: 'Maestro'
}
var errorMessage = {
    //'00': 'no error',
    //01-63 errorcodes from network- operator system/authorisation-system
    '64': 'card not readable',
    '65': 'card-data not present',
    '66': 'processing-error',
    '67': 'function not permitted for ec- and Maestro-cards',
    '68': 'function not permitted for credit- and tank-cards',
    '6a': 'turnover-file full',
    '6b': 'function deactivated (PT not registered)',
    '6c': 'abort via timeout or abort-key',
    '6e': 'card in blocked-list',
    '6f': 'wrong currency',
    '71': 'credit not sufficient (chip-card)',
    '72': 'chip error',
    '73': 'card-data incorrect (e.g. country-key check, checksum-error)',
    '74': 'DUKPT engine exhausted',
    '75': 'text not authentic',
    '76': 'PAN not in white list',
    '77': 'end-of-day batch not possible',
    '78': 'card expired',
    '79': 'card not yet valid',
    '7a': 'card unknown',
    '7b': 'fallback to magnetic stripe not possible',
    '7c': 'fallback to magnetic stripe not possible',
    '7d': 'communication error',
    '7e': 'fallback to magnetic stripe not possible',
    '83': 'function not possible',
    '85': 'key missing',
    '89': 'PIN-pad defective',
    '9a': 'ZVT protocol error',
    '9b': 'error from dial-up/communication fault',
    '9c': 'please wait',
    'a0': 'receiver not ready',

    'f0': 'open end-of-day batch present',
    'f1': 'ec-cash/Maestro offline error',
    'f5': 'OPT-error',
    'f6': 'OPT-data not available (= OPT personalisation required)',
    'fa': 'error transmitting offline-transactions (clearing error)',
    'fb': 'turnover data-set defective',
    'fc': 'necessary device not present or defective',
    'fd': 'baudrate not supported',
    'fe': 'register unknown',
    'ff': 'system error'






}



// ECR-Interface ZVT-Protocol Revision 13.11, Date 20.07.2023
// Kapitel 9.4.1 Overview of tags used
var tlvStruct = {
    '01': { 'bez': 'reversal-ID' },
    '02': { 'bez': 'driver-number' },
    '03': { 'bez': 'auto-number' },
    '04': { 'bez': 'mileage' },
    '05': { 'bez': 'goods-group' },
    '06': { 'bez': 'restriction-code 1' },
    '07': { 'bez': 'text-lines', 'format': 'ASCII' },
    '08': { 'bez': 'receipt-number' },
    '09': { 'bez': 'attribute' },
    '0a': { 'bez': 'ZVT-command' },
    '0b': { 'bez': 'info-field' },
    '0c': { 'bez': 'info-field2' },
    '0d': { 'bez': 'restriction-code 2' },
    '0e': { 'bez': 'service-code' },
    '0f': { 'bez': 'assignment-number' },
    '10': { 'bez': 'number of columns and number of lines merchant-display' },
    '11': { 'bez': 'number of columns and number of lines customer-display' },
    '12': { 'bez': 'number of characters per line of the printer' },
    '13': { 'bez': 'extra result-code' },
    '14': { 'bez': 'ISO character set' },
    '15': { 'bez': 'Language-code' },
    '16': { 'bez': 'menu-type' },
    '17': { 'bez': 'context' },
    '18': { 'bez': 'destination' },
    '19': { 'bez': 'return-code' },
    '1a': { 'bez': 'maximum length of the APDU' },
    '1b': { 'bez': 'diagnosis-type' },
    '1c': { 'bez': 'file-block' },
    '1d': { 'bez': 'file-ID' },
    '1e': { 'bez': 'start-position' },
    '40': { 'bez': 'EMV-config-parameter' },
    '41': { 'bez': 'ZVT card-type-ID', format: 'zvtCardType' },
    '42': { 'bez': 'name of the application', 'format': 'ASCII' },
    '43': { 'bez': 'application-ID' },
    '44': { 'bez': 'application preferred name' },
    '45': { 'bez': 'receipt-parameter' },
    '46': { 'bez': 'EMV-print-data (customer-receipt)' },
    '47': { 'bez': 'EMV-print-data (merchant-receipt)' },
    '48': { 'bez': 'priority' },
    '49': { 'bez': 'network-operator card-type-ID' },
    '4a': { 'bez': 'DC POS 2.4 product display' },
    '4b': { 'bez': 'Issuer country code' },
    '4c': { 'bez': 'UID' },
    '4d': { 'bez': 'EF_ID GeldKarte girogo' },
    '4e': { 'bez': 'EMV PAR' },
    '50': { 'bez': 'Background-color' },
    '80': { 'bez': 'prepaid-PIN' },
    '81': { 'bez': 'telephone number' },
    '82': { 'bez': 'top-up text' },
    '83': { 'bez': 'prepaid type' },
    '84': { 'bez': 'minimal charge amount' },
    '85': { 'bez': 'maximal charge amount' },
    'c1': { 'bez': 'transaction-type' },
    'c2': { 'bez': 'number of bonus-points' },
    'c3': { 'bez': 'number of remaining bonus-points' },
    'c4': { 'bez': 'transaction-number of ECR' },
    'c5': { 'bez': 'Bonus points equivalent amount' },
    '1f00': { 'bez': 'total length of file' },
    '1f01': { 'bez': 'receipt-ID' },
    '1f02': { 'bez': 'from_TA-number' },
    '1f03': { 'bez': 'to_TA-number' },
    '1f04': { 'bez': 'receipt-parameter' },
    '1f05': { 'bez': 'transaction-parameter' },
    '1f06': { 'bez': 'reservation-parameter' },
    '1f07': { 'bez': 'receipt-type' },
    '1f08': { 'bez': 'data track 1 of the magnet-stripe' },
    '1f09': { 'bez': 'data track 2 of the magnet-stripe' },
    '1f0a': { 'bez': 'data track 3 of the magnet-stripe' },
    '1f0b': { 'bez': 'maximum pre-authorisation amount' },
    '1f0c': { 'bez': 'license plate number' },
    '1f0d': { 'bez': 'transparent data to host' },
    '1f0e': { 'bez': 'date' },
    '1f0f': { 'bez': 'time' },
    '1f10': { 'bez': 'cardholder authentication' },
    '1f11': { 'bez': 'online flag' },
    '1f12': { 'bez': 'card-technology' },
    '1f13': { 'bez': 'ECR function request' },
    '1f14': { 'bez': 'card identification item' },
    '1f15': { 'bez': 'card reading control' },
    '1f16': { 'bez': 'extended error code' },
    '1f17': { 'bez': 'extended error text', 'format': 'ASCII' },
    '1f18': { 'bez': 'card notification control' },
    '1f19': { 'bez': 'card acceptance' },
    '1f1a': { 'bez': 'PAN for card acceptance matching' },
    '1f1b': { 'bez': 'markup in % with 2 decimals' },
    '1f1c': { 'bez': 'card name' },
    '1f1d': { 'bez': 'currency information Type' },
    '1f1e': { 'bez': 'number of decimals' },
    '1f1f': { 'bez': 'Unique transaction identifier' },
    '1f20': { 'bez': 'Total amount' },
    '1f21': { 'bez': 'ISO currency code' },
    '1f22': { 'bez': 'Inverted rate display unit' },
    '1f23': { 'bez': 'Retrieval ID' },
    '1f24': { 'bez': 'Reference Number' },
    '1f25': { 'bez': 'Cashback Amount' },
    '1f26': { 'bez': 'End of Day mode' },
    '1f27': { 'bez': 'Extended product name (EuroELV DF8118)' },
    '1f28': { 'bez': 'Emergency mode (EuroELV)' },
    '1f29': { 'bez': 'Limit overridden (EuroELV)' },
    '1f2a': { 'bez': 'Additional card holder information (EuroELV DF8117)' },
    '1f2b': { 'bez': 'Trace number' },
    '1f2c': { 'bez': 'Profilename' },
    '1f2d': { 'bez': 'Card data input type' },
    '1f2e': { 'bez': 'Barcode type' },
    '1f2f': { 'bez': 'Product code' },
    '1f30': { 'bez': 'EPurse top up amount' },
    '1f31': { 'bez': 'Encrypted PIN' },
    '1f32': { 'bez': 'SMID value' },
    '1f33': { 'bez': 'Message data' },
    '1f34': { 'bez': 'MAC value' },
    '1f35': { 'bez': 'ECR Identification' },
    '1f36': { 'bez': 'TIP Amount' },
    '1f37': { 'bez': 'Receipt information' },
    '1f38': { 'bez': 'Input mode' },
    '1f39': { 'bez': 'Timeout' },
    '1f3a': { 'bez': 'Input result' },
    '1f3b': { 'bez': 'Transaction information' },
    '1f3c': { 'bez': 'Input' },
    '1f3d': { 'bez': 'Alphanumeric data' },
    '1f3e': { 'bez': 'Encrypted cardholder information' },
    '1f3f': { 'bez': 'Remaining balance' },
    '1f40': { 'bez': 'Device name', 'format': 'ASCII' },
    '1f41': { 'bez': 'Software version', 'format': 'ASCII' },
    '1f42': { 'bez': 'Serial number' },
    '1f43': { 'bez': 'Device state' },
    '1f44': { 'bez': 'Terminal identifier' },
    '1f45': { 'bez': 'ATS' },
    '1f46': { 'bez': 'Command APDUs' },
    '1f47': { 'bez': 'Card read error code' },
    '1f48': { 'bez': 'reserved' },
    '1f49': { 'bez': 'reserved' },
    '1f4a': { 'bez': 'reserved' },
    '1f4b': { 'bez': 'reserved' },
    '1f4c': { 'bez': 'Card type', format: 'Card_type' },
    '1f4d': { 'bez': 'Card subtype' },
    '1f4e': { 'bez': 'reserved' },
    '1f4f': { 'bez': 'MIFARE ATQA' },
    '1f50': { 'bez': 'MIFARE SAK' },
    '1f51': { 'bez': 'Debit mandate identifier' },
    '1f52': { 'bez': 'Debit creditor identifier' },
    '1f53': { 'bez': 'Debit pre-notification' },
    '1f54': { 'bez': 'Key generation number (GN)' },
    '1f55': { 'bez': 'Terminal locks' },
    '1f56': { 'bez': '4eye Customer identifier (CID)' },
    '1f57': { 'bez': 'Merchant SAM number' },
    '1f58': { 'bez': 'Merchant SAM expiry date' },
    '1f59': { 'bez': 'Payment application' },
    '1f5a': { 'bez': 'reserved' },
    '1f5b': { 'bez': 'Card poll timeout' },
    '1f5c': { 'bez': 'Encrypted key' },
    '1f5d': { 'bez': 'Plaintext key' },
    '1f5e': { 'bez': 'IBAN' },
    '1f5f': { 'bez': 'BIC' },
    '1f60': { 'bez': 'Allowed card technologies' },
    '1f61': { 'bez': 'Customer Index' },
    '1f62': { 'bez': 'BMP 60 identifier for the individual reference number' },
    '1f63': { 'bez': 'Individual reference number' },
    '1f64': { 'bez': 'Number of payments' },
    '1f65': { 'bez': 'Processing selection' },
    '1f66': { 'bez': 'Wallet data' },
    '1f67': { 'bez': 'Retailer identifier' },
    '1f68': { 'bez': 'Loyalty identifier' },
    '1f69': { 'bez': 'Voucher identifier' },
    '1f6a': { 'bez': 'Remaining Amount' },
    '1f6b': { 'bez': 'Age verification control' },
    '1f6c': { 'bez': 'Age verification result' },
    '1f6d': { 'bez': 'Mode control for command 06-E6' },
    '1f6e': { 'bez': 'Activation of status message 5E' },
    '1f6f': { 'bez': 'Payment type' },
    '1f70': { 'bez': 'Indicator for partial approval capability' },
    '1f71': { 'bez': 'TLV tags recognized by the PT' },
    '1f72': { 'bez': 'Extended CTLS card detection in status poll' },
    '1f73': { 'bez': 'Message sequence id (MsgSeqId)' },
    '1f74': { 'bez': 'Password' },
    '1f75': { 'bez': 'DUKPT encrypted input' },
    '1f76': { 'bez': 'Send tag 1F32, SMID of the DUKPT key ' },
    '1f77': { 'bez': 'Index of DUKPT engine' },
    '1f78': { 'bez': 'Request to send the 24 hour reboot information' },
    '1f79': { 'bez': 'Request to start an action' },
    '1f7a': { 'bez': 'Filename optional including path information' },
    '1f7b': { 'bez': 'MIME type of the file' },
    '1f7c': { 'bez': 'Wake sources' },
    '1f7d': { 'bez': 'Idle time' },
    '1f7e': { 'bez': 'Idle apps' },

    '9f5a': { 'bez': 'Membership Product Identifier' },
    '955b': { 'bez': 'Product Membership Number' },

    '1f8000': { 'bez': 'Indicator for purchase only approval' },
    '1f8001': { 'bez': 'IP address' },
    '1f8003': { 'bez': 'Indicator for partial reconciliation' },
    '1f8004': { 'bez': 'UAT indicator' },
    '1f8005': { 'bez': 'Set external modem' },
    '1f8006': { 'bez': 'ALIPAY_TRADE_ID' },
    '1f8007': { 'bez': 'Online Card Hash' },
    '1f8008': { 'bez': 'Online card reference' },

    'ff01': { 'bez': 'Coupon data' },
    'ff02': { 'bez': 'Loyalty data' },
    'ff03': { 'bez': 'Parking ticket' },
    'ff04': { 'bez': 'Voucher data' },

    '20': { 'bez': 'fleet-card container' },
    '21': { 'bez': 'list of permitted goods-groups' },
    '22': { 'bez': 'list of prohibited goods-groups' },
    '23': { 'bez': 'list of open pre-authorisations' },
    '24': { 'bez': 'display-texts', 'format': 'ASCII' },
    '25': { 'bez': 'print-texts', 'format': 'ASCII' },
    '26': { 'bez': 'list of permitted ZVT-Commands' },
    '27': { 'bez': 'list of supported character-sets' },
    '28': { 'bez': 'list of supported languages' },
    '29': { 'bez': 'list of menus' },
    '2a': { 'bez': 'list of menus' },
    '2b': { 'bez': 'menu' },
    '2c': { 'bez': 'menu-point' },
    '2d': { 'bez': 'file' },
    '2e': { 'bez': 'time-stamp' },
    '2f': { 'bez': 'payment-type' },
    '30': { 'bez': 'card acceptance matching, container' },
    '31': { 'bez': 'amount information' },
    '32': { 'bez': 'input container' },
    '33': { 'bez': 'DUKPT key container' },
    '34': { 'bez': 'Terminal date time' },
    '35': { 'bez': '24 hour reboot date time' },
    '60': { 'bez': 'application' },
    '61': { 'bez': 'list of applications on magnet-stripe' },
    '62': { 'bez': 'list of applications on chip' },
    '63': { 'bez': 'prepaid-container' },
    '64': { 'bez': 'receipt header' },
    '65': { 'bez': 'receipt advertising text' },
    '66': { 'bez': 'receipt customer copy' },
    '67': { 'bez': 'receipt merchant copy' },
    '68': { 'bez': 'receipt transaction outcome' },
    '69': { 'bez': 'reference transaction' },
    '6a': { 'bez': 'invalid application' },
    'e1': { 'bez': 'bonus-points container' },
    'e2': { 'bez': 'DCC container' },
    'e3': { 'bez': 'Barcode Container' },
    'e4': { 'bez': 'Device information container' },
    'e5': { 'bez': 'Key Container' },
    'e6': { 'bez': 'Card type container' },
    'e7': { 'bez': 'Merchant SAM information container' },
    'e8': { 'bez': 'Value added services container' },
    'e9': { 'bez': 'Reference number container' },
    'ea': { 'bez': 'ExpressPay Membership data' },
    'eb': { 'bez': 'Power Management' },
    'ec': { 'bez': 'Container for End-of-day detailed data' },
    'ed': { 'bez': 'Container for End-of-day detailed data about one host' },
    'ee': { 'bez': 'Container for End-of-day detailed data about all hosts' }
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
        tlvLength['tlvleng'] = parseInt(meldung.substr(tlvStart, 2), 16);
        tlvLength['len'] += 2;
    } else if (tlvleng == 130) {
        //tow length-byte follows
        let tlvlengHigh = parseInt(meldung.substr(tlvStart, 2), 16);
        tlvLength['len'] += 2;
        tlvStart += 2;
        let tlvlengLow = parseInt(meldung.substr(tlvStart, 2), 16);
        tlvLength['len'] += 2;
        //bmpleng = (tlvlengHigh * 255) + tlvlengLow;
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
        if ('format' in tlvStruct[tag]) {
            tlvTagInfo['format'] = tlvStruct[tag]['format'];
        }
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
        } else {
            tlv[tag]['bez'] = tagInfo['bez'];
        }
        //if (tag in tlvStruct) {
        //    tlv[tag]['bez'] = tlvStruct[tag]['bez'];
        //}

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


            if ('format' in tagInfo) {
                let val = tlv[tag]['val'];
                if (tagInfo['format'] == 'ASCII') {
                    tlv[tag]['format'] = tagInfo['format'];

                    var str = '';
                    for (var i = 0; i < val.length; i += 2) {
                        str += String.fromCharCode(parseInt(val.substr(i, 2), 16));
                    }
                    tlv[tag]['val'] = str;

                } else if (tagInfo['format'] == 'zvtCardType') {
                    let valNum = parseInt(val, 16);
                    console.error("val:" + val + " valNum:" + valNum);
                    if (valNum in zvtCardType) {
                        tlv[tag]['valBez'] = zvtCardType[valNum];
                    }
                } else if (tagInfo['format'] == 'Card_type') {
                    switch (val) {
                        case "00":
                            tlv[tag]['valBez'] = " ISO 7816-4";
                            break;
                        case "01":
                            tlv[tag]['valBez'] = " MIFARE";
                            break;
                        case "02":
                            tlv[tag]['valBez'] = " FeliCa";
                            break;
                    }
                }
            }





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
    console.info('getZvtBmpInfo(' + meldung + ', ' + start + ')');
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
            if (bmp == "00") {
                console.error('BMP 00 ????');
            }
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
    meldung = meldung.toLowerCase().replace(/\s/g, '');
    console.info('getZvtMessage(' + meldung + ')');
    var istatusBez = {
        '02': { 'bez': 'Please watch PIN - Pad' },
        '03': { 'bez': 'Not accepted', 'error': true },
        '04': { 'bez': 'PT is waiting for response from FEP' },
        '05': { 'bez': 'PT is sending auto-reversal' },
        '06': { 'bez': 'PT is sending post-bookings' },
        '07': { 'bez': 'Card not admitted', 'error': true },
        '08': { 'bez': 'Card unknown', 'error': true },
        '09': { 'bez': 'Expired card', 'error': true },
        '0a': { 'bez': 'Insert card' },
        '0b': { 'bez': 'Please remove card!' },
        '0c': { 'bez': 'Card not readable', 'error': true },
        '0d': { 'bez': 'Processing error', 'error': true },
        '0e': { 'bez': 'Please wait...' },
        '0f': { 'bez': 'PT is commencing an automatic end-of-day batch' },
        '10': { 'bez': 'Invalid card', 'error': true },
        '11': { 'bez': 'Balance display' },
        '12': { 'bez': 'System malfunction', 'error': true },
        '13': { 'bez': 'Payment not possible', 'error': true },
        '14': { 'bez': 'Credit not sufficient', 'error': true },
        '15': { 'bez': 'Incorrect PIN', 'error': true },
        '16': { 'bez': 'Limit not sufficient', 'error': true },
        '17': { 'bez': 'Please wait...' },
        '18': { 'bez': 'PIN try limit exceeded', 'error': true },
        '19': { 'bez': 'Card-data incorrect', 'error': true },
        '1a': { 'bez': 'Service-mode', 'error': true },
        '1b': { 'bez': 'Approved. Please fill-up' },
        '1c': { 'bez': 'Approved. Please take goods' },
        '1d': { 'bez': 'Declined', 'error': true },

        '2a': { 'bez': 'For loading please insert card' },
        '2b': { 'bez': 'Emergency transaction, please wait' },
        '2c': { 'bez': 'Application selection, please wait' },


        'd2': { 'bez': 'Connecting dial-up' },

        '41': { 'bez': 'Please watch PIN-Pad Please remove card!' },

        '4c': { 'bez': 'Card not readable Please remove card!' },
        'ff': { 'bez': 'no appropriate ZVT status code matches' }
    }

    let zvtMessage = {};
    let ccrc = meldung.substr(0, 2);
    let aprc = meldung.substr(2, 2);

    zvtMessage['ccrc'] = ccrc;
    zvtMessage['aprc'] = aprc;
    let cmd = ccrc + aprc;
    if (cmd in zvtCommands) {
        console.log('zvtCommands exist:  ' + cmd);
        zvtMessage['command'] = zvtCommands[cmd]['bez'];

        if (zvtCommands[cmd])
            if (!('bmpstartDefault' in zvtCommands[cmd])) {
                zvtCommands[cmd]['bmpstart'] = 6;
            } else {
                console.warn('getZvtMessage bmpstartDefault is set :' + zvtCommands[cmd]['bmpstartDefault']);
                zvtCommands[cmd]['bmpstart'] = zvtCommands[cmd]['bmpstartDefault'];
            }


        zvtMessage['msglen'] = meldung.length;
        let lengthValue = parseInt(meldung.substr(4, 2), 16);
        if (lengthValue == 255) {
            //Erweitertes Längenfeld
            zvtCommands[cmd]['bmpstart'] += 4;
            lengthValue = parseInt(meldung.substr(6, 4), 16);
        }
        zvtMessage['length'] = lengthValue;


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
                zvtCommands[cmd]['bmpstart'] += 12;
            }

        } else
            if (cmd == '0650') {
                // 'End-of-Day'
                if (meldung.length > 11) {
                    zvtMessage['password'] = meldung.substr(6, 6);
                    zvtCommands[cmd]['bmpstart'] += 6;
                }

            } else

                if (cmd == '061e') {
                    //Abort

                    let resultcode = meldung.substr(6, 2);
                    zvtCommands[cmd]['bmpstart'] += 2;
                    zvtMessage['result'] = {};
                    zvtMessage['result']['code'] = resultcode;
                    if (resultcode in errorMessage) {
                        zvtMessage['result']['bez'] = errorMessage[resultcode];
                    }


                } else if (cmd == '04ff') {
                    //IntermediateStatusInformationformation
                    let istatus = meldung.substr(6, 2);
                    zvtMessage['status'] = {};
                    zvtMessage['status']['code'] = istatus;
                    zvtCommands[cmd]['bmpstart'] += 2;
                    if (istatus in istatusBez) {
                        zvtMessage['status']['bez'] = istatusBez[istatus]['bez'];
                        if (istatusBez[istatus]['error']) {
                            zvtMessage['error'] = istatusBez[istatus]['bez'];
                        }
                    }
                    if (meldung.length > 10) {
                        zvtMessage['timeout'] = meldung.substr(8, 2);
                        zvtCommands[cmd]['bmpstart'] += 2;
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