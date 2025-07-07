<?php

if (defined('WP_UNINSTALL_PLUGIN')) {
  exit();
}

// delete options
delete_option('fblgstp_options');

// delete data
global $wpdb;
$wpdb->query(
 "DROP TABLE IF EXISTS {$wpdb->prefix}recipe_ratings"
);