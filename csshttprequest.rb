#!/usr/bin/env ruby -wKU
require "erb"
require "enumerator"

include ERB::Util

PREFIX = "data:,".freeze
LENGTH = (2000 - PREFIX.size).freeze # Internet Explorer 2KB URI limit

def encode(str)
  quoted = url_encode(str)
  slice_num = 0
  output = ""
  quoted.each_slice(LENGTH) do |chunk|
    out += "#c%d{background:url(%s%s);}\n" % (slice_num, PREFIX, chunk)
    slice_num += 1
  end
  out
