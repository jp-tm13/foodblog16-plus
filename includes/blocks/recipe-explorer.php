<?php

function fblgstp_recipe_explorer_render_cb($atts) {
  # get attributes
  $title = esc_html($atts['title']);

  # define query arguments
  $args = [
    'post_type' => 'fblgstp_recipe',
    'posts_per_page' => $atts['count'],
    'orderby' => 'meta_value_num',
    'meta_key' => 'fblgstp_recipe_rating',
    'order' => 'desc'
  ];
  $args_q_dinner = ['tax_query' => [[
    'taxonomy' => 'fblgstp_course',
    'field' => 'slug',
    'terms' => 'dinner'
  ]]];
  $args_q_supper = ['tax_query' => [[
    'taxonomy' => 'fblgstp_course',
    'field' => 'slug',
    'terms' => 'supper'
  ]]];
  $args_q_break = ['tax_query' => [[
    'taxonomy' => 'fblgstp_course',
    'field' => 'slug',
    'terms' => 'breakfast'
  ]]];
  $args_q_dessert = ['tax_query' => [[
    'taxonomy' => 'fblgstp_course',
    'field' => 'slug',
    'terms' => 'dessert'
  ]]];

  # start output buffer
  ob_start();

  # add block markup
  ?>
  <div class="wp-block-foodblog16-plus-recipe-explorer">
    <div class="fblgstp-container fblgstp-margin-bot-sm">
      <h2><?php echo $title; ?></h2>
      <nav>
        <ul class="fblgstp-list-nav-hero">
          <li>
            <a
              href="#dinner"
              class="fblgstp-link-nav-hero fblgstp-active-nav-link"
            >
              <?php _e('Dinner', 'foodblog16-plus'); ?>
            </a>
          </li>
          <li>
            <a href="#supper" class="fblgstp-link-nav-hero">
              <?php _e('Supper', 'foodblog16-plus'); ?>
            </a>
          </li>
          <li>
            <a href="#breakfast" class="fblgstp-link-nav-hero">
              <?php _e('Breakfast', 'foodblog16-plus'); ?>
            </a>
          </li>
          <li>
            <a href="#dessert" class="fblgstp-link-nav-hero">
              <?php _e('Dessert', 'foodblog16-plus'); ?>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="fblgstp-container-posts fblgstp-dinner fblgstp-grid-4-cols" style="display: grid;">
      <?php 
      $query_dinner = new WP_Query(array_merge($args, $args_q_dinner));
      if ($query_dinner->have_posts()) {
        while($query_dinner->have_posts()) {
          $query_dinner->the_post();
          ?>
          <div class="fblgstp-recipe">
            <a class="fblgstp-recipe-link" href="<?php the_permalink(); ?>">
              <?php the_post_thumbnail('medium', ['class' => 'fblgstp-recipe-image']); ?>
              <div class="fblgstp-recipe-content">
                <p class="fblgstp-recipe-title">
                  <?php the_title(); ?>
                </p>
                <div class="fblgstp-recipe-rating">
                  <i class="bi bi-star-fill"></i>
                  <span>
                    <?php 
                    echo get_post_meta(
                      get_the_ID(), 
                      'fblgstp_recipe_rating', 
                      true
                    ) 
                    ?>
                  </span>
                </div>
              </div>
            </a>
          </div>
          <?php
        }
      }
      wp_reset_postdata();  
      ?>
    </div>

    <div class="fblgstp-container-posts fblgstp-supper fblgstp-grid-4-cols">
      <?php 
      $query_supper = new WP_Query(array_merge($args, $args_q_supper));
      if ($query_supper->have_posts()) {
        while($query_supper->have_posts()) {
          $query_supper->the_post();
          ?>
          <div class="fblgstp-recipe">
            <a class="fblgstp-recipe-link" href="<?php the_permalink(); ?>">
              <?php the_post_thumbnail('medium', ['class' => 'fblgstp-recipe-image']); ?>
              <div class="fblgstp-recipe-content">
                <p class="fblgstp-recipe-title">
                  <?php the_title(); ?>
                </p>
                <div class="fblgstp-recipe-rating">
                  <i class="bi bi-star-fill"></i>
                  <span>
                    <?php 
                    echo get_post_meta(
                      get_the_ID(), 
                      'fblgstp_recipe_rating', 
                      true
                    ) 
                    ?>
                  </span>
                </div>
              </div>
            </a>
          </div>
          <?php
        }
      }
      wp_reset_postdata();  
      ?>
    </div>

    <div class="fblgstp-container-posts fblgstp-breakfast fblgstp-grid-4-cols">
      <?php 
      $query_break = new WP_Query(array_merge($args, $args_q_break));
      if ($query_break->have_posts()) {
        while($query_break->have_posts()) {
          $query_break->the_post();
          ?>
          <div class="fblgstp-recipe">
            <a class="fblgstp-recipe-link" href="<?php the_permalink(); ?>">
              <?php the_post_thumbnail('medium', ['class' => 'fblgstp-recipe-image']); ?>
              <div class="fblgstp-recipe-content">
                <p class="fblgstp-recipe-title">
                  <?php the_title(); ?>
                </p>
                <div class="fblgstp-recipe-rating">
                  <i class="bi bi-star-fill"></i>
                  <span>
                    <?php 
                    echo get_post_meta(
                      get_the_ID(), 
                      'fblgstp_recipe_rating', 
                      true
                    ) 
                    ?>
                  </span>
                </div>
              </div>
            </a>
          </div>
          <?php
        }
      }
      wp_reset_postdata();  
      ?>
    </div>

    <div class="fblgstp-container-posts fblgstp-dessert fblgstp-grid-4-cols">
      <?php 
      $query_dessert = new WP_Query(array_merge($args, $args_q_dessert));
      if ($query_dessert->have_posts()) {
        while($query_dessert->have_posts()) {
          $query_dessert->the_post();
          ?>
          <div class="fblgstp-recipe">
            <a class="fblgstp-recipe-link" href="<?php the_permalink(); ?>">
              <?php the_post_thumbnail('medium', ['class' => 'fblgstp-recipe-image']); ?>
              <div class="fblgstp-recipe-content">
                <p class="fblgstp-recipe-title">
                  <?php the_title(); ?>
                </p>
                <div class="fblgstp-recipe-rating">
                  <i class="bi bi-star-fill"></i>
                  <span>
                    <?php 
                    echo get_post_meta(
                      get_the_ID(), 
                      'fblgstp_recipe_rating', 
                      true
                    ) 
                    ?>
                  </span>
                </div>
              </div>
            </a>
          </div>
          <?php
        }
      }
      wp_reset_postdata();  
      ?>
    </div>
  </div>
  <?php

  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}