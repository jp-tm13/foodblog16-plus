<?php

function fblgstp_page_header_render_cb($atts) {
  # retrive block attributes
  $heading = esc_html($atts['content']);
  # conditionally set header to category title
  if($atts['showCategory']) {
    $heading = get_the_archive_title();
  }

  # start output buffer
  ob_start();

  #add block markup
  ?>
  <div class="wp-block-foodblog16-plus-page-header">
    <div className="inner-page-header">
      <h1><?php echo $heading; ?></h1>
    </div>
  </div>
  <?php

  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}