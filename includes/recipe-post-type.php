<?

// define all labels
function fblgstp_recipe_post_type() {
  $labels = array(
    'name'                  => _x( 
      'Recipes', 'Post type general name', 'foodblog16-plus' 
    ),
    'singular_name'         => _x( 
      'Recipe', 'Post type singular name', 'foodblog16-plus' 
    ),
    'menu_name'             => _x( 
      'Recipes', 'Admin Menu text', 'foodblog16-plus' 
    ),
    'name_admin_bar'        => _x( 
      'Recipe', 'Add New on Toolbar', 'foodblog16-plus' 
    ),
    'add_new'               => __( 'Add New', 'foodblog16-plus' ),
    'add_new_item'          => __( 
      'Add New Recipe', 'foodblog16-plus' 
    ),
    'new_item'              => __( 
      'New Recipe', 'foodblog16-plus' 
    ),
    'edit_item'             => __( 
      'Edit Recipe', 'foodblog16-plus' 
    ),
    'view_item'             => __( 
      'View Recipe', 'foodblog16-plus' 
    ),
    'all_items'             => __( 
      'All Recipes', 'foodblog16-plus' 
    ),
    'search_items'          => __( 
      'Search Recipes', 'foodblog16-plus' 
    ),
    'parent_item_colon'     => __( 
      'Parent Recipes:', 'foodblog16-plus' 
    ),
    'not_found'             => __( 
      'No recipes found.', 'foodblog16-plus' 
    ),
    'not_found_in_trash'    => __( 
      'No recipes found in Trash.', 'foodblog16-plus' 
    ),
    'featured_image'        => _x( 
      'Recipe Cover Image', 
      'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 
      'foodblog16-plus' 
    ),
    'set_featured_image'    => _x( 
      'Set cover image', 
      'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 
      'foodblog16-plus' 
    ),
    'remove_featured_image' => _x( 
      'Remove cover image', 
      'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 
      'foodblog16-plus' 
    ),
    'use_featured_image'    => _x( 
      'Use as cover image', 
      'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 
      'foodblog16-plus' 
    ),
    'archives'              => _x( 
      'Recipe archives', 
      'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 
      'foodblog16-plus' 
    ),
    'insert_into_item'      => _x( 
      'Insert into recipe', 
      'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 
      'foodblog16-plus' 
    ),
    'uploaded_to_this_item' => _x( 
      'Uploaded to this recipe', 
      'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 
      'foodblog16-plus' 
    ),
    'filter_items_list'     => _x( 
      'Filter recipes list', 
      'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 
      'foodblog16-plus' 
    ),
    'items_list_navigation' => _x( 
      'Recipes list navigation', 
      'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 
      'foodblog16-plus' 
    ),
    'items_list'            => _x( 
      'Recipes list', 
      'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 
      'foodblog16-plus' 
    ),
	);

  // set up options for post-type
  $args = array(
    'labels'              => $labels,
    'public'              => true,
    'publicly_queryable'  => true,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'query_var'           => true,
    'rewrite'             => array( 'slug' => 'recipe' ),
    'capability_type'     => 'post',
    'has_archive'         => true,
    'hierarchical'        => false,
    'menu_position'       => 20,
    'supports'            => array( 
      'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields' 
    ),
    'show_in_rest'        => true,
    'description'         => __(
      'A custom post type for recipes.', 'foodblog16-plus' 
    ),
    'taxonomies'          => ['category', 'post_tag']
  );

  // register post
  register_post_type('fblgstp_recipe', $args);

  // register post meta-data wirth REST api
  register_post_meta('fblgstp_recipe', 'fblgstp_recipe_rating', [
    'type' => 'number',
    'description' => 'The rating for a recipe.',
    'single' => true,
    'default' => 0,
    'show_in_rest' => true,
  ]);

  // register custom taxonomy cuisine
  register_taxonomy('fblgstp_cuisine', 'fblgstp_recipe', [
    'label' => __('Cuisine', 'foodblog16-plus'),
    'rewrite' => ['slug', 'cuisine'],
    'show_in_rest' => true
  ]);

  // register term meta-data with REST api
  register_term_meta('fblgstp_cuisine', 'fblgstp_more_info_url', [
    'type'          => 'string',
    'description'   => 'A URL for more information on a cuisine.',
    'single'        => true,
    'default'       => '#',
    'show_in_rest'  => true,
  ]);

  register_taxonomy('fblgstp_course', 'fblgstp_recipe', [
    'label' => __('Course', 'foodblog16-plus'),
    'rewrite' => ['slug', 'course'],
    'show_in_rest' => true
  ]);
}