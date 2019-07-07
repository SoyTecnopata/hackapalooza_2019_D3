var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * UAParser.js v0.7.17
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 & MIT
 */
(function (window, undefined) {
    "use strict";
    var LIBVERSION = "0.7.17",
        EMPTY = "",
        UNKNOWN = "?",
        FUNC_TYPE = "function",
        UNDEF_TYPE = "undefined",
        OBJ_TYPE = "object",
        STR_TYPE = "string",
        MAJOR = "major",
        MODEL = "model",
        NAME = "name",
        TYPE = "type",
        VENDOR = "vendor",
        VERSION = "version",
        ARCHITECTURE = "architecture",
        CONSOLE = "console",
        MOBILE = "mobile",
        TABLET = "tablet",
        SMARTTV = "smarttv",
        WEARABLE = "wearable",
        EMBEDDED = "embedded";var util = { extend: function extend(regexes, extensions) {
            var margedRegexes = {};for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    margedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    margedRegexes[i] = regexes[i];
                }
            }return margedRegexes;
        }, has: function has(str1, str2) {
            if (typeof str1 === "string") {
                return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
            } else {
                return false;
            }
        }, lowerize: function lowerize(str) {
            return str.toLowerCase();
        }, major: function major(version) {
            return (typeof version === "undefined" ? "undefined" : _typeof(version)) === STR_TYPE ? version.replace(/[^\d\.]/g, "").split(".")[0] : undefined;
        }, trim: function trim(str) {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        } };var mapper = { rgx: function rgx(ua, arrays) {
            var i = 0,
                j,
                k,
                p,
                q,
                matches,
                match;while (i < arrays.length && !matches) {
                var regex = arrays[i],
                    props = arrays[i + 1];j = k = 0;while (j < regex.length && !matches) {
                    matches = regex[j++].exec(ua);if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];q = props[p];if ((typeof q === "undefined" ? "undefined" : _typeof(q)) === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (_typeof(q[1]) == FUNC_TYPE) {
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    if (_typeof(q[1]) === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }i += 2;
            }
        }, str: function str(_str2, map) {
            for (var i in map) {
                if (_typeof(map[i]) === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], _str2)) {
                            return i === UNKNOWN ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], _str2)) {
                    return i === UNKNOWN ? undefined : i;
                }
            }return _str2;
        } };var maps = { browser: { oldsafari: { version: { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" } } }, device: { amazon: { model: { "Fire Phone": ["SD", "KF"] } }, sprint: { model: { "Evo Shift 4G": "7373KT" }, vendor: { HTC: "APA", Sprint: "Sprint" } } }, os: { windows: { version: { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2000: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" } } } };var regexes = { browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i], [[NAME, "Opera Mini"], VERSION], [/\s(opr)\/([\w\.]+)/i], [[NAME, "Opera"], VERSION], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[NAME, "IE"], VERSION], [/(edge)\/((\d+)?[\w\.]+)/i], [NAME, VERSION], [/(yabrowser)\/([\w\.]+)/i], [[NAME, "Yandex"], VERSION], [/(puffin)\/([\w\.]+)/i], [[NAME, "Puffin"], VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [[NAME, "UCBrowser"], VERSION], [/(comodo_dragon)\/([\w\.]+)/i], [[NAME, /_/g, " "], VERSION], [/(micromessenger)\/([\w\.]+)/i], [[NAME, "WeChat"], VERSION], [/(QQ)\/([\d\.]+)/i], [NAME, VERSION], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i], [NAME, VERSION], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [VERSION, [NAME, "MIUI Browser"]], [/;fbav\/([\w\.]+);/i], [VERSION, [NAME, "Facebook"]], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [VERSION, [NAME, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[NAME, /(.+)/, "$1 WebView"], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[NAME, /(.+(?:g|us))(.+)/, "$1 $2"], VERSION], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], [VERSION, [NAME, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i], [[NAME, "Dolphin"], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[NAME, "Chrome"], VERSION], [/(coast)\/([\w\.]+)/i], [[NAME, "Opera Coast"], VERSION], [/fxios\/([\w\.-]+)/i], [VERSION, [NAME, "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [VERSION, [NAME, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [VERSION, NAME], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [[NAME, "GSA"], VERSION], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [/(navigator|netscape)\/([\w\.-]+)/i], [[NAME, "Netscape"], VERSION], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [NAME, VERSION]], cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[ARCHITECTURE, "amd64"]], [/(ia32(?=;))/i], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[ARCHITECTURE, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[ARCHITECTURE, /ower/, "", util.lowerize]], [/(sun4\w)[;\)]/i], [[ARCHITECTURE, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[ARCHITECTURE, util.lowerize]]], device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/], [MODEL, [VENDOR, "Apple"], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i], [[MODEL, "Apple TV"], [VENDOR, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, "Amazon"], [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i], [MODEL, [VENDOR, "Apple"], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i], [MODEL, [VENDOR, "BlackBerry"], [TYPE, MOBILE]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [MODEL, [VENDOR, "Asus"], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, "Sony"], [MODEL, "Xperia Tablet"], [TYPE, TABLET]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [MODEL, [VENDOR, "Sony"], [TYPE, MOBILE]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i], [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i], [MODEL, [VENDOR, "Sony"], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]], [/(nexus\s9)/i], [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i], [MODEL, [VENDOR, "Huawei"], [TYPE, MOBILE]], [/(microsoft);\s(lumia[\s\w]+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [MODEL, [VENDOR, "Microsoft"], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i], [[MODEL, /\./g, " "], [VENDOR, "Microsoft"], [TYPE, MOBILE]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [MODEL, [VENDOR, "Motorola"], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, "Motorola"], [TYPE, TABLET]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, "SmartTV"], [VENDOR, "Samsung"], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i], [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, TABLET]], [/smart-tv.+(samsung)/i], [VENDOR, [TYPE, SMARTTV], MODEL], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, MOBILE]], [/sie-(\w+)*/i], [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[VENDOR, "Nokia"], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]], [/android.+([vl]k\-?\d{3})\s+build/i], [MODEL, [VENDOR, "LG"], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[VENDOR, "LG"], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i, /android.+lg(\-?[\d\w]+)\s+build/i], [MODEL, [VENDOR, "LG"], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]], [/linux;.+((jolla));/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/crkey/i], [[MODEL, "Chromecast"], [VENDOR, "Google"]], [/android.+;\s(glass)\s\d/i], [MODEL, [VENDOR, "Google"], [TYPE, WEARABLE]], [/android.+;\s(pixel c)\s/i], [MODEL, [VENDOR, "Google"], [TYPE, TABLET]], [/android.+;\s(pixel xl|pixel)\s/i], [MODEL, [VENDOR, "Google"], [TYPE, MOBILE]], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+)?)\s+build/i], [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, MOBILE]], [/android.+(mi[\s\-_]*(?:pad)?(?:[\s_]*[\w\s]+)?)\s+build/i], [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, TABLET]], [/android.+;\s(m[1-5]\snote)\sbuild/i], [MODEL, [VENDOR, "Meizu"], [TYPE, TABLET]], [/android.+a000(1)\s+build/i], [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i], [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]], [/android.+[;\/]\s*(Venue[\d\s]*)\s+build/i], [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i], [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i], [[VENDOR, "Barnes & Noble"], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i], [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]], [/android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i], [[VENDOR, "ZTE"], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i], [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]], [/android.+[;\/]\s*(zur\d{3})\s+build/i], [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i], [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]], [/(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i], [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(NS-?.+)\s+build/i], [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]], [/android.+[;\/]\s*((NX|Next)-?.+)\s+build/i], [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]], [/android.+[;\/]\s*(Xtreme\_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]], [/android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i], [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i], [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i], [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*TU_(1491)\s+build/i], [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]], [/android.+(KS(.+))\s+build/i], [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]], [/android.+(Gigaset)[\s\-]+(Q.+)\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[TYPE, util.lowerize], VENDOR, MODEL], [/(android.+)[;\/].+build/i], [MODEL, [VENDOR, "Generic"]]], engine: [[/windows.+\sedge\/([\w\.]+)/i], [VERSION, [NAME, "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [NAME, VERSION], [/rv\:([\w\.]+).*(gecko)/i], [VERSION, NAME]], os: [[/microsoft\s(windows)\s(vista|xp)/i], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, "Windows"], [VERSION, mapper.str, maps.os.windows.version]], [/\((bb)(10);/i], [[NAME, "BlackBerry"], VERSION], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[NAME, "Symbian"], VERSION], [/\((series40);/i], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[NAME, "Firefox OS"], VERSION], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[NAME, "Chromium OS"], VERSION], [/(sunos)\s?([\w\.]+\d)*/i], [[NAME, "Solaris"], VERSION], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [NAME, VERSION], [/(haiku)\s(\w+)/i], [NAME, VERSION], [/cfnetwork\/.+darwin/i, /ip[honead]+(?:.*os\s([\w]+)\slike\smac|;\sopera)/i], [[VERSION, /_/g, "."], [NAME, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i], [[NAME, "Mac OS"], [VERSION, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i], [NAME, VERSION]] };var UAParser = function UAParser(uastring, extensions) {
        if ((typeof uastring === "undefined" ? "undefined" : _typeof(uastring)) === "object") {
            extensions = uastring;uastring = undefined;
        }if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };mapper.rgx.call(browser, ua, rgxmap.browser);browser.major = util.major(browser.version);return browser;
        };this.getCPU = function () {
            var cpu = { architecture: undefined };mapper.rgx.call(cpu, ua, rgxmap.cpu);return cpu;
        };this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };mapper.rgx.call(device, ua, rgxmap.device);return device;
        };this.getEngine = function () {
            var engine = { name: undefined, version: undefined };mapper.rgx.call(engine, ua, rgxmap.engine);return engine;
        };this.getOS = function () {
            var os = { name: undefined, version: undefined };mapper.rgx.call(os, ua, rgxmap.os);return os;
        };this.getResult = function () {
            return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
        };this.getUA = function () {
            return ua;
        };this.setUA = function (uastring) {
            ua = uastring;return this;
        };return this;
    };UAParser.VERSION = LIBVERSION;UAParser.BROWSER = { NAME: NAME, MAJOR: MAJOR, VERSION: VERSION };UAParser.CPU = { ARCHITECTURE: ARCHITECTURE };UAParser.DEVICE = { MODEL: MODEL, VENDOR: VENDOR, TYPE: TYPE, CONSOLE: CONSOLE, MOBILE: MOBILE, SMARTTV: SMARTTV, TABLET: TABLET, WEARABLE: WEARABLE, EMBEDDED: EMBEDDED };UAParser.ENGINE = { NAME: NAME, VERSION: VERSION };UAParser.OS = { NAME: NAME, VERSION: VERSION };if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) !== UNDEF_TYPE) {
        if ((typeof module === "undefined" ? "undefined" : _typeof(module)) !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }exports.UAParser = UAParser;
    } else {
        if ((typeof define === "undefined" ? "undefined" : _typeof(define)) === FUNC_TYPE && define.amd) {
            define(function () {
                return UAParser;
            });
        } else if (window) {
            window.UAParser = UAParser;
        }
    }var $ = window && (window.jQuery || window.Zepto);if ((typeof $ === "undefined" ? "undefined" : _typeof($)) !== UNDEF_TYPE) {
        var parser = new UAParser();$.ua = parser.getResult();$.ua.get = function () {
            return parser.getUA();
        };$.ua.set = function (uastring) {
            parser.setUA(uastring);var result = parser.getResult();for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }
})((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : undefined);
/**
 * sdk 上报脚本
 */
(function () {
    //公共字段
    var publicData = {};
    //用户字段
    var userData = {};
    //页面字段
    var pageData = {
        page_id: '',
        page_name: '',
        page_param: '',
        start_time: '',
        end_time: '',
        tab_page_id: ''
    };
    //配置字段
    var globalSetting = {};
    //全局过程变量
    var globalTempData = {
        status: 0, // 0：初始化 1：公共数据完毕
        startTime: ''
    };
    var clearSessionIdConfig = {
        watingTime: 60 * 60 * 30,
        setTimeoutInstance: null

        // GUID 生成
    };function guid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
        }
        return guid;
    }
    function getUaParser() {
        return new UAParser().getResult(); //依赖common.js
    }
    // 系统名称
    function getPlatform() {
        return getUaParser().os.name;
    }
    // 系统版本
    function getOSVersion() {
        return getUaParser().os.version;
    }
    // 设备设备系统
    function getOS() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return 'Phone';
        } else if (bIsIpad) {
            return 'Tablet';
        } else {
            return 'Desktop';
        }
    }
    // 浏览器版本
    function getBrowserInfo() {
        var browerType, browerVersion;
        var _getUaParser$browser = getUaParser().browser,
            browerType = _getUaParser$browser.name,
            browerVersion = _getUaParser$browser.version;

        return {
            browerType: browerType,
            browerVersion: browerVersion
        };
    }
    // 获取地址位置，经纬度
    function getPosition() {
        var pos = '';
        return pos;
    }
    //时间格式化
    function timeFormat(_format, _time) {
        _time ? '' : _time = new Date();
        var result = '';
        switch (_format) {
            case 'xxxx/x/x x:xx:xx':
                result = _time.getFullYear() + '/' + (_time.getMonth() + 1) + '/' + _time.getDate() + " " + _time.getHours() + ':' + addZero(_time.getMinutes()) + ':' + addZero(_time.getSeconds());
                break;
            case 'xxxx/xx/xx xx:xx:xx':
                result = _time.getFullYear() + '/' + addZero(_time.getMonth() + 1) + '/' + addZero(_time.getDate()) + " " + addZero(_time.getHours()) + ':' + addZero(_time.getMinutes()) + ':' + addZero(_time.getSeconds());
                break;
            default:
                break;
        }
        return result;
    }
    //补零
    function addZero(_str, _len) {
        _len ? '' : _len = 2;
        _str += '';
        for (var i = 0, length = _len - _str.length; i < length; i++) {
            _str = '0' + _str;
        }
        return _str;
    }
    //extend 方法定义
    function extend() {
        var isArray = function isArray(arr) {
            if (typeof Array.isArray == 'function') {
                return Array.isArray(arr);
            } else {
                return Object.prototype.toString.call(arg) === '[object Array]';
            }
        };
        var iteratorFun = function iteratorFun(prev, next) {
            prev = prev || {};
            next = next || {};
            Object.keys(next).forEach(function (key) {
                if (_typeof(prev[key]) == 'object' && !isArray(prev[key]) && _typeof(next[key]) == 'object' && !isArray(next[key])) {
                    iteratorFun(prev[key], next[key]);
                } else {
                    prev[key] = next[key];
                }
            });
            return prev;
        };
        var temp = [];
        for (var i = 0; i < arguments.length; i++) {
            temp[i] = arguments[i];
        }
        return temp.reduce(function (prev, next) {
            return iteratorFun(prev, next);
        });
    }
    //ajax 定义
    function ajax() {
        var ajaxData = {
            type: arguments[0].type || "GET",
            url: arguments[0].url || "",
            async: arguments[0].async || "true",
            data: arguments[0].data || null,
            contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
            headers: arguments[0].headers || {}
        };
        var xhr = createxmlHttpRequest();
        xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
        xhr.setRequestHeader("Content-Type", ajaxData.contentType);
        if (ajaxData.headers) {
            Object.keys(ajaxData.headers).forEach(function (key) {
                xhr.setRequestHeader(key, ajaxData.headers[key]);
            });
        }
        xhr.send(ajaxData.data);
    }
    function createxmlHttpRequest() {
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    //获取站点原始数据(国家)
    function getSite_ori() {
        var meta = document.getElementsByTagName('meta');
        return meta && meta['site-info'] && meta['site-info'].getAttribute('data-lang');
    }
    //获取站点
    function getSite() {
        return globalSetting.SiteUID;
    }
    //获取指定名称的cookie的值
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return decodeURIComponent(parts.pop().split(";").shift());
        } else {
            return '';
        }
    }
    //获取语言
    function getLang() {
        // var meta = document.getElementsByTagName('meta')
        // return meta && meta['site-info'] && meta['site-info'].getAttribute('data-app-language')
        return globalSetting.appLanguage;
    }
    //获取浏览器语言
    function getSysLang() {
        return navigator.language;
    }
    //获取货币
    function getCurrency() {
        var result = '';
        if (globalSetting.currency) {
            if (globalSetting.currency.cookieKey.split('+').length > 1) {
                var site = getSite_ori();
                result = getCookie(globalSetting.currency.cookieKey.split('+')[0] + site);
            } else {
                result = getCookie(globalSetting.currency.cookieKey);
            }
            if (!result) {
                result = globalSetting.currency.cookieKeyDefault && getCookie(globalSetting.currency.cookieKeyDefault) || globalSetting.currency.cookieValueDefault || '';
            }
        }
        return result;
    }
    //获取服务器所在地区(国家)
    function getCountry() {
        var result = globalSetting.country && (getCookie(globalSetting.country.cookieKey) || globalSetting.country.cookieKeyDefault && getCookie(globalSetting.country.cookieKeyDefault) || globalSetting.country.cookieValueDefault) || '';
        return result;
    }
    //获取邮箱(判断是否登录)
    function getEmail() {
        var result = globalSetting.email && getCookie(globalSetting.email.cookieKey) || '';
        return result;
    }
    //获取用户id
    function getUserId() {
        var result = globalSetting.userId && getCookie(globalSetting.userId.cookieKey) || '';
        return result;
    }
    function getSessionId() {
        //利用sessionStorage 记录会话
        //算法 bi_+时间+随机数10000
        var biSessionId = '';
        try {
            biSessionId = sessionStorage.getItem('bi_session_id');
        } catch (e) {}
        if (!biSessionId) {
            try {
                sessionStorage.setItem('bi_session_id', 'bi_' + new Date().getTime() + '_' + Math.floor(Math.random() * 100000));
                biSessionId = sessionStorage.getItem('bi_session_id');
            } catch (e) {}
        }
        return biSessionId;
    }
    // 获取公共信息
    function getPublic() {
        var OS = getOS();

        var _getBrowserInfo = getBrowserInfo(),
            browerType = _getBrowserInfo.browerType,
            browerVersion = _getBrowserInfo.browerVersion;

        return {
            device_type: globalSetting.deviceType,
            home_site: globalSetting.homeSite,
            sub_site: getSite(),
            language: getLang(),
            system_language: getSysLang(),
            money_type: '',
            device_country: '',
            app_versions: '',
            network_type: '',
            ip: '',
            screen_pixel: window.screen.width * (window.devicePixelRatio || 1) + 'X' + window.screen.height * (window.devicePixelRatio || 1),
            screen_size: '',
            device_class: OS == 'Phone' ? 0 : OS == 'Desktop' ? 1 : OS == 'Tablet' ? 2 : 3,
            device_brand: '',
            device_name: '',
            device_model: '',
            os_type: OS == 'Phone' || OS == 'Tablet' ? 0 : OS == 'Desktop' ? 1 : 2,
            os_name: getPlatform(),
            os_versions: getOSVersion(),
            browser_name: browerType,
            browser_versions: browerVersion,
            session_id: '',
            channel: getChannelId(),
            origin_otherid: getOriginOtherId(),
            origin_id: getOriginId(),
            origin_type: getOriginType(),
            traffic_source: getrefer(),
            market: '',
            activity_param: '',
            activity_name: '',
            //环境变量 localhost/debug/gray/production
            environment: globalSetting.environment
        };
    }

    //获取广告来源id
    function getChannelId() {
        return getQueryString('url_from') || "";
    }

    function getOriginOtherId() {
        return getCookie('originOtherId') || "";
    }

    function getOriginId() {
        return getCookie('originId') || "";
    }

    function getOriginType() {
        return getCookie('origin_type') || "";
    }

    function getrefer() {
        return encodeURIComponent(document.referrer) || "";
    }

    //获取url 参数
    function getQueryString(name) {
        //get url query params
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    // 获取用户信息
    function getUserData() {
        return {
            device_id: '', //pc/m为空，该字段是为app设置的
            cookie_id: '',
            member_id: '',
            session_id: '',
            login: -1
        };
    }

    //刷新公共信息
    function refreshPublicData() {
        var now = new Date();
        var refreshData = {
            timestamp: now.getTime(),
            local_time: timeFormat('xxxx/xx/xx xx:xx:xx', now),
            money_type: publicData.money_type || getCurrency(),
            device_country: publicData.device_country || getCountry()
        };
        extend(publicData, refreshData);
    }
    //刷新用户信息
    function refreshUserData() {
        var refreshData = {
            cookie_id: userData.cookie_id || globalSetting.cookieId && getCookie(globalSetting.cookieId.cookieKey) || '',
            member_id: userData.member_id || getUserId(), //有效期为7天
            session_id: userData.session_id || getSessionId(), //有效期为7天
            login: userData.login != -1 ? userData.login : getEmail() ? 1 : 0
        };
        extend(userData, refreshData);
    }
    //刷新页面信息
    function refreshPageData() {
        pageData.tab_page_id = pageData.page_name ? pageData.page_name + (pageData.start_time || globalTempData.startTime || publicData.timestamp) : '';
    }
    function setPageReferer() {
        extend(publicData, {
            referer: encodeURIComponent(window.location.href)
        });
    }

    // 清除sessionId
    function clearSessionId() {
        userData.session_id = null;
        sessionStorage.removeItem('bi_session_id');
    }
    // 当前版本
    function version() {
        return 1.1;
    }
    function sheinAnalysis(_command, _action, _data, _other, isPageVisible) {
        switch (_command) {
            case 'set':
                analysisSetting(_action, _data);
                break;
            case 'send':
                reportData(_action, _data, _other, isPageVisible);
                break;
            case 'error':
                reportError(_action, _data);
                break;
            case 'performance':
                reportPerformance(_action, _data);
                break;
            default:
                break;
        }
    }
    //设置 配置字段
    function analysisSetting(_action, _data) {
        if ((typeof _action === "undefined" ? "undefined" : _typeof(_action)) == "object") {
            _data = _action;
            _action = "common"; //普通设置
        }
        switch (_action) {//指令全局
            case 'setPageData':
                extend(pageData, _data);
                pageData.page_param = _data.page_param || '';
                refreshPageData();
                setPageReferer();
                if (globalTempData.status == 0) {
                    init(); //加载时序的问题，不至于全部没有数据，但会有部分数据缺失
                }
                break;
            case 'init':
                extend(globalSetting, _data);
                init();
                break;
            default:
                if (_data) {
                    //静态全局
                    extend(globalSetting, _data);
                }
                break;
        }
    }
    //上报数据
    // 参数 isPageVisible 是利用页面可见性更新页面浏览事件
    function reportData(_action, _data, _other, isPageVisible) {
        clearTimeout(clearSessionIdConfig.setTimeoutInstance);
        if ((typeof _action === "undefined" ? "undefined" : _typeof(_action)) == "object") {
            if ((typeof _data === "undefined" ? "undefined" : _typeof(_data)) == "object") {
                _other = _data;
            }
            _data = _action;
            _action = "common"; //普通设置
        }

        if (isPageVisible) {
            globalTempData.startTime = publicData.timestamp;
            refreshPageData();
        }

        beforeReport();
        switch (_action) {
            case 'pageEnter':
                _data.activity_name = 'page_view';
                if (pageData.start_time) _data.start_time = pageData.start_time;
                if (_data.start_time) {
                    publicData.timestamp = _data.start_time;
                    if (!isPageVisible) globalTempData.startTime = publicData.timestamp;
                }
                break;
            case 'pageLeave':
                _data.activity_name = 'page_view';
                _data.end_time = publicData.timestamp;
                _data.start_time = globalTempData.startTime;
                break;
            default:
                break;
        }
        if (Array.isArray(_data)) {
            //一口气发多条数据
            _data = _data.map(function (item) {
                return extend({}, publicData, userData, pageData, item);
            });
        } else {
            _data = extend({}, publicData, userData, pageData, _data);
        }
        if (_action == 'pageLeave') {
            //发不出去，存起来， 下次再发
            var gaWaitingCommands = '';
            if (typeof ga == 'undefined') {
                gaWaitingCommands = {
                    activity_name: 'click_ga_waiting_command',
                    activity_param: {
                        command: 'ga undefined'
                    },
                    end_time: ''
                };
            } else if (ga.q && ga.q.length) {
                gaWaitingCommands = {
                    activity_name: 'click_ga_waiting_command',
                    activity_param: {
                        command: ga.q[0] && ga.q[0][0]
                    },
                    end_time: ''
                };
            }
            if (navigator && typeof navigator.sendBeacon == 'function') {
                sendData(JSON.stringify(_data), extend({}, _other, { beacon: 1 }));
                if (gaWaitingCommands) {
                    sendData(JSON.stringify(extend({}, _data, gaWaitingCommands)), extend({}, _other, { beacon: 1 }));
                }
            } else {
                window.localStorage.setItem('sa_pageLeave', JSON.stringify(_data));
                if (gaWaitingCommands) {
                    window.localStorage.setItem('ga_waiting_commands', JSON.stringify(extend({}, _data, gaWaitingCommands)));
                }
            }
        } else {
            sendData(JSON.stringify(_data), _other);
        }

        // set clearSessionId setTimeout
        clearSessionIdConfig.setTimeoutInstance = setTimeout(function () {
            clearSessionId();
        }, clearSessionIdConfig.watingTime);
    }
    function sendData(_jsonData, _other) {
        if (_other && _other.beacon && navigator && typeof navigator.sendBeacon == 'function') {
            var formData = new FormData();
            formData.append('access_token ', 'NHWgg6YpfUlGukgBju2QqwRgzs0QeqQP');
            formData.append('ds_access_site', globalSetting.homeSite || 'shein');
            formData.append('content', _jsonData);
            navigator.sendBeacon(location.protocol + '//www.srmdata.com/beacon', formData);
        } else {
            ajax({
                url: location.protocol + '//www.srmdata.com/msg',
                type: 'POST',
                contentType: 'application/json',
                headers: {
                    "DS-ACCESS-TOKEN": "4bc3a2dd3549401b817438eede7e78da",
                    "DS-ACCESS-SITE": globalSetting.homeSite || 'shein'
                },
                data: _jsonData
            });
        }
    }
    // 上报错误
    function reportError(url, baseData) {
        beforeReport();
        var data = extend({}, baseData, publicData, userData);

        var referer = data.referer,
            cookie_id = data.cookie_id;

        // 过滤部分非本域名下上报

        var hostnameFilter = ['shein.com', 'shein.co', 'shein.in', 'shein.tw', 'shein.se', 'sheinoutlet.com', 'emmacloth.com', 'makemechic.com', 'romwe.com', 'romwe.co'];
        var hostPass = hostnameFilter.some(function (host) {
            return referer.indexOf(host) > -1;
        });
        if (!hostPass) return false;

        // 若无cookieid不上报
        if (!cookie_id) return false;

        var jsonData = JSON.stringify(data);
        ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            headers: {
                "DS-ACCESS-TOKEN": "4bc3a2dd3549401b817438eede7e78da",
                "DS-ACCESS-SITE": globalSetting.homeSite || 'shein'
            },
            data: jsonData
        });
    }
    // 上报性能
    function reportPerformance(url, baseData) {
        beforeReport();
        var data = extend({}, baseData, publicData, userData);
        var jsonData = JSON.stringify(data);
        ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            headers: {
                "DS-ACCESS-TOKEN": "4bc3a2dd3549401b817438eede7e78da",
                "DS-ACCESS-SITE": globalSetting.homeSite || 'shein'
            },
            data: jsonData
        });
    }
    function beforeReport() {
        //刷新公共信息
        refreshPublicData();
        //刷新用户信息
        refreshUserData();
        //刷新页面信息
        //refreshPageData();
    }
    function afterReport() {}
    //启动
    function init() {
        extend(publicData, getPublic());
        extend(userData, getUserData());
        beforeReport();
        setPageReferer();
        //发上一个页面没有发出去的消息
        var lastMessage = window.localStorage.getItem('sa_pageLeave');
        if (lastMessage) {
            sendData(lastMessage);
            window.localStorage.removeItem('sa_pageLeave');
        }
        var gaWaitingCommands = window.localStorage.getItem('ga_waiting_commands');
        if (gaWaitingCommands) {
            sendData(gaWaitingCommands);
            window.localStorage.removeItem('gaWaitingCommands');
        }
        globalTempData.status = 1;
    }
    //暴露成全局对象
    if (typeof window.sa != 'undefined' && window.sa.waitingCommands && window.sa.waitingCommands.length > 0) {
        for (var i = 0; i < window.sa.waitingCommands.length; i++) {
            sheinAnalysis.apply(window, window.sa.waitingCommands[i]);
        }
    }
    window.sa = window.sheinAnalysis = sheinAnalysis;
    window.getSaPageInfo = pageData;
})();