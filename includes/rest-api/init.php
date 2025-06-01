<?php

function fblgstp_rest_api_init() {
  // add new route for signup
  register_rest_route('fblgstp/v1', '/signup', [
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'fblgstp_rest_api_signup_handler',
    'permission_callback' => '__return_true'
  ]);

  // add new route for signin
  register_rest_route('fblgstp/v1', '/signin', [
    'methods' => WP_REST_Server::EDITABLE,
    'callback' => 'fblgstp_rest_api_signin_handler',
    'permission_callback' => '__return_true'
  ]);

  // add new route for rating
  register_rest_route('fblgstp/v1', '/rate', [
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'fblgstp_rest_api_add_rating_handler',
    'permission_callback' => 'is_user_logged_in'
  ]);
}