<?php

function fblgstp_register_blocks() {
  # define the blocks
  $blocks = [
    ['name' => 'page-header', 'options' => [
      'render_callback' => 'fblgstp_page_header_render_cb'
    ]],
    ['name' => 'navigation-search', 'options' => [
      'render_callback' => 'fblgstp_navigation_search_render_cb'
    ]],
    ['name' => 'navigation-side-menu', 'options' => [
      'render_callback' => 'fblgstp_navigation_side_menu_render_cb'
    ]],
    ['name' => 'recipe-summary', 'options' => [
      'render_callback' => 'fblgstp_recipe_summary_render_cb'
    ]],
    ['name' => 'recipe-explorer', 'options' => [
      'render_callback' => 'fblgstp_recipe_explorer_render_cb'
    ]],
    ['name' => 'latest-posts', 'options' => [
      'render_callback' => 'fblgstp_latest_posts_render_cb'
    ]]
  ];

  # register all blocks from above
  foreach($blocks as $block) {
    register_block_type(
      FBLGSTP_PLUGIN_DIR . 'build/blocks/' . $block['name'],
      isset($block['options']) ? $block['options'] : []
    );
  }
}