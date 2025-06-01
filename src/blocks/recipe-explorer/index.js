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
import icons from "../../icons/icons";
import "./main.css";

registerBlockType(block.name, {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    const { title, count, cuisines } = attributes;
    const blockProps = useBlockProps();

    const terms = useSelect((select) => {
      return select("core").getEntityRecords("taxonomy", "fblgstp_course", {
        per_page: -1,
      });
    });

    const suggestions = {};
    terms?.forEach((term) => {
      suggestions[term.name] = term;
    });

    const cuisineIDs = cuisines.map((term) => term.id);
    const posts = useSelect(
      (select) => {
        return select("core").getEntityRecords("postType", "fblgstp_recipe", {
          per_page: count,
          _embed: true,
          fblgstp_cuisine: cuisineIDs,
          order: "desc",
          orderByRating: 1,
        });
      },
      [count, cuisineIDs]
    );

    return (
      <>
        <div className="fblgstp-container">
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
                  href="#"
                  className="fblgstp-link-nav-hero fblgstp-active-nav-link"
                >
                  {__("Dinner", "foodblog16-plus")}
                </a>
              </li>
              <li>
                <a href="#" className="fblgstp-link-nav-hero">
                  {__("Supper", "foodblog16-plus")}
                </a>
              </li>
              <li>
                <a href="#" className="fblgstp-link-nav-hero">
                  {__("Breakfast", "foodblog16-plus")}
                </a>
              </li>
              <li>
                <a href="#" className="fblgstp-link-nav-hero">
                  {__("Dessert", "foodblog16-plus")}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="fblgstp-container">
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
                        featuredImage.media_details.sizes.thumbnail.source_url
                      }
                      alt={featuredImage.alt_text}
                      className="fblgstp-recipe-image"
                    />
                  )}
                  <div className="fblgstp-recipe-content">
                    <p class="fblgstp-recipe-title">
                      <RawHTML>{post.title.rendered}</RawHTML>
                    </p>
                    <div class="fblgstp-recipe-rating">
                      <i class="bi bi-star-fill"></i>
                      <span>4.8 from 106 votes</span>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* <InspectorControls>
          <PanelBody title={__("Settings", "foodblog16-plus")}></PanelBody>
          <QueryControls
            numberOfItems={count}
            minItems={1}
            maxItems={10}
            onNumberOfItemsChange={(count) => setAttributes({ count })}
            categorySuggestions={suggestions}
            onCategoryChange={(newTerms) => {
              const newCuisines = [];
              newTerms.forEach((cuisine) => {
                if (typeof cuisine == "object") {
                  newCuisines.push(cuisine);
                }

                const cuisineTerm = terms?.find(
                  (term) => term.name === cuisine
                );

                if (cuisineTerm) newCuisines.push(cuisineTerm);
              });

              setAttributes({ cuisines: newCuisines });
            }}
            selectedCategories={cuisines}
          />
        </InspectorControls>
        <div {...blockProps}>
          <RichText
            tagName="h6"
            value={title}
            withoutInteractiveFormatting
            onChange={(title) => setAttributes({ title })}
            placeholder={__("Title", "foodblog16-plus")}
          />
          {posts?.map((post) => {
            const featuredImage =
              post._embedded &&
              post._embedded["wp:featuredmedia"] &&
              post._embedded["wp:featuredmedia"].length > 0 &&
              post._embedded["wp:featuredmedia"][0];

            return (
              <div class="single-post">
                {featuredImage && (
                  <a class="single-post-image" href={post.link}>
                    <img
                      src={
                        featuredImage.media_details.sizes.thumbnail.source_url
                      }
                      alt={featuredImage.alt_text}
                    />
                  </a>
                )}
                <div class="single-post-detail">
                  <a href={post.link}>
                    <RawHTML>{post.title.rendered}</RawHTML>
                  </a>
                  <span>
                    by <a href={post.link}>{post._embedded.author[0].name}</a>
                  </span>
                </div>
              </div>
            );
          })}
        </div> */}
      </>
    );
  },
});
