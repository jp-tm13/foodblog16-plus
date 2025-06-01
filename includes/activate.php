<?

function fblgstp_activate_plugin() {
  // check wordpress version
  if (version_compare(get_bloginfo('version'), '5.9', '<')) {
    wp_die(
      __('You must update Wordpress to use this plugin.', 'foodblog16-plus')
    );
  }

  // register custom post type and flush rewrite rules
  fblgstp_recipe_post_type();
  flush_rewrite_rules();

  // create database-table for ratings
  global $wpdb;
  $tableName = "{$wpdb->prefix}recipe_ratings";
  $charsetCollate = $wpdb->get_charset_collate();
  $sql = "CREATE TABLE {$tableName} (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_id bigint(20) unsigned NOT NULL,
    user_id bigint(20) unsigned NOT NULL,
    rating decimal(3,2) unsigned NOT NULL
  ) ENGINE='InnoDB' {$charsetCollate}";

  require(ABSPATH . "/wp-admin/includes/upgrade.php");
  dbDelta($sql);

}