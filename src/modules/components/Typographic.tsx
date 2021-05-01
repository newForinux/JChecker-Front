import React from 'react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { TypographyProps } from '@material-ui/core/Typography';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => ({
  markedH2Center: {
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH3Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH4Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH6Left: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5),
    background: 'currentColor',
  },
});

const variantMapping = {
  h1: 'h1',
  h2: 'h1',
  h3: 'h1',
  h4: 'h1',
  h5: 'h3',
  h6: 'h2',
  subtitle1: 'h3',
};


export interface TypoProps extends TypographyProps, WithStyles<typeof styles> {
  variant: "h1" | "h3" | "h2" | "inherit" | "button" | "overline" | "caption" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2";
  marked?: false | 'center' | 'left';
  classes: any;
  component?: any;
}



function Typographic(props: TypoProps) {
  const { children, classes, marked = false, variant, className, ...other } = props;

  return (
    <Typography variantMapping={variantMapping} variant={variant} className={clsx(classes.root, className)} {...other}>
      {children}
      {marked ? (
        <span className={classes[`marked${capitalize(variant) + capitalize(marked)}`]} />
      ) : null}
    </Typography>
  );
}


export default withStyles(styles)(Typographic);