<?php
/**
 * Plugin Name: FoodBlog 16 Plus
 * Plugin URI: [TBA]
 * Author: Johannes Pfau
 * Author URI: [TBA]
 * Description: A plugin extending the FoodBlog 16 theme with custom blogs.
 * Version: 1.0
 * Requires at least: 5.8
 * Requires PHP: 8.0
 * Text Domain: foodblog16-plus
 * Domain Path: /languages
 */


// prevent unauthorized access
if (!function_exists('add_action')) {
  echo "You should not be here!";
  exit;
}

// setup
// -----
//// constant pointing to plugin dir
define('FBLGSTP_PLUGIN_DIR', plugin_dir_path(__FILE__));

// includes
// --------
//// check 'includes' directory
$rootFiles = glob(FBLGSTP_PLUGIN_DIR . "includes/*.php");
//// check all subdirectories of 'includes'
$subdirectoryFiles = glob(FBLGSTP_PLUGIN_DIR . "includes/**/*.php");
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

foreach ($allFiles as $filename) {
  include_once($filename);
}

// hooks
// -----
//// handle plugin activation
register_activation_hook(__FILE__, 'fblgstp_activate_plugin');
//// register blocks
add_action('init', 'fblgstp_register_blocks');
//// setup rest-api
add_action('rest_api_init', 'fblgstp_rest_api_init');
add_action('wp_enqueue_scripts', 'fblgstp_enqueue_scripts');
//// register/setup custom post type recipe
add_action('init', 'fblgstp_recipe_post_type');
add_action('fblgstp_cuisine_add_form_fields', 'fblgstp_cuisine_add_form_fields');
add_action('create_fblgstp_cuisine', 'fblgstp_save_cuisine_meta');
add_action('fblgstp_cuisine_edit_form_fields', 'fblgstp_cuisine_edit_form_fields');
add_action('save_post_fblgstp_recipe', 'fblgstp_save_post_recipe');
add_filter('rest_fblgstp_recipe_query', 'fblgstp_rest_recipe_query', 10, 2);



