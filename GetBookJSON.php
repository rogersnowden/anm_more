<?php
    $thing = './bookSet.json';
    $fileStuff = file_get_contents($thing);
    if ($fileStuff) {
        echo $fileStuff;
    } else {
        echo "no JSON contents";
    }
?>