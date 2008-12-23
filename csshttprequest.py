__license__ = "Apache 2.0"
__copyright__ = "Copyright 2008 nb.io"
__author__ = "Randy Reddig - ydnar@nb.io"


import re
import urllib


PREFIX = "data:,"
LENGTH = 2000 - len(PREFIX) # Internet Explorer 2KB URI limit
MATCH_CHR = re.compile(r'\#c(?P<index>\d+)\s*\{\s*background(?:-image)?\:\s*url\(data\:,(?P<value>[^\)]+)\);?\s*}')


def encode(string):
    quoted = urllib.quote(string)
    out = ""
    n = 0
    for i in range(0, len(quoted), LENGTH):
        out += "#c%d{background:url(%s%s);}\n" % (n, PREFIX, quoted[i:i+LENGTH])
        n += 1
    return out


def decode(string):
    out = []
    rules = string.split('\n')
    for rule in rules:
        match = re.search(MATCH_CHR, rule)
        if match:
            index = int(match.group('index'))
            value = match.group('value')
            out.append('')
            out[index] = value
    return urllib.unquote(''.join(out))


if __name__ == '__main__':
    import sys
    sys.stdout.write(encode(sys.stdin.read()))
