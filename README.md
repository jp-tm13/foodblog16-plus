# foodblog16-plus

An extension plugin for the foodblog16 wordpress theme. Provides the blocks needed for it to run.

## How To Use

While the plugin might run on your own Wordpress Theme, it is not quite production
ready yet and problems might occur. It is primarily developed to be an extention
for the foodblog16 theme and you should use it in combination with it. For further
instructions on how to set up the theme and wordpress environment,
see: https://github.com/jp-tm13/foodblog16

### Install Plugin

1. clone the repository into '...\wp-content\plugins'

2. activate the plugin from the wordpress dashboard

## Block Reference/Functionality

The plugin provides various custom blocks to the block editor, implementing
functionality that Wordpress provides either does not at all or in an unsatisfactory
manner.

### Latest Posts

This block enables the user to display the 4 latest posts of a given post-type.
Currently it supports native Wordpress posts and the custom post-type provided
by the plugin: recipes

### Navigation Search

A custom search-bar for the header/navigation menu. It is displayed as a simple
button in the header navigation (magnifying glass icon) and when clicked opens
attaches a search overlay to the header.

### Navigation Side Menu

A custom side-menu/mobile menu for the header/navigation. While Wordpress does
provide a native mobile-menu, it is not very customizable and only displays the
navigation. This block aims to provide a permanent side-bar, that can be opened
from the header navigation at all times while housing the navigation on smaller
devices as well. In addition it also provides a login/sign-up widget and
socials-menu for the user.

### Recipe Explorer

This block enables the user to explore the recipes of the blog by course. It
displayes the 4 highest rated recipes of the selected course in a similar fashion
to the 'latest posts'-block.

### Recipe Summary

A summary for individual recipes, that displayes important information like
cook/prep time in an succinict manner. It also serves as an access point to the
rating system, where logged in users can rate recipes once.
