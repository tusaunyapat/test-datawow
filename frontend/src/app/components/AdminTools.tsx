import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Overview from "./Overview";
import CreateConcert from "./CreateConcert";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="h-full" // CRITICAL: Fill the flex-1 space
      {...other}
    >
      {/* Box must be h-full so Overview can fill it */}
      {value === index && <Box sx={{ p: 0, height: "100%" }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminTools() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full h-156  flex flex-col overflow-hidden">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Create" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <div className="flex-1 overflow-hidden">
          <CustomTabPanel value={value} index={0}>
            <Overview />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CreateConcert />
          </CustomTabPanel>
        </div>
      </Box>
    </div>
  );
}
