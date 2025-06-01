<?php

function fblgstp_navigation_search_render_cb() { 

  # start output buffer
  ob_start();

  # add block markup
  ?>
  <!-- header button -->
  <button class="fblgstp-search-button">
    <i class="bi bi-search"></i>
  </button>
  <!-- navigation menu -->
   <div class="fblgstp-search-button-overlay fblgstp-search-button-open"></div>
   <div class="fblgstp-search-button-container fblgstp-search-button-open">
    <form class="fblgstp-search-form">
      <input
        type="text"
        placeholder="<?php esc_html_e('What are you looking for?', 'foodblog16-plus'); ?>"
        name="s"
        class="fblgstp-search-input"
        value="<?php the_search_query(); ?>"
      />
      <button type="submit" class="fblgstp-search-btn">
        <?php esc_html_e('Search', 'foodblog16-plus'); ?>
      </button>
    </form>
   </div>

  <?php
  
  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;

}