<?php

function fblgstp_latest_posts_render_cb($atts) {
  # get attributes
  $title = esc_html($atts['title']);

  # define the post query
  $args = [
    'post_type' => $atts['postType'],
    'posts_per_page' => $atts['count'],
    'orderby' => 'date',
    'order' => 'desc'
  ];
  $query = new WP_Query(array_merge($args, $args));

  # start output buffer
  ob_start();

  # add block markup
  ?>
  <div class="wp-block-foodblog16-plus-latest-posts">
    <div class="fblgstp-container fblgstp-margin-bot-sm">
      <h2><?php echo $title; ?></h2>
    </div>
    <div class="fblgstp-container-posts fblgstp-grid-4-cols fblgstp-margin-bot-sm">
    <?php
    if ($query->have_posts()) {
      while($query->have_posts()) {
        $query->the_post();
        if ($atts['postType'] == 'fblgstp_recipe') {
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
        } else {
        ?>
        <div class="fblgstp-post">
          <a class="fblgstp-post-link" href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('medium', ['class' => 'fblgstp-post-image']); ?>
            <div class="fb16-post-content">
              <div class="fb16-post-categories">
                <?php the_category(); ?>
              </div>
              <p class="fb16-post-title">
                <?php the_title(); ?>
              </p>
              <p class="fb16-post-date">
                <?php echo get_the_date(); ?>
              </p>
              <p class="fb16-post-text">
                <?php the_excerpt(); ?>
              </p>
            </div>
          </a>
        </div>
        <?php  
        }
      }
    }
    ?>
    </div>
    <div class="fblgstp-container fblgstp-flex fblgstp-justify-content-e">
      <?php
      if ($atts['postType'] == 'fblgstp_recipe') {
      ?>
        <a href="?page_id=7" class="fblgstp-button">
          <span><?php _e("View more", "foodblog16-plus") ?></span>
          <i class="bi bi-arrow-right-circle"></i>
        </a>
      <?php
      } else {
      ?>
        <a href="?page_id=11" class="fblgstp-button">
          <span><?php _e("View more", "foodblog16-plus") ?></span>
          <i class="bi bi-arrow-right-circle"></i>
        </a>
      <?php
      }
      ?>
    </div>
  </div>
  <?php

  # reset post data for future queries 
  wp_reset_postdata();  

  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}