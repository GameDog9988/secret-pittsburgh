import React from "react";
import { graphql, Link, navigate } from "gatsby";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import scrollTo from "gatsby-plugin-smoothscroll";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
import Seo from "../components/seo";
import useStickyState from "../components/useStickyState";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const ListViewPage = ({ data }) => {
  const sortedLocations = data.allNodeLocation.nodes.sort((a, b) => {
    return a.title.trim().localeCompare(b.title.trim());
  });

  const [, setListView] = useStickyState(true, "list-view");

  return (
    <main>
      <Seo title="List View" />
      <header
        className="absolute z-50 flex justify-center w-full max-w-3xl transform -translate-x-1/2 top-8 left-1/2"
        id="page-top"
      >
        <button
          onClick={() => {
            setListView(false);
            navigate("/", {
              state: { back: true },
            });
          }}
          aria-label="Go back to homepage"
          className="absolute text-lg transition transform -translate-y-1/2 focus-visible:scale-105 lg:text-xl left-8 top-1/2"
        >
          <FaArrowLeft />
        </button>
        <h1 className="px-4 py-2 text-lg font-bold text-white rounded shadow w-min lg:text-2xl xl:text-3xl bg-pitt-blue">
          <Link to="/" className="inline-block font-title whitespace-nowrap">
            Secret Pittsburgh
          </Link>
        </h1>
      </header>

      <section className="container relative flex flex-col justify-center min-h-screen pt-32 pb-24 mx-auto ">
        <div className="w-full max-w-3xl px-4 mx-auto space-y-8 leading-loose lg:max-w-5xl">
          <div className="w-full max-w-3xl mx-auto">
            <StaticImage
              className="object-cover rounded shadow-lg carousel-image"
              imgClassName="mx-auto w-full"
              placeholder="blurred"
              src="../images/secret_pittsburgh_list_view.jpg"
              alt="City of Pittsburgh"
            />
          </div>

          <h2 className="w-full max-w-3xl mx-auto text-3xl font-bold font-title">
            Secret Pittsburgh Locations
          </h2>
          <div className="space-y-8 leading-loose md:space-y-16 xl:leading-loose xl:text-lg">
            <p className="w-full max-w-3xl mx-auto">
              The "Secret Pittsburgh" Literature class invites University of
              Pittsburgh students to explore unusual or hidden spaces of the
              city, including "secret" spaces within well-known landmarks.
            </p>
            <ul className="grid items-stretch justify-center grid-cols-2 gap-8 justify-items-center lg:grid-cols-3">
              {data.allNodeLocation.nodes &&
                sortedLocations &&
                sortedLocations.map((location, i) => (
                  <li key={i}>
                    <Link
                      to={location.gatsbyPath}
                      className="block w-40 h-64 overflow-hidden transition transform rounded-md shadow sm:w-56 md:w-64 md:h-72 hover:scale-105 focus-visible:scale-105 bg-slate-200"
                    >
                      {location?.relationships?.field_associated_guidebook_entry
                        ?.relationships?.field_image &&
                        location?.relationships
                          ?.field_associated_guidebook_entry?.field_image && (
                          <GatsbyImage
                            className="object-cover object-center w-40 h-40 sm:w-56 md:w-64 md:h-48"
                            image={getImage(
                              location?.relationships
                                ?.field_associated_guidebook_entry
                                ?.relationships?.field_image[0]?.localFile
                                .childImageSharp.gatsbyImageData
                            )}
                            alt={
                              location?.relationships
                                ?.field_associated_guidebook_entry
                                ?.field_image[0]?.alt
                            }
                          />
                        )}

                      <div className="flex flex-col justify-center h-24 p-4 space-y-1 font-title text-ellipsis">
                        <h2 className="text-sm font-bold leading-snug sm:text-base">
                          {location.title}
                        </h2>
                        <p className="text-xs italic leading-snug sm:text-sm">
                          {location?.relationships?.field_neighborhood[0]?.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            <button
              onClick={() => scrollTo("#page-top")}
              className="flex items-center justify-center px-4 py-2 space-x-2 font-bold text-center text-black transition transform rounded shadow hover:text-black bg-slate-200 hover:scale-105"
            >
              <FaArrowUp />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ListViewPage;

export const query = graphql`
  {
    allNodeLocation {
      nodes {
        title
        field_geolocation {
          lng
          lat
        }
        relationships {
          field_neighborhood {
            name
          }
          field_associated_guidebook_entry {
            body {
              processed
            }
            field_image {
              alt
            }
            title
            relationships {
              field_image {
                uri {
                  url
                }
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      placeholder: BLURRED
                      formats: [AUTO, WEBP]
                      width: 256
                    )
                  }
                }
              }
            }
          }
          field_associated_basic_info_entr {
            body {
              processed
            }
            title
          }
          node__article {
            body {
              processed
            }
            field_image {
              alt
            }
            relationships {
              field_image {
                uri {
                  url
                }
              }
            }
            title
          }
          field_main_entry {
            title
            field_place {
              links {
                help {
                  href
                }
              }
            }
            body {
              processed
            }
            field_image {
              alt
            }
            relationships {
              field_image {
                uri {
                  url
                }
              }
            }
          }
          node__basics {
            body {
              processed
            }
            title
          }
          node__guidebook_entry {
            title
            body {
              processed
            }
          }
        }
        gatsbyPath(filePath: "/location/{nodeLocation.title}")
      }
    }
  }
`;
