import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function ChipsArray() {
  const classes = useStyles();
  const OnhighlightBox = React.forwardRef(function MyComponent(props, ref) {
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={ref}>
        Bin
      </div>
    );
  });

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "-keepclasseswithmembers" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" }
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Tooltip title={data.key}>
              <Chip
                icon={icon}
                avatar={<Avatar>{data.label[1]}</Avatar>}
                label="Primary clickable"
                clickable
                color="primary"
                label={data.label}
                className={classes.chip}
              />
            </Tooltip>
          </li>
        );
      })}
    </Paper>
  );
}
