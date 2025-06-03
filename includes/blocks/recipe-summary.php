<?php

function fblgstp_recipe_summary_render_cb($atts, $content, $block) {
  # get rich-text content
  $prep_time = isset($atts['prepTime']) ? esc_html($atts['prepTime']) : '';
  $cook_time = isset($atts['cookTime']) ? esc_html($atts['cookTime']) : '';
  $course = isset($atts['course']) ? esc_html($atts['course']) : '';

  # get cuisine terms
  $post_ID = $block->context['postId'];
  $post_terms = get_the_terms($post_ID, 'fblgstp_cuisine');
  $cuisines = '';
  $last_key = !empty($post_terms) ? array_key_last($post_terms) : [];
  foreach ($post_terms as $key => $term) {
    $url = get_term_meta($term->term_id, 'fblgstp_more_info_url', true);
    $comma = $last_key === $key ? '' : ', ';
    $cuisines .="
      <a href='{$url}' target='_blank'>{$term->name}</a>{$comma}
    ";
  }

  # get rating
  $rating = get_post_meta($post_ID, 'fblgstp_recipe_rating', true);

  # get rating count
  global $wpdb;
  $user_ID = get_current_user_id();
  $rating_count = $wpdb->get_var($wpdb->prepare(
    "SELECT COUNT(*) FROM {$wpdb->prefix}recipe_ratings
    WHERE post_id=%d AND user_id=%d",
    $post_ID, $user_ID
  ));

  # start output buffer
  ob_start();

  # add block markup
  ?>
  <div class="wp-block-foodblog16-plus-recipe-summary">
    <i class="bi bi-alarm"></i>
    <div class="recipe-columns-2">
      <div class="recipe-metadata">
        <div class="recipe-title">
          <?php _e('Prep Time', 'foodblog16-plus'); ?>
        </div>
        <div class="recipe-data recipe-prep-time">
          <?php echo $prep_time; ?>
        </div>
      </div>
      <div class="recipe-metadata">
        <div class="recipe-title">
          <?php _e('Cook Time', 'foodblog16-plus'); ?>
        </div>
        <div class="recipe-data recipe-cook-time">
          <?php echo $cook_time; ?>
        </div>
      </div>
    </div>
    <div class="recipe-columns-2-alt">
      <div class="recipe-columns-2">
        <div class="recipe-metadata">
          <div class="recipe-title">
            <?php _e('Course', 'foodblog16-plus'); ?>
          </div>
          <div class="recipe-data recipe-course">
            <?php echo $course; ?>
          </div>
        </div>
        <div class="recipe-metadata">
          <div class="recipe-title">
            <?php _e('Cuisine', 'foodblog16-plus'); ?>
          </div>
          <div class="recipe-data recipe-cuisine">
            <?php echo $cuisines; ?>
          </div>
        </div>
        <i class="bi bi-egg-fried"></i>
      </div>
      <div class="recipe-metadata">
        <div class="recipe-title">
          <?php _e('Rating', 'foodblog16-plus'); ?>
        </div>
        <div class="recipe-data" id="recipe-rating"
          data-post-id="<?php echo $post_ID; ?>"
          data-avg-rating="<?php echo $rating; ?>"
          data-logged-in="<?php echo is_user_logged_in(); ?>"
          data-rating-count="<?php echo $rating_count; ?>"
        >
        </div>
        <i class="bi bi-hand-thumbs-up"></i>
      </div>
    </div>
  </div>
  <?php
  
  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;

}