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
    output = ""
    quoted.each_slice(LENGTH) do |chunk|
      output += "#c%d{background:url(%s%s);}\n" % [slice_num, PREFIX, chunk]
      slice_num += 1
    end
    output
  end  
end

if __FILE__ == $PROGRAM_NAME
  include CssHttpRequest
  puts encode_chr(STDIN.read)
end
