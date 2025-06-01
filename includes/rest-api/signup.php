<?php

function fblgstp_rest_api_signup_handler($request) {
  // get request data and define response
  $response = ['status' => 1];
  $params = $request->get_json_params();

  // validate request data
  if(
    !isset($params['email'], $params['username'], $params['password']) || 
    empty($params['email']) ||
    empty($params['username']) ||
    empty($params['password'])
  ) {
    return $response;
  }

  // extract and sanitize request data
  $email = sanitize_email($params['email']);
  $username = sanitize_text_field($params['username']);
  $password = sanitize_text_field($params['password']);

  // check for duplicate users
  if(
    username_exists($username) ||
    !is_email($email) ||
    email_exists($email)
  ) {
    return $response;
  }

  // create new user
  $userID = wp_insert_user([
    'user_login' => $username,
    'user_pass' => $password,
    'user_email' => $email
  ]);
  // check if user was created
  if(is_wp_error($userID)) {
    return $response;
  }

  // notify and login user after account creation
  wp_new_user_notification($userID, null, 'user');
  wp_set_current_user($userID);
  wp_set_auth_cookie($userID);
  // fire login hook
  $user = get_user_by('id', $userID);
  do_action('wp_login', $user->user_login, $user);

  // update status to success and return
  $response['status'] = 2;
  return $response;
}