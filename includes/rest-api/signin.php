<?php

function fblgstp_rest_api_signin_handler($request) {
  // get request data and define response
  $response = ['status' => 1];
  $params = $request->get_json_params();
  
  // validate request data
  if(
    !isset($params['user_login'], $params['password']) ||
    empty($params['user_login']) ||
    empty($params['password'])
  ) {
    return $response;
  }

  // extract and sanitize request data
  $email = sanitize_email($params['user_login']);
  $password = sanitize_text_field($params['password']);

  // login user
  $user = wp_signon([
    'user_login' => $email,
    'user_password' => $password,
    'remember' => true
  ]);
  // check if login was successful
  if(is_wp_error($user)) {
    return $response;
  }

  // update status to success and return
  $response['status'] = 2;
  return $response;
}