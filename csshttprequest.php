<?php
/**
 * CSSHttpRequest PHP Encoder
 *
 * @author Tim Akinbo <obnika@timakinbo.com>, Randy Reddig <ydnar@nb.io>
 * @version 1.2
 * @license http://www.apache.org/licenses/LICENSE-2.0.html Apache License 2.0
 * @copyright Copyright (c) 2008, Tim Akinbo
 */

define('PREFIX', "data:,");
define('LENGTH', 2000 - strlen(PREFIX)); # Internet Explorer 2KB URI limit (http://support.microsoft.com/kb/208427)

function encode($string) {
	$quoted = rawurlencode($string);
	$out = "";
	for ($i = 0, $n = 0; $i < strlen($quoted); $i += LENGTH, $n++) {
		$out .= "#c" . $n . "{background:url(" . PREFIX . substr($quoted, $i, LENGTH) . ");}\n";
	}
	return $out;
}

/* unit test */
if(STDIN) {
    $string = file_get_contents("php://stdin", "r");
    echo encode($string);
}

?>
