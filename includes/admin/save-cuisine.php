<?php

function fblgstp_save_cuisine_meta($termID) {
    // check if data exists
    if(!isset($_POST['fblgstp_more_info_url'])) {
        return;
    }

    update_term_meta(
        $termID, 
        'fblgstp_more_info_url', 
        sanitize_url($_POST['fblgstp_more_info_url'])
    );
}