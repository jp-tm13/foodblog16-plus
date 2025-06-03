// wordpress dependencies
import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  QueryControls,
  MenuGroup,
  MenuItemsChoice,
} from "@wordpress/components";
import { select, useSelect } from "@wordpress/data";
import { RawHTML } from "@wordpress/element";

// internal dependencies
import block from "./block.json";
import posts from "../../icons/posts";
import "./main.css";

registerBlockType(block.name, {
  icon: posts.primary,
  edit({ attributes, setAttributes }) {
    // get attributes
    const { title, count, postType } = attributes;
    const blockProps = useBlockProps();

    // get all posts of given 'postType'
    const posts = useSelect(
      (select) => {
        return select("core").getEntityRecords("postType", postType, {
          per_page: count,
          _embed: true,
          order: "desc",
          orderby: "date",
        });
      },
      [postType, count]
    );

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Settings", "foodblog16-plus")}>
            <MenuGroup label={__("Post Type", "foodblog16-plus")}>
              <MenuItemsChoice
                choices={[
                  { value: "post", label: "Posts" },
                  { value: "fblgstp_recipe", label: "Recipes" },
                ]}
                value={postType}
                onSelect={(postType) => setAttributes({ postType })}
              />
            </MenuGroup>
          </PanelBody>
        </InspectorControls>
        <div className="wp-block-foodblog16-plus-latest-posts">
          <div className="fblgstp-container fblgstp-margin-bot-sm">
            <div {...blockProps}>
              <RichText
                tagName="h2"
                value={title}
                withoutInteractiveFormatting
                onChange={(title) => setAttributes({ title })}
                placeholder={__("Title", "foodblog16-plus")}
              />
            </div>
          </div>
          <div className="fblgstp-container-posts fblgstp-grid-4-cols fblgstp-margin-bot-sm">
            {posts?.map((post) => {
              const featuredImage =
                post._embedded &&
                post._embedded["wp:featuredmedia"] &&
                post._embedded["wp:featuredmedia"].length > 0 &&
                post._embedded["wp:featuredmedia"][0];

              if (postType === "fblgstp_recipe") {
                return (
                  <div className="fblgstp-recipe">
                    <a className="fblgstp-recipe-link" href={post.link}>
                      {featuredImage && (
                        <img
                          src={
                            featuredImage.media_details.sizes.medium.source_url
                          }
                          alt={featuredImage.alt_text}
                          className="fblgstp-recipe-image"
                        />
                      )}
                      <div className="fblgstp-recipe-content">
                        <p className="fblgstp-recipe-title">
                          <RawHTML>{post.title.rendered}</RawHTML>
                        </p>
                        <div className="fblgstp-recipe-rating">
                          <i className="bi bi-star-fill"></i>
                          <span>{post.meta.fblgstp_recipe_rating}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              } else {
                return (
                  <div className="fblgstp-post">
                    <a className="fblgstp-post-link" href={post.link}>
                      {featuredImage && (
                        <img
                          src={
                            featuredImage.media_details.sizes.medium.source_url
                          }
                          alt={featuredImage.alt_text}
                          className="fblgstp-post-image"
                        />
                      )}
                      <div className="fb16-post-content">
                        <div className="fb16-post-categories">
                          {post._embedded["wp:term"][0].map((term) => {
                            return `${term.name} `;
                          })}
                        </div>
                        <p className="fb16-post-title">
                          <RawHTML>{post.title.rendered}</RawHTML>
                        </p>
                        <p className="fb16-post-date">
                          {post.date.slice(0, -10)}
                        </p>
                        <p className="fb16-post-text">
                          <RawHTML>{post.excerpt.rendered}</RawHTML>
                        </p>
                      </div>
                    </a>
                  </div>
                );
              }
            })}
          </div>
          <div className="fblgstp-container fblgstp-flex fblgstp-justify-content-e">
            <a href="#" className="fblgstp-button">
              <span>{__("View more", "foodblog16-plus")}</span>
              <i className="bi bi-arrow-right-circle"></i>
            </a>
          </div>
        </div>
      </>
    );
  },
});
