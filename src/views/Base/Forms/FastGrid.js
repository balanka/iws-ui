import * as React from "react";
import Grid from "react-fast-grid";
import { IoIosCheckmarkCircleOutline, IoMdMenu } from "react-icons/io";
import {Input, Label,  Collapse,} from "reactstrap";
import {useState} from "react";

const styles = {
  outer: {
    borderRadius: 5,
    boxShadow: "0 10px 30px #BBB",
    padding: 10
  }
};

export const Example1 = () => (
  <div style={styles.outer}>
    <Grid container spacing={2} direction="row">
      <Grid item sm={6} xs={12}>
        <div>First Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>First Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>Last Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>Last Name</div>
        <input />
      </Grid>
      <Grid item sm={6} xs={12}>
        <div>Last Name</div>
        <input />
      </Grid>
    </Grid>
  </div>
);

export const Example2 = () => (
  <div style={styles.outer}>
    <Grid container justify="space-between">
      <Grid container xs spacing={1} justify="flex-start">
        <Grid item justify="center" alignItems="center">
          <IoMdMenu />
        </Grid>
        <Grid item>Description</Grid>
      </Grid>
      <Grid item justify="flex-end" alignItems="center">
        <IoIosCheckmarkCircleOutline />
      </Grid>
    </Grid>
  </div>
);

export const Example3 = () => (
  <Grid container spacing={2}>
    <Grid item xs={2}>
      <Grid
        container
        maximize
        style={styles.outer}
        justify="center"
        alignItems="center"
      >
        <IoIosCheckmarkCircleOutline />
      </Grid>
    </Grid>
    <Grid item xs>
      <Grid container style={{ ...styles.outer }} maximize>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <div>Last Name</div>
          </Grid>
          <Grid item>
            <input />
          </Grid>
          <Grid item>
            <div>Last Name</div>
          </Grid>
          <Grid item>
            <input />
          </Grid>
          <Grid item>
            <div>Last Name</div>
          </Grid>
          <Grid item>
            <input />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={2}>
      <Grid
        container
        maximize
        style={styles.outer}
        justify="center"
        alignItems="center"
      >
        <IoIosCheckmarkCircleOutline />
      </Grid>
    </Grid>
  </Grid>
);
export const Example31 = () => {
  const [state, setState] = useState({collapse: true, fadeIn: true, timeout: 300});
  const UP = "icon-arrow-up";
  const DOWN = "icon-arrow-down";


  return (
    <Grid item xs>
      <Grid container style={{...styles.outer}} maximize>
        <Grid container xs={8} spacing={4} alignItems="center" justify="space-evenly">
          <Grid item alignItems="center" justify="flex-start">
            <Label>Id</Label>
          </Grid>
          <Grid item alignItems="flex-start" justify="flex-start" style={{ width:100, height:50, 'padding-left': 5, 'padding-right': 3}}>
            <input className="form-control dateInput" style={{width: 90, height:30}}/>
          </Grid>
          <Grid item alignItems="center" justify="center" style={{width: 50, 'padding-left': 5, 'padding-right': 3}}>
            <div>OId</div>
          </Grid>
          <Grid item alignItems="center" justify="center" style={{width: 100, height:50, 'text-align': 'right', 'padding-left': 3}}>
            <input className="form-control dateInput" style={{width: 90, height:30}}/>
          </Grid>
          <Grid item alignItems="flex-end" justify="center">
            <div>O.Acc.</div>
          </Grid>
          <Grid item style={{'text-align': 'right', padding: 1}}>
            <input/>
          </Grid>
          <Grid item alignItems="flex-end" justify="center">
            <div>Amount</div>
          </Grid>
          <Grid item style={{'text-align': 'right', padding: 2}}>
            <input/>
          </Grid>
          <Grid item alignItems="flex-end" justify="flex-end" style={{'text-align': 'right', padding: 2}}>
            <div>Ccy</div>
          </Grid>
          <Grid item style={{'text-align': 'right', padding: 1}}>
            <input/>
          </Grid>
          <Grid item alignItems="flex-end" justify="flex-end">
            <div>Duedate</div>
          </Grid>
          <Grid item style={{'text-align': 'right', padding: 1}}>
            <input/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export const Example4 = () => (
  <Grid container justify="center" alignContent="center">
    <Grid
      item
      direction="column"
      container
      style={{ ...styles.outer, width: 400, height: 400 }}
      justify="space-between"
    >
      <Grid item xs>
        Header
      </Grid>
      <Grid item xs={10} style={{ overflowY: "scroll" }}>
        <Grid container direction="row">
          {Array(50)
            .fill(0)
            .map((_, i) => (
              <Grid key={i} item xs={12}>
                <div>Last Name</div>
                <input />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs>
        Footer
      </Grid>
    </Grid>
  </Grid>
);
