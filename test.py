#!/usr/bin/python


from __future__ import with_statement
import os
import glob
import unittest
from subprocess import Popen, PIPE


class TestSequenceFunctions(unittest.TestCase):
    def setUp(self):
        self.input = {}
        self.output = {}
        for filename in glob.glob(os.path.join('tests','*.in')):
            with open(filename) as f:
                self.input[filename.rsplit('.')[0]] = self._normalize(f.read())
        for filename in glob.glob(os.path.join('tests','*.out')):
            with open(filename) as f:
                self.output[filename.rsplit('.')[0]] = self._normalize(f.read())
    
    def _normalize(self, value):
        return value.rstrip('\n')
    
    def _test_cmd(self, cmd):
        for test in self.input.keys():
            print "Running test: %s" % test;
            pipe = Popen(cmd, stdin=PIPE, stdout=PIPE, close_fds=True);
            pipe.stdin.write(self.input[test])
            pipe.stdin.close()
            output = self._normalize(pipe.stdout.read())
            self.assertEqual(output, self.output[test])
    
    def test_python(self):
        self._test_cmd(['python', '__init__.py'])
    
    def test_ruby(self):
        self._test_cmd(['ruby', 'css_http_request.rb'])


if __name__ == '__main__':
    unittest.main()
