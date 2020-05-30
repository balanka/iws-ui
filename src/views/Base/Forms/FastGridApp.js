import * as React from "react";
import Grid, { Hidden } from "react-fast-grid";
import { Example1, Example2, Example31, Example4 } from "./FastGrid";

export default function FastGridApp() {
  return (
    <Grid container spacing={2} style={{ padding: 20 }} direction="column">
      <Grid item>
        <Example31 />
      </Grid>
    </Grid>
  );
}
