<?php

function fblgstp_search_form_render_cb($atts) {
  # retrive block attributes
  $bgColor = esc_attr($atts['bgColor']);
  $textColor = esc_attr($atts['textColor']);
  $styleAttr = "background-color:{$bgColor};color:{$textColor};";

  # start output buffer
  ob_start();

  # add block markup
  ?>
  <div style="<?php echo $styleAttr; ?>" class="wp-block-foodblog16-plus-search-form">
    <h1>
      <?php esc_html_e('Search', 'foodblog16-plus') ?>:
      <?php the_search_query(); ?>
    </h1>
    <form action="<?php echo esc_url(home_url('/')); ?>">
      <input 
        type="text"
        placeholder="<?php esc_html_e('What are you looking for?', 'foodblog16-plus'); ?>"
        name="s"
        value="<?php the_search_query(); ?>"
      />
      <div class="btn-wrapper">
        <button type="submit" style="<?php echo $styleAttr; ?>">
          <?php esc_html_e('Search', 'foodblog16-plus'); ?>
        </button>
      </div>
    </form>
  </div>
  <?php

  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}