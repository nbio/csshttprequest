__license__ = "Apache 2.0"
__copyright__ = "Copyright 2008 nb.io"
__author__ = "Randy Reddig - ydnar@nb.io"


import urllib


PREFIX = "data:,"
LENGTH = 2000 - len(PREFIX) # Internet Explorer 2KB URI limit


def encode(string):
    quoted = urllib.quote(string)
    out = ""
    n = 0
    for i in range(0, len(quoted), LENGTH):
        out += "#c%d{background:url(%s%s);}\n" % (n, PREFIX, quoted[i:i+LENGTH])
        n += 1
    return out


if __name__ == '__main__':
    import sys
    sys.stdout.write(encode(sys.stdin.read()))
