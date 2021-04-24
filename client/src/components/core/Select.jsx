import styled from 'styled-components';
import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";

const StyledMultiSelect = styled(MultiSelect)`
  max-width: 180px;
  margin: 1rem 0;
`;

export default StyledMultiSelect;

const MultipleSelect = () => {
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
    { label: "Watermelon 🍉", value: "watermelon" },
    { label: "Pear 🍐", value: "pear" },
    { label: "Apple 🍎", value: "apple" },
    { label: "Tangerine 🍊", value: "tangerine" },
    { label: "Pineapple 🍍", value: "pineapple" },
    { label: "Peach 🍑", value: "peach" },
  ];

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};
