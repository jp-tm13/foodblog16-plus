<?php

function fblgstp_header_tools_render_cb($atts) {
  // get current user data and check loggin status
  $user = wp_get_current_user();
  $name = $user->exists() ? $user->user_login : 'Sign in';
  $open_class = $user->exists() ? 'open-modal' : 'open-modal';

  # start output buffer
  ob_start();

  # add block markup
  ?>
  <div class="wp-block-tutorial-theme-01-plus-header-tools">
    <?php
      if($atts['showAuth']) {
        ?>
        <a class="signin-link <?php echo $open_class; ?>" href="#signin-modal">
          <div class="signin-icon">
            <i class="bi bi-person-circle"></i>
          </div>
          <div class="signin-text">
            <small>Hello, <?php echo $name; ?></small>
            My Account
          </div>
        </a>
        <?php
      }
    ?>
  </div>
  <?php

  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}