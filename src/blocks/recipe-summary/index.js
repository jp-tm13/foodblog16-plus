// external dependencies
import { Rating } from "@mui/material";

// wordpress dependencies
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Spinner } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";
import { select, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

// internal dependencies
import StyleProvider from "../../style-provider";
import block from "./block.json";
import summary from "../../icons/summary";
import "./main.css";

registerBlockType(block.name, {
  icon: summary.primary,
  edit({ attributes, setAttributes, context }) {
    // get attributes and context
    const { prepTime, cookTime, course } = attributes;
    const { postId } = context;
    const blockProps = useBlockProps();

    // get meta-data IDs
    const [termIDs] = useEntityProp(
      "postType",
      "fblgstp_recipe",
      "fblgstp_cuisine",
      postId
    );

    // get cuisines meta-data
    const { cuisines, isLoading } = useSelect(
      (select) => {
        const { getEntityRecords, isResolving } = select("core");
        const taxonomyArgs = [
          "taxonomy",
          "fblgstp_cuisine",
          { include: termIDs },
        ];

        return {
          cuisines: getEntityRecords(...taxonomyArgs),
          isLoading: isResolving("getEntityRecords", taxonomyArgs),
        };
      },
      [termIDs]
    );

    // get rating meta-data
    const { rating } = useSelect((select) => {
      const { getCurrentPostAttribute } = select("core/editor");

      return {
        rating: getCurrentPostAttribute("meta").fblgstp_recipe_rating,
      };
    });

    return (
      <>
        <div {...blockProps}>
          <i className="bi bi-alarm"></i>
          <div className="recipe-columns-2">
            <div className="recipe-metadata">
              <div className="recipe-title">
                {__("Prep Time", "foodblog16-plus")}
              </div>
              <div className="recipe-data recipe-prep-time">
                <RichText
                  tagName="span"
                  value={prepTime}
                  onChange={(prepTime) => setAttributes({ prepTime })}
                  placeholder={__("Prep time", "foodblog16-plus")}
                />
              </div>
            </div>
            <div className="recipe-metadata">
              <div className="recipe-title">
                {__("Cook Time", "foodblog16-plus")}
              </div>
              <div className="recipe-data recipe-cook-time">
                <RichText
                  tagName="span"
                  value={cookTime}
                  onChange={(cookTime) => setAttributes({ cookTime })}
                  placeholder={__("Cook time", "foodblog16-plus")}
                />
              </div>
            </div>
          </div>
          <div className="recipe-columns-2-alt">
            <div className="recipe-columns-2">
              <div className="recipe-metadata">
                <div className="recipe-title">
                  {__("Course", "foodblog16-plus")}
                </div>
                <div className="recipe-data recipe-course">
                  <RichText
                    tagName="span"
                    value={course}
                    onChange={(course) => setAttributes({ course })}
                    placeholder={__("Course", "foodblog16-plus")}
                  />
                </div>
              </div>
              <div className="recipe-metadata">
                <div className="recipe-title">
                  {__("Cuisine", "foodblog16-plus")}
                </div>
                <div className="recipe-data recipe-cuisine">
                  {isLoading && <Spinner />}
                  {!isLoading &&
                    cuisines &&
                    cuisines.map((term, index) => {
                      const comma = cuisines[index + 1] ? ", " : "";
                      return (
                        <>
                          <a href={term.meta.fblgstp_more_info_url}>
                            {term.name}
                          </a>
                          {comma}
                        </>
                      );
                    })}
                </div>
              </div>
              <i className="bi bi-egg-fried"></i>
            </div>
            <div className="recipe-metadata">
              <div className="recipe-title">
                {__("Rating", "foodblog16-plus")}
              </div>
              <div className="recipe-data">
                <Rating value={rating} readOnly size="small" />
              </div>
              <i className="bi bi-hand-thumbs-up"></i>
            </div>
          </div>
        </div>
      </>
    );
  },
});
