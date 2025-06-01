<?php

function fblgstp_navigation_side_menu_render_cb($atts) {
  # retrive block attributes
  $ref = (int) esc_attr($atts['ref']);
  # check if current user exists
  $user = wp_get_current_user();
  $open_class = $user->exists() ? 'fblgstp-open-modal' : 'fblgstp-open-modal';

  # start output buffer
  ob_start();

  # add block markup
  ?>
    <!-- header button -->
    <button class="fblgstp-side-menu-button">
      <i class="bi bi-list"></i>      
    </button>
    <!-- navigation menu -->
    <div class="fblgstp-side-menu-overlay fblgstp-side-menu-open"></div>
    <div class="fblgstp-side-menu-container fblgstp-side-menu-open">
      <div class="fblgstp-side-menu fblgstp-is-side-menu-nav-hidden">
        <div class="fblgstp-side-menu-header">Menu</div>
        <ul>
          <?php 
            $menu = get_post($ref);
            echo apply_filters( 'the_content', $menu->post_content );      
          ?>
        </ul>
      </div>
      <!-- sign-in/register link -->
      <div class="fblgstp-header-tools">
        <a class="fblgstp-signin-link <?php echo $open_class; ?>" href="#signin-modal">
          <div class="fblgstp-signin-icon">
            <i class="bi bi-person-circle"></i>
          </div>
          <div class="fblgstp-signin-text">
            <?php if($user->exists()) { ?>
              Hello, <?php echo $user->user_login; 
            } else { ?>
              Sign in<?php
            } ?>            
          </div>
        </a>
      </div>
      <!-- authentication modal -->
      <div class="fblgstp-authentication-modal">
        <div class="fblgstp-modal-overlay"></div>
        <div class="fblgstp-modal-content">
          <button class="fblgstp-modal-close-button">
            <i class="bi bi-x"></i>
          </button>
          <!-- modal tabs -->
          <ul class="fblgstp-tabs">
            <li>
              <a href="#signin-tab" class="fblgstp-active-tab">
                <i class="bi bi-key"></i>Sign in
              </a>
            </li>
            <li>
              <a href="#signup-tab">
                <i class="bi bi-person-plus-fill"></i>Sign up
              </a>
            </li>
          </ul>
          <div class="fblgstp-modal-body">
            <!-- login form -->
            <form id="signin-tab" style="display: block;">
              <div id="signin-status"></div>
              <fieldset>
                <label>Email</label>
                <input type="text" id="si-email" placeholder="johndoe@example.com" />

                <label>Password</label>
                <input type="password" id="si-password" />

                <button type="submit">Sign in</button>
              </fieldset>
            </form>
            <!-- register form -->
            <form id="signup-tab">
              <div id="signup-status"></div>
              <fieldset>
                <label>Full name</label>
                <input type="text" id="su-name" placeholder="John Doe" />

                <label>Email address</label>
                <input type="email" id="su-email" placeholder="johndoe@example.com" />

                <label for="su-password">Password</label>
                <input type="password" id="su-password" />

                <button type="submit">Sign up</button>
              </fieldset>
            </form>
          </div>
        </div>       
      </div>
      <!-- social menu -->
      <div class="fblgstp-social-menu">
        <i class="bi bi-facebook"></i>
        <i class="bi bi-instagram"></i>
        <i class="bi bi-twitter-x"></i>
        <i class="bi bi-pinterest"></i>
      </div>
    </div>
  <?php
  
  # retrieve buffer content and close it
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}