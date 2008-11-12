<?php
/**
 * CSSHttpRequest PHP Encoder 1.0
 *
 * @author Tim Akinbo <obnika@timakinbo.com>
 * @version 1.0
 * @license http://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0
 * @copyright Copyright (c) 2008, Tim Akinbo
 */

define('PREFIX', "about:chr:");
define('LENGTH', 2000 - strlen(PREFIX)); # Internet Explorer 2KB URI limit (http://support.microsoft.com/kb/208427)

function encode($string)
{
	$quoted = urlencode($string);
	$out = "";
	for ($i = 0; $i < strlen($quoted); $i+=LENGTH)
	{
		$out .= "@import url(" . PREFIX . substr($quoted, $i, $i+LENGTH) . ");\n";
	}
	return $out;
}

?>
