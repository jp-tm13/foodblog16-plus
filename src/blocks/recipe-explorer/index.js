// wordpress dependencies
import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { PanelBody, QueryControls } from "@wordpress/components";
import { select, useSelect } from "@wordpress/data";
import { RawHTML } from "@wordpress/element";

// internal dependencies
import block from "./block.json";
import explorer from "../../icons/explorer";
import "./main.css";

registerBlockType(block.name, {
  icon: explorer.primary,
  edit({ attributes, setAttributes }) {
    // get attributes
    const { title, count } = attributes;
    const blockProps = useBlockProps();

    // get all possible course terms
    const terms = useSelect((select) => {
      return select("core").getEntityRecords("taxonomy", "fblgstp_course", {
        per_page: -1,
      });
    });

    // check if default term is among them
    const current_course = terms?.find((term) => {
      return term.slug === "dinner";
    });

    // get 'count' amount of top rated post from the given course term
    const posts = useSelect(
      (select) => {
        return select("core").getEntityRecords("postType", "fblgstp_recipe", {
          per_page: count,
          _embed: true,
          fblgstp_course: current_course?.id,
          order: "desc",
          orderByRating: 1,
        });
      },
      [count, current_course]
    );

    return (
      <>
        <div className="wp-block-foodblog16-plus-recipe-explorer">
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
            <nav>
              <ul className="fblgstp-list-nav-hero">
                <li>
                  <a
                    href="#dinner"
                    className="fblgstp-link-nav-hero fblgstp-active-nav-link"
                  >
                    {__("Dinner", "foodblog16-plus")}
                  </a>
                </li>
                <li>
                  <a href="#supper" className="fblgstp-link-nav-hero">
                    {__("Supper", "foodblog16-plus")}
                  </a>
                </li>
                <li>
                  <a href="#breakfast" className="fblgstp-link-nav-hero">
                    {__("Breakfast", "foodblog16-plus")}
                  </a>
                </li>
                <li>
                  <a href="#dessert" className="fblgstp-link-nav-hero">
                    {__("Dessert", "foodblog16-plus")}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="fblgstp-container-posts fblgstp-grid fblgstp-grid-4-cols">
            {posts?.map((post) => {
              const featuredImage =
                post._embedded &&
                post._embedded["wp:featuredmedia"] &&
                post._embedded["wp:featuredmedia"].length > 0 &&
                post._embedded["wp:featuredmedia"][0];

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
            })}
          </div>
        </div>
      </>
    );
  },
});
