import React from "react";
import { Flex, useCurrentTheme} from "@dynatrace/strato-components-preview";
import { EntitySelectorBuilder } from "../components/EntitySelectorBuilder"

export const Home = () => {
  const theme = useCurrentTheme();
  //const [numOfSelectors, setNumOfSelectors] = useState<number>(1);

  return (
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <EntitySelectorBuilder/>
    </Flex>
  );
};
