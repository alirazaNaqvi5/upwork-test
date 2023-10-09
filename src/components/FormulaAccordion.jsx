import {
  Group,
  Avatar,
  Text,
  Accordion,
  Autocomplete,
  TagsInput,
  MultiSelect,
} from "@mantine/core";
import { useState } from "react";
import { charactersList } from "../stores/formulas";
import FormulaInput from "./FormulaInput";

function AccordionLabel({ label, image, description, i }) {
  return (
    <Group wrap="nowrap">
      <div>
        <Text>
          {label} {i}
        </Text>
        <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

export default function FormulaAccordion() {
  const items = charactersList.value.map((item, i) => (
    <Accordion.Item value={item.id + i} key={item.label + i}>
      <Accordion.Control>
        <AccordionLabel {...item} i={i} />
      </Accordion.Control>
      <Accordion.Panel>
        {/* crreate an autocomplete input here */}
        {/* add tags input of mantine with suggestions */}
        <FormulaInput data={item} />
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="left" variant="contained">
      {items}
    </Accordion>
  );
}
