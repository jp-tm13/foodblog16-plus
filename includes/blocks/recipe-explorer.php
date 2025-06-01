<?php

function fblgstp_recipe_explorer_render_cb($atts) {
  $title = esc_html($atts['title']);
  $cuisine_IDs = array_map(function($term) {
    return $term['id'];
  }, $atts['cuisines']);

  $args = [
    'post_type' => 'fblgstp_recipe',
    'posts_per_page' => $atts['count'],
    'orderby' => 'meta_value_num',
    'meta_key' => 'fblgstp_recipe_rating',
    'order' => 'desc'
  ];

  if (!empty($cuisine_IDs)) {
    $args['tax_query'] = [
      'taxonomy' => 'fblgstp_cuisine',
      'field' => 'term_id',
      'terms' => $cuisine_IDs
    ];
  }
  $query = new WP_Query($args);

  # start output buffer
  ob_start();

  # add block markup
  ?>
  <div class="wp-block-foodblog16-plus-recipe-explorer">
    <h6><?php echo $title; ?></h6>
    <?php 
    if ($query->have_posts()) {
      while($query->have_posts()) {
        $query->the_post();
        ?>
        <div class="single-post">
          <a class="single-post-image" href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('thumbnail'); ?>
          </a>
          <div class="single-post-detail">
            <a href="<?php the_permalink(); ?>">
              <?php the_title(); ?>
            </a>
            <span>
              by <a href="<?php the_permalink(); ?>"><?php the_author(); ?></a>
            </span>
          </div>
        </div>
        <?php
      }
    }  
    ?>
  </div>
  <?php

  wp_reset_postdata();  
  
  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}