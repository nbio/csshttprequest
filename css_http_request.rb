require "erb"
require "enumerator"

class CssHttpRequest
  PREFIX = "data:,".freeze
  LENGTH = (2000 - PREFIX.size).freeze # Internet Explorer 2KB URI limit

  def self.encode(str)
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
  puts CssHttpRequest.encode(STDIN.read)
end
