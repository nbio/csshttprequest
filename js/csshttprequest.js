/* 
CSSHttpRequest
Copyright 2008 nb.io - http://nb.io/
Licensed under Apache License, Version 2.0 - http://www.apache.org/licenses/LICENSE-2.0.html
*/

(function(){
    var chr = window.CSSHttpRequest = {};
    
    chr.ID = "__csshttprequest__"
    chr.counter = 0;
    chr.requests = {};
    chr.timeout = null;
    chr.styleSheet = null;
    chr.styleElement = null;
    
    
    chr.get = function(url, callback) {
        var id = (++chr.counter);
        var s = chr.getStyleSheet();
        var item, index;
        
        // IE
        if(s.addImport) {
            index = s.addImport(url);
            item = s.imports(index);
        }
        
        // W3C
        else if(s.insertRule) {
            index = s.insertRule("@import url(" + url + ");", 0);
            item = s.cssRules[index];
        }
        
        chr.startPoll();
        return chr.requests[id] = {
            id: id,
            index: index,
            item: item,
            styleSheet: item.styleSheet || item,
            callback: callback
        };
    };
        
    
    chr.getStyleSheet = function() {
        if(chr.styleSheet)
            return chr.styleSheet;
        
        var s, e;
        if(document.createStyleSheet) {
            s = document.createStyleSheet();
            e = s.owningElement || s.ownerNode;
        } else {
            e = document.createElement("style");
            s = e.sheet;
        }
        
        e.setAttribute("type", "text/css");
        e.setAttribute("media", "print, csshttprequest");
        e.setAttribute("title", chr.ID);
        e.setAttribute("id", chr.ID);
        
        if(!e.parentNode)
            document.getElementsByTagName("head")[0].appendChild(e);
        if(!s)
            s = e.sheet;
        
        chr.styleSheet = s;
        chr.styleElement = e;
        
        return s;
    };
    
    
    chr.reset = function() {
        var s = chr.getStyleSheet();
        if(s.imports)
            while(s.imports.length)
                s.removeImport(0);
        else if(s.cssRules)
            while(s.cssRules.length)
                s.deleteRule(0);
        chr.requests = {};
    };
    
    
    chr.startPoll = function() {
        if(chr.timeout)
            return;
        chr.timeout = window.setTimeout(chr.poll, 100);
    };
    
    
    chr.poll = function() {
        chr.timeout = null;
        var retry = false;
        
        for(var id in chr.requests) {
            var request = chr.requests[id];
            if(id != request.id)
                continue;
            var response = chr.parse(request.item.styleSheet || request.item);
            if(response === undefined)
                retry = true;
            else {
                delete chr.requests[id];
                request.callback(response, request);
            }
        }
        
        if(retry)
            chr.startPoll();
        else
            chr.reset();
    };
    
    
    chr.parse = function(s) {
        if(!s)
            return;
        
        var res = "";
        var d = decodeURIComponent;
        
        // IE
        if(s.imports && s.imports.length) {
            for(var i = 0; i < s.imports.length; i++) {
                var m = s.imports(i).href.match(/about\:chr\:(.+)/);
                if(m && m[1])
                    res += m[1];
            }
            return d(res);
        }
        
        // W3C
        else if(s.cssRules && s.cssRules.length) {            
            var rs = s.cssRules;
            for(var i = 0; i < rs.length; i++) {
                var r = rs[i];
                if(r.type != CSSRule.IMPORT_RULE)
                    continue;
                var m = r.cssText.match(/@import\s+url\("?about\:chr\:([^")]+)"?\)/);
                if(m && m[1])
                    res += m[1];
            }
            return d(res);
        }
    };
})();
