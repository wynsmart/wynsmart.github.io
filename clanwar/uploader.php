<?php
/* ini_set("display_errors", "On"); */
// admin verification
$passcode = $_POST['passcode'];
// read in passcodes
$filename = './passcodes.csv';
$file = fopen($filename, "r");
if ($file) {
	$clancodes = array();
	while ($line = fgetcsv($file)) {
		$clancodes[$line[0]] = $line[1];
	}
	fclose($file);
}
$clanname = array_search($passcode, $clancodes);
/* $clanname = "peta"; */
if (!$clanname) {
	echo 'Invalid passcode!';
	exit();
}

// get file info
$file = $_FILES['file_to_upload'];
$file_name = $file['name'];
$file_type = $file['type'];
$file_ext = strtolower(pathinfo($file_name,PATHINFO_EXTENSION));
$file_size = $file['size'];
$file_error = $file['error'];
$temp_file = $file['tmp_name'];

// check file availability
$isAvailable = true;
$types_allowed = array('text/csv');
$exts_allowed = array('csv');
$size_limitation = 20000;
if (!in_array($file_ext, $exts_allowed)) {
	$isAvailable = false;
	echo 'File type not allowed.';
}
if ($file_size > $size_limitation) {
	$isAvailable = false;
	echo 'File size exceeded limitation.';
}
if ($file_error > 0) {
	$isAvailable = false;
	echo 'Error: '.$file_error;
}

// move file to right location
/*
if ($isAvailable) {
	$file_new_name = 'clanwar_'.$clanname.'.csv';
	$file_directory = './';
	$file_path = $file_directory.$file_new_name;
	if (!file_exists($file_directory)) {
		mkdir($file_directory);
	}
	$success = move_uploaded_file($temp_file, $file_path);
	if ($success) {
		echo 'File Uploaded:';
		echo '<div>Clan: '.$clanname.'</div>';
		echo '<div>Name: '.$file_name.'</div>';
		echo '<div>Size: '.$file_size.'</div>';
		echo '<div>Type: '.$file_type.'</div>';
	}
}
*/

if ($isAvailable){
	$storage = new SaeStorage();
	$domain = 'clanwar';
	$destFileName = 'clanwar_'.$clanname.'.csv';
	$srcFileName = $temp_file;
	$result = $storage->upload($domain,$destFileName, $srcFileName, -1);
	if ($result){
		echo 'File Uploaded:';
		echo '<div>Clan: '.$clanname.'</div>';
		echo '<div>Name: '.$file_name.'</div>';
		echo '<div>Size: '.$file_size.'</div>';
		echo '<div>Type: '.$file_type.'</div>';
	}
}

?>