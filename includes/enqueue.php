<?php

function fblgstp_enqueue_scripts() {
  // define urls for rest-api
  $auth_URLs = json_encode([
    'signup' => esc_url_raw(rest_url('fblgstp/v1/signup')),
    'signin' => esc_url_raw(rest_url('fblgstp/v1/signin'))
  ]);

  // // inject urls into authentication modal view script
  // wp_add_inline_script(
  //   'foodblog16-plus-authentication-modal-view-script',
  //   "const fblgstp_auth_rest = {$auth_URLs}",
  //   'before'
  // );

  // inject urls into navigation side menu view script
  wp_add_inline_script(
    'foodblog16-plus-navigation-side-menu-view-script',
    "const fblgstp_auth_rest = {$auth_URLs}",
    'before'
  );  
}