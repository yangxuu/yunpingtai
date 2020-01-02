import _ from 'underscore'

_.mixin({
    utf8_encode: function (argString) {
        //  discuss at: http://phpjs.org/functions/utf8_encode/
        // original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: sowberry
        // improved by: Jack
        // improved by: Yves Sucaet
        // improved by: kirilloid
        // bugfixed by: Onno Marsman
        // bugfixed by: Onno Marsman
        // bugfixed by: Ulrich
        // bugfixed by: Rafal Kukawski
        // bugfixed by: kirilloid
        //   example 1: utf8_encode('Kevin van Zonneveld');
        //   returns 1: 'Kevin van Zonneveld'

        if (argString === null || typeof argString === 'undefined') {
            return '';
        }

        // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var string = (argString + '');
        var utftext = '',
            start, end, stringl = 0;

        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;

            if (c1 < 128) {
                end++;
            }
            else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                );
            }
            else if ((c1 & 0xF800) != 0xD800) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            }
            else {
                // surrogate pairs
                if ((c1 & 0xFC00) != 0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                }
                var c2 = string.charCodeAt(++n);
                if ((c2 & 0xFC00) != 0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }

        if (end > start) {
            utftext += string.slice(start, stringl);
        }

        return utftext;
    },
    md5: function (str) {
        var xl;

        var rotateLeft = function (lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        };

        var addUnsigned = function (lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                }
                else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            }
            else {
                return (lResult ^ lX8 ^ lY8);
            }
        };

        var _F = function (x, y, z) {
            return (x & y) | ((~x) & z);
        };
        var _G = function (x, y, z) {
            return (x & z) | (y & (~z));
        };
        var _H = function (x, y, z) {
            return (x ^ y ^ z);
        };
        var _I = function (x, y, z) {
            return (y ^ (x | (~z)));
        };

        var _FF = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var _GG = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var _HH = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var _II = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        var convertToWordArray = function (str) {
            var lWordCount;
            var lMessageLength = str.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = new Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        var wordToHex = function (lValue) {
            var wordToHexValue = '',
                wordToHexValue_temp = '',
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                wordToHexValue_temp = '0' + lByte.toString(16);
                wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
            }
            return wordToHexValue;
        };

        var x = [],
            k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22,
            S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20,
            S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23,
            S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;

        str = this.utf8_encode(str);
        x = convertToWordArray(str);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        xl = x.length;
        for (k = 0; k < xl; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }

        var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

        return temp.toLowerCase();
    },
    base64_encode: function (data) {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];

        if (!data) {
            return data;
        }

        data = unescape(encodeURIComponent(data))

        do {
            // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');

        var r = data.length % 3;

        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    },
    base64_decode: function (data) {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            dec = '',
            tmp_arr = [];

        if (!data) {
            return data;
        }

        data += '';

        do {
            // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;

            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            }
            else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            }
            else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);

        dec = tmp_arr.join('');

        return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
    },
    sprintf: function () {
        var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
        var a = arguments,
            i = 0,
            format = a[i++];

        // pad()
        var pad = function (str, len, chr, leftJustify) {
            if (!chr) {
                chr = ' ';
            }
            var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
            return leftJustify ? str + padding : padding + str;
        };

        // justify()
        var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
            var diff = minWidth - value.length;
            if (diff > 0) {
                if (leftJustify || !zeroPad) {
                    value = pad(value, minWidth, customPadChar, leftJustify);
                }
                else {
                    value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
                }
            }
            return value;
        };

        // formatBaseX()
        var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
            // Note: casts negative numbers to positive ones
            var number = value >>> 0;
            prefix = prefix && number && {
                    '2': '0b',
                    '8': '0',
                    '16': '0x'
                }
                    [base] || '';
            value = prefix + pad(number.toString(base), precision || 0, '0', false);
            return justify(value, prefix, leftJustify, minWidth, zeroPad);
        };

        // formatString()
        var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
            if (precision != null) {
                value = value.slice(0, precision);
            }
            return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
        };

        // doFormat()
        var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
            var number;
            var prefix;
            var method;
            var textTransform;
            var value;

            if (substring === '%%') {
                return '%';
            }

            // parse flags
            var leftJustify = false,
                positivePrefix = '',
                zeroPad = false,
                prefixBaseX = false,
                customPadChar = ' ';
            var flagsl = flags.length;
            for (var j = 0; flags && j < flagsl; j++) {
                switch (flags.charAt(j)) {
                    case ' ':
                        positivePrefix = ' ';
                        break;
                    case '+':
                        positivePrefix = '+';
                        break;
                    case '-':
                        leftJustify = true;
                        break;
                    case "'":
                        customPadChar = flags.charAt(j + 1);
                        break;
                    case '0':
                        zeroPad = true;
                        break;
                    case '#':
                        prefixBaseX = true;
                        break;
                }
            }

            // parameters may be null, undefined, empty-string or real valued
            // we want to ignore null, undefined and empty-string values
            if (!minWidth) {
                minWidth = 0;
            }
            else if (minWidth === '*') {
                minWidth = +a[i++];
            }
            else if (minWidth.charAt(0) == '*') {
                minWidth = +a[minWidth.slice(1, -1)];
            }
            else {
                minWidth = +minWidth;
            }

            // Note: undocumented perl feature:
            if (minWidth < 0) {
                minWidth = -minWidth;
                leftJustify = true;
            }

            if (!isFinite(minWidth)) {
                throw new Error('sprintf: (minimum-)width must be finite');
            }

            if (!precision) {
                precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
            }
            else if (precision === '*') {
                precision = +a[i++];
            }
            else if (precision.charAt(0) == '*') {
                precision = +a[precision.slice(1, -1)];
            }
            else {
                precision = +precision;
            }

            // grab value using valueIndex if required?
            value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

            switch (type) {
                case 's':
                    return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
                case 'c':
                    return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
                case 'b':
                    return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'o':
                    return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'x':
                    return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'X':
                    return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
                case 'u':
                    return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'i':
                case 'd':
                    number = +value || 0;
                    number = Math.round(number - number % 1); // Plain Math.round doesn't just truncate
                    prefix = number < 0 ? '-' : positivePrefix;
                    value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                    return justify(value, prefix, leftJustify, minWidth, zeroPad);
                case 'e':
                case 'E':
                case 'f': // Should handle locales (as per setlocale)
                case 'F':
                case 'g':
                case 'G':
                    number = +value;
                    prefix = number < 0 ? '-' : positivePrefix;
                    method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                    textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                    value = prefix + Math.abs(number)[method](precision);
                    return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                default:
                    return substring;
            }
        };

        return format.replace(regex, doFormat);
    },

    isset: function () {
        var a = arguments,
            l = a.length,
            i = 0,
            undef;

        if (l === 0) {
            throw new Error('Empty isset');
        }
        while (i !== l) {
            if (a[i] === undef || a[i] === null) {
                return false;
            }
            i++;
        }
        return true;
    },
    /* JSONPath 0.8.0 - XPath for JSON
     *
     * Copyright (c) 2007 Stefan Goessner (goessner.net)
     * Licensed under the MIT (MIT-LICENSE.txt) licence.
     */
    jsonPath: function (obj, expr, arg) {
        var P = {
            resultType: arg && arg.resultType || "VALUE",
            result: [],
            normalize: function (expr) {
                var subx = [];
                return expr.replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) {
                    return "[#" + (subx.push($1) - 1) + "]";
                })
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function ($0, $1) {
                        return subx[$1];
                    });
            },
            asPath: function (path) {
                var x = path.split(";"),
                    p = "";
                for (var i = 1, n = x.length; i < n; i++)
                    p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
                return p;
            },
            store: function (p, v) {
                if (p) {
                    P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
                }
                return !!p;
            },
            trace: function (expr, val, path) {
                if (expr) {
                    var x = expr.split(";"),
                        loc = x.shift();
                    x = x.join(";");
                    if (val && val.hasOwnProperty(loc)) {
                        P.trace(x, val[loc], path + ";" + loc);
                    }
                    else if (loc === "*") {
                        P.walk(loc, x, val, path, function (m, l, x, v, p) {
                            P.trace(m + ";" + x, v, p);
                        });
                    }
                    else if (loc === "..") {
                        P.trace(x, val, path);
                        P.walk(loc, x, val, path, function (m, l, x, v, p) {
                            typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m);
                        });
                    }
                    else if (/,/.test(loc)) { // [name1,name2,...]
                        for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                            P.trace(s[i] + ";" + x, val, path);
                    }
                    else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                    {
                        P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                    }
                    else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                    {
                        P.walk(loc, x, val, path, function (m, l, x, v, p) {
                            if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m)) {
                                P.trace(m + ";" + x, v, p);
                            }
                        });
                    }
                    else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                    {
                        P.slice(loc, x, val, path);
                    }
                }
                else {
                    P.store(path, val);
                }
            },
            walk: function (loc, expr, val, path, f) {
                if (val instanceof Array) {
                    for (var i = 0, n = val.length; i < n; i++)
                        if (i in val) {
                            f(i, loc, expr, val, path);
                        }
                }
                else if (typeof val === "object") {
                    for (var m in val)
                        if (val.hasOwnProperty(m)) {
                            f(m, loc, expr, val, path);
                        }
                }
            },
            slice: function (loc, expr, val, path) {
                if (val instanceof Array) {
                    var len = val.length,
                        start = 0,
                        end = len,
                        step = 1;
                    loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function ($0, $1, $2, $3) {
                        start = parseInt($1 || start);
                        end = parseInt($2 || end);
                        step = parseInt($3 || step);
                    });
                    start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
                    end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
                    for (var i = start; i < end; i += step)
                        P.trace(i + ";" + expr, val, path);
                }
            },
            eval: function (x, _v, _vname) {
                try {
                    return $ && _v && eval(x.replace(/@/g, "_v"));
                } catch (e) {
                    throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
                }
            }
        };

        var $ = obj;
        if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
            P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
            return P.result.length ? P.result : false;
        }
    },
    rsort: function (inputArr, sort_flags) {
        var valArr = [],
            k = '',
            i = 0,
            sorter = false,
            that = this,
            strictForIn = false,
            populateArr = [];

        switch (sort_flags) {
            case 'SORT_STRING':
                // compare items as strings
                sorter = function (a, b) {
                    return that.strnatcmp(b, a);
                };
                break;
            case 'SORT_LOCALE_STRING':
                // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
                var loc = this.i18n_loc_get_default();
                sorter = this.php_js.i18nLocales[loc].sorting;
                break;
            case 'SORT_NUMERIC':
                // compare items numerically
                sorter = function (a, b) {
                    return (b - a);
                };
                break;
            case 'SORT_REGULAR':
            // compare items normally (don't change types)
            default:
                sorter = function (b, a) {
                    var aFloat = parseFloat(a),
                        bFloat = parseFloat(b),
                        aNumeric = aFloat + '' === a,
                        bNumeric = bFloat + '' === b;
                    if (aNumeric && bNumeric) {
                        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
                    }
                    else if (aNumeric && !bNumeric) {
                        return 1;
                    }
                    else if (!aNumeric && bNumeric) {
                        return -1;
                    }
                    return a > b ? 1 : a < b ? -1 : 0;
                };
                break;
        }

        // BEGIN REDUNDANT
        this.php_js = this.php_js || {};
        this.php_js.ini = this.php_js.ini || {};
        // END REDUNDANT
        strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
        populateArr = strictForIn ? inputArr : populateArr;

        for (k in inputArr) { // Get key and value arrays
            if (inputArr.hasOwnProperty(k)) {
                valArr.push(inputArr[k]);
                if (strictForIn) {
                    delete inputArr[k];
                }
            }
        }

        valArr.sort(sorter);

        for (i = 0; i < valArr.length; i++) { // Repopulate the old array
            populateArr[i] = valArr[i];
        }
        return strictForIn || populateArr;
    },
    sort: function (inputArr, sort_flags) {
        var valArr = [],
            keyArr = [],
            k = '',
            i = 0,
            sorter = false,
            that = this,
            strictForIn = false,
            populateArr = [];

        switch (sort_flags) {
            case 'SORT_STRING':
                // compare items as strings
                sorter = function (a, b) {
                    return that.strnatcmp(a, b);
                };
                break;
            case 'SORT_LOCALE_STRING':
                // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
                var loc = this.i18n_loc_get_default();
                sorter = this.php_js.i18nLocales[loc].sorting;
                break;
            case 'SORT_NUMERIC':
                // compare items numerically
                sorter = function (a, b) {
                    return (a - b);
                };
                break;
            case 'SORT_REGULAR':
            // compare items normally (don't change types)
            default:
                sorter = function (a, b) {
                    var aFloat = parseFloat(a),
                        bFloat = parseFloat(b),
                        aNumeric = aFloat + '' === a,
                        bNumeric = bFloat + '' === b;
                    if (aNumeric && bNumeric) {
                        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
                    }
                    else if (aNumeric && !bNumeric) {
                        return 1;
                    }
                    else if (!aNumeric && bNumeric) {
                        return -1;
                    }
                    return a > b ? 1 : a < b ? -1 : 0;
                };
                break;
        }

        // BEGIN REDUNDANT
        this.php_js = this.php_js || {};
        this.php_js.ini = this.php_js.ini || {};
        // END REDUNDANT
        strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
        populateArr = strictForIn ? inputArr : populateArr;

        for (k in inputArr) { // Get key and value arrays
            if (inputArr.hasOwnProperty(k)) {
                valArr.push(inputArr[k]);
                if (strictForIn) {
                    delete inputArr[k];
                }
            }
        }

        valArr.sort(sorter);

        for (i = 0; i < valArr.length; i++) { // Repopulate the old array
            populateArr[i] = valArr[i];
        }
        return strictForIn || populateArr;
    },
    insert: function (path, data, list, field, order) {
        var old_path = path;
        if (path == '$') {
            path = "$.items";
            list = {
                items: list
            };
        }
        var _path = _.jsonPath(list, path, {
                resultType: "PATH"
            }),
            data = JSON.stringify(data);
        //console.log(_path,path,data,list);
        _.each(_path, function (val, key, _list) {
            var str = 'if(_.isArray(list' + val + ')){\
				                    list' + val + '.push(' + data + ');\
				                }else{\
				                    list' + val + '=' + data + ';\
				                }';

            eval(str);
        });
        if (field) {
            _.asort(path, field, order, list);
        }
        if (old_path == '$') {
            return list['items'];
        }
        else {
            return list;
        }
        return list;
    },
    insert_after: function (path, data, list) {
        var old_path = path;
        if (path == '$') {
            path = "$.items";
            list = {
                items: list
            };
        }
        var _path = _.jsonPath(list, path, {
            resultType: "PATH"
        });

        eval('var arr=list' + _path[0].substr(0, _path[0].lastIndexOf('[')));
        eval('var item=list' + _path[0]);
        var index = _.indexOf(arr, item);
        arr.splice(index + 1, 0, data);
        if (old_path == '$') {
            return list['items'];
        }
        else {
            return list;
        }
    },
    asort: function (path, field, order, list) {
        var old_path = path;
        if (path == '$') {
            path = "$.items";
            list = {
                items: list
            };
        }
        var _path = _.jsonPath(list, path, {
                resultType: "PATH"
            }),
            data = _.jsonPath(list, path);

        _.each(_path, function (val, key) {
            var res = {},
                fieldVal = [],
                result = [];
            _.each(data[key], function (v) {
                res[v[field]] = v;
                fieldVal.push(v[field]);
            });
            if (order == 'asc') {
                fieldVal = _.sort(fieldVal, 'SORT_NUMERIC');
            }
            else {
                fieldVal = _.rsort(fieldVal, 'SORT_NUMERIC');
            }
            _.each(fieldVal, function (val) {
                result.push(res[val]);
            });
            eval('list' + (old_path == '$' ? '' : val) + "=result;");
        });

        return list;
    },
    del: function (path, list) {
        var _path = _.jsonPath(list, path, {
                resultType: "PATH"
            }),
            data = _.jsonPath(list, path),
            result = [];
        _.each(_path, function (val, key) {
            var res = val.split('[');
            var index = parseInt(res[res.length - 1].substr(0, res[res.length - 1].length - 1));
            eval('list' + val.substr(0, val.lastIndexOf('[')) + '.splice(' + index + ',1)');
        });
        return list;
    },
    update: function (path, data, list) {
        data = _.defaults(data, _.get(path, list));
        var _path = _.jsonPath(list, path, {
                resultType: "PATH"
            }),
            data = JSON.stringify(data);
        _.each(_path, function (val, key) {
            eval('list' + val + '=' + data);
        });
        return list;
    },
    get: function (path, list) {
        var data = _.jsonPath(list, path);
        return data[0];
    },
    getThumb: function (path, full) {
        var result = "";
        if (path) {
            var pos = path.lastIndexOf('.');
            result = path.substring(0, pos) + '_thumb' + path.substring(pos);
            if (full) {
                result = _global.upload_url + result;
            }
        }
        return result;
    },
    getOrigImg: function (path, full) {
        var result = "";
        if (path) {
            var pos = path.lastIndexOf('_thumb');
            result = path.substring(0, pos) + path.substring(pos + '_thumb'.length);
            if (full) {
                result = _global.upload_url + result;
            }
        }
        return result;
    },
    rand: function (min, max) {
        var argc = arguments.length;
        if (argc === 0) {
            min = 0;
            max = 2147483647;
        }
        else if (argc === 1) {
            throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    parse_url: function (str, component) {
        var query,
            key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
                'relative', 'path', 'directory', 'file', 'query', 'fragment'],
            ini = (this.php_js && this.php_js.ini) || {},
            mode = (ini['phpjs.parse_url.mode'] &&
                ini['phpjs.parse_url.mode'].local_value) || 'php',
            parser = {
                php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/// Added one optional slash to post-scheme to catch file:/// (should restrict this)
            };

        var m = parser[mode].exec(str),
            uri = {},
            i = 14;
        while (i--) {
            if (m[i]) {
                uri[key[i]] = m[i];
            }
        }

        if (component) {
            return uri[component.replace('PHP_URL_', '').toLowerCase()];
        }
        if (mode !== 'php') {
            var name = (ini['phpjs.parse_url.queryKey'] &&
                ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
            parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
            uri[name] = {};
            query = uri[key[12]] || '';
            query.replace(parser, function ($0, $1, $2) {
                if ($1) {
                    uri[name][$1] = $2;
                }
            });
        }
        delete uri.source;
        return uri;
    },
    parse_query: function (str) {
        var url = this.parse_url(str);
        var res = _.explode('&', url.query);
        if (_.empty(res)) {
            return {};
        }
        var result = {};
        _.each(res, function (val) {
            var query_res = _.explode('=', val);
            result[query_res[0]] = query_res[1];
        });
        return result;
    },
    //去掉首尾空字符
    trim: function (str, charlist) {
        var whitespace,
            l = 0,
            i = 0;
        str += '';

        if (!charlist) {
            // default list
            whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
        }
        else {
            // preg_quote custom list
            charlist += '';
            whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
        }

        l = str.length;
        for (i = 0; i < l; i++) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(i);
                break;
            }
        }

        l = str.length;
        for (i = l - 1; i >= 0; i--) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    },
    strip_tags: function (input, allowed) {
        allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    },
    str_replace: function (search, replace, subject, count) {
        var i = 0,
            j = 0,
            temp = '',
            repl = '',
            sl = 0,
            fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = Object.prototype.toString.call(r) === '[object Array]',
            sa = Object.prototype.toString.call(s) === '[object Array]';
        s = [].concat(s);
        if (count) {
            this.window[count] = 0;
        }

        for (i = 0, sl = s.length; i < sl; i++) {
            if (s[i] === '') {
                continue;
            }
            for (j = 0, fl = f.length; j < fl; j++) {
                temp = s[i] + '';
                repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                s[i] = (temp).split(f[j]).join(repl);
                if (count && s[i] !== temp) {
                    this.window[count] += (temp.length - s[i].length) / f[j].length;
                }
            }
        }
        return sa ? s : s[0];
    },
    str_pad: function (input, pad_length, pad_string, pad_type) {
        var half = '',
            pad_to_go;

        var str_pad_repeater = function (s, len) {
            var collect = '',
                i;

            while (collect.length < len) {
                collect += s;
            }
            collect = collect.substr(0, len);

            return collect;
        };

        input += '';
        pad_string = pad_string !== undefined ? pad_string : ' ';

        if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
            pad_type = 'STR_PAD_RIGHT';
        }
        if ((pad_to_go = pad_length - input.length) > 0) {
            if (pad_type === 'STR_PAD_LEFT') {
                input = str_pad_repeater(pad_string, pad_to_go) + input;
            }
            else if (pad_type === 'STR_PAD_RIGHT') {
                input = input + str_pad_repeater(pad_string, pad_to_go);
            }
            else if (pad_type === 'STR_PAD_BOTH') {
                half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
                input = half + input + half;
                input = input.substr(0, pad_length);
            }
        }

        return input;
    },
    preg_replace: function (pattern, replacement, subject, limit) {
        if (typeof limit === 'undefined') {
            limit = -1;
        }
        if (subject.match(eval(pattern))) {
            if (limit == -1) { //no limit
                return subject.replace(eval(pattern + 'g'), replacement);
            }
            else {

                for (x = 0; x < limit; x++) {
                    subject = subject.replace(eval(pattern), replacement);
                }

                return subject;
            }
        }
        else {
            return subject;
        }
    },
    addslashes: function (str) {
        return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    },
    date: function (format, timestamp) {
        var that = this,
            jsdate,
            f,
            txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            formatChr = /\\?(.?)/gi,
            formatChrCb = function (t, s) {
                return f[t] ? f[t]() : s;
            },
            _pad = function (n, c) {
                n = String(n);
                while (n.length < c) {
                    n = '0' + n;
                }
                return n;
            };
        f = {
            // Day
            d: function () { // Day of month w/leading 0; 01..31
                return _pad(f.j(), 2);
            },
            D: function () { // Shorthand day name; Mon...Sun
                return f.l().slice(0, 3);
            },
            j: function () { // Day of month; 1..31
                return jsdate.getDate();
            },
            l: function () { // Full day name; Monday...Sunday
                return txt_words[f.w()] + 'day';
            },
            N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
                return f.w() || 7;
            },
            S: function () { // Ordinal suffix for day of month; st, nd, rd, th
                var j = f.j(),
                    i = j % 10;
                if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
                    i = 0;
                }
                return ['st', 'nd', 'rd'][i - 1] || 'th';
            },
            w: function () { // Day of week; 0[Sun]..6[Sat]
                return jsdate.getDay();
            },
            z: function () { // Day of year; 0..365
                var a = new Date(f.Y(), f.n() - 1, f.j()),
                    b = new Date(f.Y(), 0, 1);
                return Math.round((a - b) / 864e5);
            },

            // Week
            W: function () { // ISO-8601 week number
                var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
                    b = new Date(a.getFullYear(), 0, 4);
                return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
            },

            // Month
            F: function () { // Full month name; January...December
                return txt_words[6 + f.n()];
            },
            m: function () { // Month w/leading 0; 01...12
                return _pad(f.n(), 2);
            },
            M: function () { // Shorthand month name; Jan...Dec
                return f.F().slice(0, 3);
            },
            n: function () { // Month; 1...12
                return jsdate.getMonth() + 1;
            },
            t: function () { // Days in month; 28...31
                return (new Date(f.Y(), f.n(), 0)).getDate();
            },

            // Year
            L: function () { // Is leap year?; 0 or 1
                var j = f.Y();
                return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
            },
            o: function () { // ISO-8601 year
                var n = f.n(),
                    W = f.W(),
                    Y = f.Y();
                return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
            },
            Y: function () { // Full year; e.g. 1980...2010
                return jsdate.getFullYear();
            },
            y: function () { // Last two digits of year; 00...99
                return f.Y().toString().slice(-2);
            },

            // Time
            a: function () { // am or pm
                return jsdate.getHours() > 11 ? "pm" : "am";
            },
            A: function () { // AM or PM
                return f.a().toUpperCase();
            },
            B: function () { // Swatch Internet time; 000..999
                var H = jsdate.getUTCHours() * 36e2,
                    // Hours
                    i = jsdate.getUTCMinutes() * 60,
                    // Minutes
                    s = jsdate.getUTCSeconds(); // Seconds
                return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
            },
            g: function () { // 12-Hours; 1..12
                return f.G() % 12 || 12;
            },
            G: function () { // 24-Hours; 0..23
                return jsdate.getHours();
            },
            h: function () { // 12-Hours w/leading 0; 01..12
                return _pad(f.g(), 2);
            },
            H: function () { // 24-Hours w/leading 0; 00..23
                return _pad(f.G(), 2);
            },
            i: function () { // Minutes w/leading 0; 00..59
                return _pad(jsdate.getMinutes(), 2);
            },
            s: function () { // Seconds w/leading 0; 00..59
                return _pad(jsdate.getSeconds(), 2);
            },
            u: function () { // Microseconds; 000000-999000
                return _pad(jsdate.getMilliseconds() * 1000, 6);
            },

            // Timezone
            e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
                // The following works, but requires inclusion of the very large
                // timezone_abbreviations_list() function.
                /*              return that.date_default_timezone_get();
                 */
                throw 'Not supported (see source code of date() for timezone on how to add support)';
            },
            I: function () { // DST observed?; 0 or 1
                // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                // If they are not equal, then DST is observed.
                var a = new Date(f.Y(), 0),
                    // Jan 1
                    c = Date.UTC(f.Y(), 0),
                    // Jan 1 UTC
                    b = new Date(f.Y(), 6),
                    // Jul 1
                    d = Date.UTC(f.Y(), 6); // Jul 1 UTC
                return ((a - c) !== (b - d)) ? 1 : 0;
            },
            O: function () { // Difference to GMT in hour format; e.g. +0200
                var tzo = jsdate.getTimezoneOffset(),
                    a = Math.abs(tzo);
                return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
            },
            P: function () { // Difference to GMT w/colon; e.g. +02:00
                var O = f.O();
                return (O.substr(0, 3) + ":" + O.substr(3, 2));
            },
            T: function () {
                return 'UTC';
            },
            Z: function () { // Timezone offset in seconds (-43200...50400)
                return -jsdate.getTimezoneOffset() * 60;
            },

            // Full Date/Time
            c: function () { // ISO-8601 date.
                return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
            },
            r: function () { // RFC 2822
                return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
            },
            U: function () { // Seconds since UNIX epoch
                return jsdate / 1000 | 0;
            }
        };
        this.date = function (format, timestamp) {
            that = this;
            jsdate = (timestamp === undefined ? new Date() : // Not provided
                    (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                        new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
            );
            return format.replace(formatChr, formatChrCb);
        };
        return this.date(format, timestamp);
    },
    in_array: function (needle, haystack, argStrict) {
        var key = '',
            strict = !!argStrict;
        if (strict) {
            for (key in haystack) {
                if (haystack[key] === needle) {
                    return true;
                }
            }
        }
        else {
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
        }
        return false;
    },
    array_merge: function () {
        var args = Array.prototype.slice.call(arguments),
            argl = args.length,
            arg,
            retObj = {},
            k = '',
            argil = 0,
            j = 0,
            i = 0,
            ct = 0,
            toStr = Object.prototype.toString,
            retArr = true;

        for (i = 0; i < argl; i++) {
            if (toStr.call(args[i]) !== '[object Array]') {
                retArr = false;
                break;
            }
        }

        if (retArr) {
            retArr = [];
            for (i = 0; i < argl; i++) {
                retArr = retArr.concat(args[i]);
            }
            return retArr;
        }

        for (i = 0, ct = 0; i < argl; i++) {
            arg = args[i];
            if (toStr.call(arg) === '[object Array]') {
                for (j = 0, argil = arg.length; j < argil; j++) {
                    retObj[ct++] = arg[j];
                }
            }
            else {
                for (k in arg) {
                    if (arg.hasOwnProperty(k)) {
                        if (parseInt(k, 10) + '' === k) {
                            retObj[ct++] = arg[k];
                        }
                        else {
                            retObj[k] = arg[k];
                        }
                    }
                }
            }
        }
        return retObj;
    },
    //参考jquery.cookie
    cookie: function (key, value, options) {
        var pluses = /\+/g;
        var config = {};
        config.defaults = {};

        function raw(s) {
            return s;
        }

        function decoded(s) {
            return decodeURIComponent(s.replace(pluses, ' '));
        }

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    },
    empty: function (mixed_var) {
        var undef,
            key,
            i,
            len;
        var emptyValues = [undef, null, false, 0, "", "0", NaN];

        for (i = 0, len = emptyValues.length; i < len; i++) {
            if (mixed_var === emptyValues[i]) {
                return true;
            }
        }

        if (typeof mixed_var === "object") {
            for (key in mixed_var) {
                // TODO: should we check for own properties only?
                //if (mixed_var.hasOwnProperty(key)) {
                return false;
                //}
            }
            return true;
        }

        return false;
    },
    explode: function (delimiter, string, limit) {

        if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') {
            return null;
        }
        if (delimiter === '' || delimiter === false || delimiter === null) {
            return false;
        }
        if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object') {
            return {
                0: ''
            };
        }
        if (delimiter === true) {
            delimiter = '1';
        }

        // Here we go...
        delimiter += '';
        string += '';

        var s = string.split(delimiter);

        if (typeof limit === 'undefined') {
            return s;
        }

        // Support for limit
        if (limit === 0) {
            limit = 1;
        }

        // Positive limit
        if (limit > 0) {
            if (limit >= s.length) {
                return s;
            }
            return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)]);
        }

        // Negative limit
        if (-limit >= s.length) {
            return [];
        }

        s.splice(s.length + limit);
        return s;
    },
    implode: function (glue, pieces) {
        var i = '',
            retVal = '',
            tGlue = '';
        if (arguments.length === 1) {
            pieces = glue;
            glue = '';
        }
        if (typeof pieces === 'object') {
            if (Object.prototype.toString.call(pieces) === '[object Array]') {
                return pieces.join(glue);
            }
            for (i in pieces) {
                retVal += tGlue + pieces[i];
                tGlue = glue;
            }
            return retVal;
        }
        return pieces;
    },
    json_encode: function (mixed_val) {
        var retVal,
            json = window.JSON;
        try {
            if (typeof json === 'object' && typeof json.stringify === 'function') {
                retVal = json.stringify(mixed_val); // Errors will not be caught here if our own equivalent to resource
                //  (an instance of PHPJS_Resource) is used
                if (retVal === undefined) {
                    throw new SyntaxError('json_encode');
                }
                return retVal;
            }

            var value = mixed_val;

            var quote = function (string) {
                var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                var meta = { // table of character substitutions
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"': '\\"',
                    '\\': '\\\\'
                };

                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + string + '"';
            };

            var str = function (key, holder) {
                var gap = '';
                var indent = '    ';
                var i = 0; // The loop counter.
                var k = ''; // The member key.
                var v = ''; // The member value.
                var length = 0;
                var mind = gap;
                var partial = [];
                var value = holder[key];

                // If the value has a toJSON method, call it to obtain a replacement value.
                if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }

                // What happens next depends on the value's type.
                switch (typeof value) {
                    case 'string':
                        return quote(value);

                    case 'number':

                        return isFinite(value) ? String(value) : 'null';

                    case 'boolean':
                    case 'null':

                        return String(value);

                    case 'object':

                        if (!value) {
                            return 'null';
                        }
                        if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource && value instanceof window.PHPJS_Resource)) {
                            throw new SyntaxError('json_encode');
                        }

                        gap += indent;
                        partial = [];

                        // Is the value an array?
                        if (Object.prototype.toString.apply(value) === '[object Array]') {

                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || 'null';
                            }

                            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                            gap = mind;
                            return v;
                        }

                        // Iterate through all of the keys in the object.
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }

                        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                        gap = mind;
                        return v;
                    case 'undefined':
                    // Fall-through
                    case 'function':
                    // Fall-through
                    default:
                        throw new SyntaxError('json_encode');
                }
            };

            return str('', {
                '': value
            });

        } catch (err) { // Todo: ensure error handling above throws a SyntaxError in all cases where it could
            // (i.e., when the JSON global is not available and there is an error)
            if (!(err instanceof SyntaxError)) {
                throw new Error('Unexpected error type in json_encode()');
            }
            this.php_js = this.php_js || {};
            this.php_js.last_error_json = 4; // usable by json_last_error()
            return null;
        }
    },
    json_decode: function (str_json) {
        var json = window.JSON;
        if (typeof json === 'object' && typeof json.parse === 'function') {
            try {
                return json.parse(str_json);
            } catch (err) {
                if (!(err instanceof SyntaxError)) {
                    throw new Error('Unexpected error type in json_decode()');
                }
                this.php_js = this.php_js || {};
                this.php_js.last_error_json = 4; // usable by json_last_error()
                return null;
            }
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var j;
        var text = str_json;

        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a) {
                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }
        if (text) {
            if ((/^[\],:{}\s]*$/).test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                j = eval('(' + text + ')');

                return j;
            }
        }
        this.php_js = this.php_js || {};
        this.php_js.last_error_json = 4; // usable by json_last_error()
        return null;
    },
    intval: function (mixed_var, base) {
        var tmp;
        var type = typeof mixed_var;
        if (type === 'boolean') {
            return +mixed_var;
        }
        else if (type === 'string') {
            tmp = parseInt(mixed_var, base || 10);
            return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
        }
        else if (type === 'number' && isFinite(mixed_var)) {
            return mixed_var | 0;
        }
        else {
            return 0;
        }
    },
    floatval: function (mixed_var) {
        return (parseFloat(mixed_var) || 0);
    },
    time: function () {
        return Math.floor(new Date().getTime() / 1000);
    },
    var_dump: function () {

        var output = '',
            pad_char = ' ',
            pad_val = 4,
            lgth = 0,
            i = 0,
            d = window.document;
        var _getFuncName = function (fn) {
            var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
            if (!name) {
                return '(Anonymous)';
            }
            return name[1];
        };

        var _repeat_char = function (len, pad_char) {
            var str = '';
            for (var i = 0; i < len; i++) {
                str += pad_char;
            }
            return str;
        };
        var _getInnerVal = function (val, thick_pad) {
            var ret = '';
            if (val === null) {
                ret = 'NULL';
            }
            else if (typeof val === 'boolean') {
                ret = 'bool(' + val + ')';
            }
            else if (typeof val === 'string') {
                ret = 'string(' + val.length + ') "' + val + '"';
            }
            else if (typeof val === 'number') {
                if (parseFloat(val) == parseInt(val, 10)) {
                    ret = 'int(' + val + ')';
                }
                else {
                    ret = 'float(' + val + ')';
                }
            }
            // The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
            else if (typeof val === 'undefined') {
                ret = 'undefined';
            }
            else if (typeof val === 'function') {
                var funcLines = val.toString().split('\n');
                ret = '';
                for (var i = 0, fll = funcLines.length; i < fll; i++) {
                    ret += (i !== 0 ? '\n' + thick_pad : '') + funcLines[i];
                }
            }
            else if (val instanceof Date) {
                ret = 'Date(' + val + ')';
            }
            else if (val instanceof RegExp) {
                ret = 'RegExp(' + val + ')';
            }
            else if (val.nodeName) { // Different than PHP's DOMElement
                switch (val.nodeType) {
                    case 1:
                        if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') { // Undefined namespace could be plain XML, but namespaceURI not widely supported
                            ret = 'HTMLElement("' + val.nodeName + '")';
                        }
                        else {
                            ret = 'XML Element("' + val.nodeName + '")';
                        }
                        break;
                    case 2:
                        ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
                        break;
                    case 3:
                        ret = 'TEXT_NODE(' + val.nodeValue + ')';
                        break;
                    case 4:
                        ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
                        break;
                    case 5:
                        ret = 'ENTITY_REFERENCE_NODE';
                        break;
                    case 6:
                        ret = 'ENTITY_NODE';
                        break;
                    case 7:
                        ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
                        break;
                    case 8:
                        ret = 'COMMENT_NODE(' + val.nodeValue + ')';
                        break;
                    case 9:
                        ret = 'DOCUMENT_NODE';
                        break;
                    case 10:
                        ret = 'DOCUMENT_TYPE_NODE';
                        break;
                    case 11:
                        ret = 'DOCUMENT_FRAGMENT_NODE';
                        break;
                    case 12:
                        ret = 'NOTATION_NODE';
                        break;
                }
            }
            return ret;
        };

        var _formatArray = function (obj, cur_depth, pad_val, pad_char) {
            var someProp = '';
            if (cur_depth > 0) {
                cur_depth++;
            }

            var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
            var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
            var str = '';
            var val = '';

            if (typeof obj === 'object' && obj !== null) {
                if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
                    return obj.var_dump();
                }
                lgth = 0;
                for (someProp in obj) {
                    lgth++;
                }
                str += 'array(' + lgth + ') {\n';
                for (var key in obj) {
                    var objVal = obj[key];
                    if (typeof objVal === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) && !objVal.nodeName) {
                        str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val, pad_char);
                    }
                    else {
                        val = _getInnerVal(objVal, thick_pad);
                        str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
                    }
                }
                str += base_pad + '}\n';
            }
            else {
                str = _getInnerVal(obj, thick_pad);
            }
            return str;
        };

        output = _formatArray(arguments[0], 0, pad_val, pad_char);
        for (i = 1; i < arguments.length; i++) {
            output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
        }
        console.log(output);
    },
    parse_hash: function (hash) {
        var result = {},
            res;
        if (this.empty(hash)) {
            hash = window.location.hash;
        }
        hash = this.trim(hash);
        if (hash.indexOf('#') === 0) {
            res = hash.split('#')[1].split('&');
        }
        else {
            res = hash.split('&');
        }
        for (var i = 0; i < res.length; i++) {
            var obj = res[i].split('=');
            if (this.trim(obj[0]).length > 0 && obj.length == 2) {
                result[obj[0]] = obj[1].toString();
            }
        }
        return result;
    },
    urlencode: function (str) {
        str = (str + '').toString();
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    },
    urldecode: function (str) {
        return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi, function () {
            // PHP tolerates poorly formed escape sequences
            return '%25';
        }).replace(/\+/g, '%20'));
    },
    http_build_query: function (formdata, numeric_prefix, arg_separator) {
        var value, key, tmp = [],
            that = this;

        var _http_build_query_helper = function (key, val, arg_separator) {
            var k, tmp = [];
            if (val === true) {
                val = "1";
            }
            else if (val === false) {
                val = "0";
            }
            if (val != null) {
                if (typeof val === "object") {
                    for (k in val) {
                        if (val[k] != null) {
                            tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
                        }
                    }
                    return tmp.join(arg_separator);
                }
                else if (typeof val !== "function") {
                    return that.urlencode(key) + "=" + that.urlencode(val);
                }
                else {
                    throw new Error('There was an error processing for http_build_query().');
                }
            }
            else {
                return '';
            }
        };

        if (!arg_separator) {
            arg_separator = "&";
        }
        for (key in formdata) {
            value = formdata[key];
            if (numeric_prefix && !isNaN(key)) {
                key = String(numeric_prefix) + key;
            }
            var query = _http_build_query_helper(key, value, arg_separator);
            if (query !== '') {
                tmp.push(query);
            }
        }

        return tmp.join(arg_separator);
    },
    strtotime: function (text, now) {
        var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

        if (!text) {
            return fail;
        }

        // Unecessary spaces
        text = text.replace(/^\s+|\s+$/g, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/[\t\r\n]/g, '')
            .toLowerCase();

        match = text.match(
            /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

        if (match && match[2] === match[4]) {
            if (match[1] > 1901) {
                switch (match[2]) {
                    case '-': {
                        // YYYY-M-D
                        if (match[3] > 12 || match[5] > 31) {
                            return fail;
                        }

                        return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '.': {
                        // YYYY.M.D is not parsed by strtotime()
                        return fail;
                    }
                    case '/': {
                        // YYYY/M/D
                        if (match[3] > 12 || match[5] > 31) {
                            return fail;
                        }

                        return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                }
            }
            else if (match[5] > 1901) {
                switch (match[2]) {
                    case '-': {
                        // D-M-YYYY
                        if (match[3] > 12 || match[1] > 31) {
                            return fail;
                        }

                        return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '.': {
                        // D.M.YYYY
                        if (match[3] > 12 || match[1] > 31) {
                            return fail;
                        }

                        return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '/': {
                        // M/D/YYYY
                        if (match[1] > 12 || match[3] > 31) {
                            return fail;
                        }

                        return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                }
            }
            else {
                switch (match[2]) {
                    case '-': {
                        // YY-M-D
                        if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
                            return fail;
                        }

                        year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                        return new Date(year, parseInt(match[3], 10) - 1, match[5],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case '.': {
                        // D.M.YY or H.MM.SS
                        if (match[5] >= 70) {
                            // D.M.YY
                            if (match[3] > 12 || match[1] > 31) {
                                return fail;
                            }

                            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                                    match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                        }
                        if (match[5] < 60 && !match[6]) {
                            // H.MM.SS
                            if (match[1] > 23 || match[3] > 59) {
                                return fail;
                            }

                            today = new Date();
                            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                    match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
                        }

                        // invalid format, cannot be parsed
                        return fail;
                    }
                    case '/': {
                        // M/D/YY
                        if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
                            return fail;
                        }

                        year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                        return new Date(year, parseInt(match[1], 10) - 1, match[3],
                                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    case ':': {
                        // HH:MM:SS
                        if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                            return fail;
                        }

                        today = new Date();
                        return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                                match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
                    }
                }
            }
        }

        // other formats and "now" should be parsed by Date.parse()
        if (text === 'now') {
            return now === null || isNaN(now) ? new Date()
                .getTime() / 1000 | 0 : now | 0;
        }
        if (!isNaN(parsed = Date.parse(text))) {
            return parsed / 1000 | 0;
        }

        date = now ? new Date(now * 1000) : new Date();
        days = {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        };
        ranges = {
            'yea': 'FullYear',
            'mon': 'Month',
            'day': 'Date',
            'hou': 'Hours',
            'min': 'Minutes',
            'sec': 'Seconds'
        };

        function lastNext(type, range, modifier) {
            var diff, day = days[range];

            if (typeof day !== 'undefined') {
                diff = day - date.getDay();

                if (diff === 0) {
                    diff = 7 * modifier;
                }
                else if (diff > 0 && type === 'last') {
                    diff -= 7;
                }
                else if (diff < 0 && type === 'next') {
                    diff += 7;
                }

                date.setDate(date.getDate() + diff);
            }
        }

        function process(val) {
            var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
                type = splt[0],
                range = splt[1].substring(0, 3),
                typeIsNumber = /\d+/.test(type),
                ago = splt[2] === 'ago',
                num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

            if (typeIsNumber) {
                num *= parseInt(type, 10);
            }

            if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
                return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
            }

            if (range === 'wee') {
                return date.setDate(date.getDate() + (num * 7));
            }

            if (type === 'next' || type === 'last') {
                lastNext(type, range, num);
            }
            else if (!typeIsNumber) {
                return false;
            }

            return true;
        }

        times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
            '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
            '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
        regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

        match = text.match(new RegExp(regex, 'gi'));
        if (!match) {
            return fail;
        }

        for (i = 0, len = match.length; i < len; i++) {
            if (!process(match[i])) {
                return fail;
            }
        }

        // ECMAScript 5 only
        // if (!match.every(process))
        //    return false;

        return (date.getTime() / 1000);
    },
    imgDirectLink: function (url) {
        return url;
        if (url) {
            return _global.root + '?m=public&a=imgDirectLink&url=' + _.urlencode(url);
        }
        else {
            return _global.upload_url + 'no_picture.gif';
        }
    },
    fsize: function (size) {
        size = _.intval(size);
        if (size < 1024) {
            return size + 'Byte';
        }
        if (size < 1024 * 1024) {
            return Math.round(size / 1024, 2) + 'KB';
        }
        if (size < 1024 * 1024 * 1024) {
            return Math.round(size / (1024 * 1024), 2) + 'MB';
        }
    },
    is_url: function (url) {
        var res = _.parse_url(url);
        return !_.empty(res['host']) && !_.empty(res['scheme']) && _.in_array(res['scheme'], ['http', 'https']);
    },
    wx_avatar: function (url, size) {
        if (_.empty(url)) {
            return _global.static_url + 'images/mp.gif';
        }
        var res = _.parse_url(url),
            size = size || 64;
        if (res['host'] != 'wx.qlogo.cn') {
            return url;
        }

        return url.substring(0, url.lastIndexOf('/')) + '/' + size;
    },
    attach: function (path, type, full_url) {
        path = _.trim(path);
        if (_.empty(path) || path == 'undefined') {
            return _global.upload_url + 'no_picture.gif';
        }
        if (_.is_url(path)) {
            return path;
        }
        if (path.indexOf('static') === 0) {
            return _.str_replace('static/', _global.static_url, path);
        }
        if (path.indexOf('__STATIC__') >= 0) {
            return _.str_replace('__STATIC__/', _global.static_url, path);
        }
        if (_.empty(type)) {
            type = 'assets';
        }
        return _global.upload_url + type + '/' + path;
    },
    U: function (params) {
        var defaults = {g: _global.g, m: _global.m, a: _global.a};
        if (_global.g == 'wap') {
            defaults = _.extend(defaults, {mp_id: _global.mp_id});
            if (!_global.is_mobile) {
                _.defaults(defaults, {iframe: '1'});
            }
        }
        params = _.defaults(params, defaults);
        var result = _global.root;
        //生成重写url
        if (_global.URL_ROUTER_ON) {
            return result + _.sprintf("%s/%s/%s%s%s", _.isset(params.g) ? params.g : "",
                    params.m, params.a,
                    _.isset(_global.URL_HTML_SUFFIX) ? _global.URL_HTML_SUFFIX : "",
                    _.empty(_.omit(params, 'g', 'm', 'a')) ? "" : "?" + _.http_build_query(_.omit(params, 'g', 'm', 'a'))
                );
        }
        else {
            return result + 'index.php?' + _.http_build_query(params);
        }

    },
    wap_url: function (params) {
        if (_global.g == 'usercenter') {
            _.defaults(params, {mp_id: _global.mp.id, g: 'wap'});
        }
        return _.U(params);
    },
    object_filter: function (obj, filter) {
        var result = {};
        _.each(obj, function (val, key) {
            if (_.in_array(key, filter)) {
                result[key] = val;
            }
        });
        return result;
    },
    html_select: function (name, list, selected) {
        var format = '<select class="form-control" name="%s">%s</select>';
        var html = '<option>请选择……</option>';
        _.each(list, function (val, key) {
            html += '<option value="' + val.id + '" ' + (val.id == selected ? 'selected' : '') + '>' + val.title + '</option>';
        });
        return _.sprintf(format, name, html);
    },
    html_radio: function (name, list, selected) {
        var html = '';
        _.each(list, function (val, key) {
            html += '<label class="radio-inline">\
            <input ' + (val.val == selected ? 'checked="checked"' : '') + ' type="radio" name="' + name + '" class="uniform" value="' + val.val + '">' + val.title + '\
                </label>';
        });
        return html;
    },
    html_yesno_radio: function (name, selected) {
        var list = [];
        selected = _.intval(selected);
        switch (name) {
            case 'status':
                list = [
                    {val: 1, title: '已审核'},
                    {val: 0, title: '未审核'}
                ];
                break;
            case 'is_full':
            case 'reply[is_full]':
                list = [
                    {val: 1, title: '精确匹配'},
                    {val: 0, title: '模糊匹配'}
                ];
                break;
        }
        return _.html_radio(name, list, selected);
    },
    get_search_type: function () {
        return window.location.search.substr('?type='.length);
    },
    getUrl: function (o) {
        if (_.empty(o)) {
            return o;
        }
        if (_.is_url(o)) {
            return o;
        }
        if (_.isString(o)) {
            o = _.json_decode(o);
        }
        return _.U(_.extend({
            g: 'wap',
            m: 'site',
            mp_id: _global.mp.id
        }, o));
    }
});
