import * as React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AutoComplete, Card } from "antd";

function Controls({ locations, neighborhoods, onSelect, onChange }) {
  const sortedNeighborhoods = neighborhoods.nodes.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const neighborhoodNames = sortedNeighborhoods.map((neighborhood) => {
    return neighborhood.name;
  });

  const sortedLocations = locations.nodes.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const locationNames = sortedLocations.map((location) => {
    return location.title;
  });

  return (
    <div>
      <AutoComplete
        className="sp-autocomplete"
        placeholder="Filter by location name..."
        dataSource={locationNames}
        allowClear={true}
        onSelect={(v, o) => onSelect(v, o, "filterLocation")}
        onChange={(v) => onChange(v, "filterLocation")}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        notFoundContent="Location Not Found"
      />
      <AutoComplete
        className="sp-autocomplete"
        placeholder="Filter by neighborhood..."
        dataSource={neighborhoodNames}
        allowClear={true}
        onSelect={(v, o) => onSelect(v, o, "filterNeighborhood")}
        onChange={(v) => onChange(v, "filterNeighborhood")}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        notFoundContent="Neighborhood Not Found"
      />
    </div>
  );
}

export default Controls;
