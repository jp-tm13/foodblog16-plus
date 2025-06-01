<?php

function fblgstp_cuisine_add_form_fields() {
  ?>
  <div class="form-field">
    <label><?php _e('More Info URL', 'foodblog16-plus') ?></label>
    <input type="text" name="fblgstp_more_info_url">
    <p>
      <?php
        _e(
          'A URL a user can click to learn more information about this cuisine', 
          'foodblog16-plus'
        );
      ?>
    </p>
  </div>
  <?php
}

function fblgstp_cuisine_edit_form_fields($term) {
    $url = get_term_meta($term->term_id, 'fblgstp_more_info_url', true);

    ?>
    <tr class="form-field">
        <th>
            <label><?php _e('More Info URL', 'foodblog16-plus') ?></label>
            <td>
                <input type="text" name="fblgstp_more_info_url" value="<?php echo $url; ?>"/>
                <p class="description">
                  <?php _e(
                    'A URL a user can click to learn more information about this cuisine', 
                    'foodblog16-plus'
                    ) ?>
                </p>    
            </td>
        </th>
    </tr>
    <?php
}