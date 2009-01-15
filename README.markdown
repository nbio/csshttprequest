# CSSHttpRequest is cross-domain AJAX using CSS.

### Please see the latest info at [http://nb.io/hacks/csshttprequest/](http://nb.io/hacks/csshttprequest/)

Like JavaScript includes, this works because CSS is not subject to the
same-origin policy that affects XMLHttpRequest. CSSHttpRequest functions
similarly to JSONP, and is limited to making GET requests. Unlike JSONP,
untrusted third-party JavaScript cannot execute in the context of the calling
page.

The transport encodes the payload in the background-image property:

    #c0 { background: url(data:,Hello%20World!); }

This version has been tested in cross-domain contexts in Safari 3.x, Firefox 3.x
and Internet Explorer 6.

