/* 
CSSHttpRequest
Copyright 2008 nb.io - http://nb.io/
Licensed under Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html
*/

(function(){
    var chr = window.CSSHttpRequest = {};
    
    
    chr.id = 0;
    chr.requests = {};
    chr.MATCH_ORDINAL = /#c(\d+)/;
    chr.MATCH_URL = /url\("?data\:[^,]*,([^")]+)"?\)/;
    
    
    chr.get = function(url, callback) {
        var id = ++chr.id;
        var iframe = document.createElement( "iframe" );
        iframe.style.position = "absolute";
        iframe.style.left = iframe.style.top = "-1000px";
        iframe.style.width = iframe.style.height = 0;
        document.documentElement.appendChild(iframe);
        var r = chr.requests[id] = {
            id: id,
            iframe: iframe,
            document: iframe.contentDocument || iframe.contentWindow.document,
            callback: callback
        };
        
        r.document.open("text/html", false);
        r.document.write("<html><head>");
        r.document.write("<link rel='stylesheet' type='text/css' media='print, csshttprequest' href='" + chr.escapeHTML(url) + "' />");
        r.document.write("</head><body>");
        r.document.write("<script type='text/javascript'>");
        r.document.write("(function(){var w = window; var p = w.parent; p.CSSHttpRequest.sandbox(w); w.onload = function(){p.CSSHttpRequest.callback('" + id + "');};})();");
        r.document.write("</script>");
        r.document.write("</body></html>");
        r.document.close();
    };
    
    
    chr.sandbox = function(w) {
    };
        
    
    chr.callback = function(id) {
        var r = chr.requests[id];
        var data = chr.parse(r);
        r.callback(data);
        window.setTimeout(function() {
            var r = chr.requests[id];
            try { r.iframe.parentElement.removeChild(r.iframe); } catch(e) {};
            delete chr.requests[id];
        }, 0);
    };
    
    chr.parse = function(r) {
        var data = [];
        
        // Safari, IE and same-domain Firefox
        try {
            var rules = r.document.styleSheets[0].cssRules || r.document.styleSheets[0].rules;
            for(var i = 0; i < rules.length; i++) {
                try {
                    var r = rules.item ? rules.item(i) : rules[i];
                    var ord = r.selectorText.match(chr.MATCH_ORDINAL)[1];
                    var val = r.style.backgroundImage.match(chr.MATCH_URL)[1];
                    data[ord] = val;
                } catch(e) {}
            }
        }
        
        // catch same-domain exception
        catch(e) {
            r.document.getElementsByTagName("link")[0].setAttribute("media", "screen");
            var x = r.document.createElement("div");
            x.innerHTML = "foo";
            r.document.body.appendChild(x);
            var ord = 0;
            try {
                while(1) {
                    x.id = "c" + ord;
                    var style = r.document.defaultView.getComputedStyle(x, null);
                    var bg = style["background-image"] || style.backgroundImage || style.getPropertyValue("background-image");
                    var val = bg.match(chr.MATCH_URL)[1];
                    data[ord] = val;
                    ord++;
                }
            } catch(e) {}
        }
        
        return decodeURIComponent(data.join(""));
    };
    
    
    chr.escapeHTML = function(s) {
        return s.replace(/([<>&""''])/g,
            function(m, c) {
                switch(c) {
                    case "<": return "&lt;";
                    case ">": return "&gt;";
                    case "&": return "&amp;";
                    case '"': return "&quot;";
                    case "'": return "&apos;";
                }
                return c;
            });
    };
})();
