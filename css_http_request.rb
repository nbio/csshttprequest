# CSSHttpRequest Ruby Encoder
#
# Author: Cameron Walters <cameron@nb.io>
# License: Apache License 2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
# Copyright (c) 2008, Cameron Walters


require "erb"
require "enumerator"

module CssHttpRequest
  PREFIX = "data:,".freeze
  LENGTH = (2000 - PREFIX.size).freeze # Internet Explorer 2KB URI limit

  def encode_chr(str)
    quoted = ERB::Util.url_encode(str)
    slice_num = 0
    last_start = 0
    chunks = (quoted.length.to_f / LENGTH).ceil
    STDERR << chunks
    output = ""
    chunks.times do |n|
      finish = last_start + LENGTH
      output += "#c%d{background:url(%s%s);}\n" % [slice_num, PREFIX, quoted[last_start...finish]]
      slice_num += 1
      last_start = finish
    end
    output
  end  
end

if __FILE__ == $PROGRAM_NAME
  include CssHttpRequest
  puts encode_chr(STDIN.read)
end
