<?php

function fblgstp_rest_recipe_query($args, $request) {
  $orderBy = $request->get_param('orderByRating');

  if(isset($orderBy)) {
    $args['orderby'] = 'meta_value_num';
    $args['meta_key'] = 'fblgstp_recipe_rating';
  }

  return $args;
}