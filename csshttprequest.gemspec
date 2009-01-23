# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{csshttprequest}
  s.version = "1.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Cameron Walters", "Randy Reddig"]
  s.date = %q{2009-01-23}
  s.description = %q{Please see the latest info at http://nb.io/hacks/csshttprequest/}
  s.email = %q{ping+csshttprequest@nb.io}
  s.files = ["README.markdown", "VERSION.yml", "lib/csshttprequest.rb", "test/csshttprequest_test.rb", "test/inputs", "test/inputs/hello-world.in", "test/inputs/json-flickr.in", "test/inputs/json-time.in", "test/inputs/lorem.in", "test/test_helper.rb"]
  s.has_rdoc = true
  s.homepage = %q{http://github.com/nbio/csshttprequest}
  s.rdoc_options = ["--inline-source", "--charset=UTF-8"]
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.1}
  s.summary = %q{CSSHttpRequest is cross-domain AJAX using CSS as a transport.}

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 2

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
