import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./tab.css";
import Content from '../content/content';
import Kit from '../kit/kit';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function TabComponent() {
  const [value, setValue] = React.useState(0);
  const [textToSend, setTextToSend] = React.useState('example');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleButtonClick = () => {
    const text = textToSend;

    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <>
    <Kit />
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 200, color: '#2237FF' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderLeft: 1, borderColor: 'divider' }}
      >
        <Tab label="Texts" {...a11yProps(0)} />
        <Tab label="Logo" {...a11yProps(1)} />
        <Tab label="Outro" {...a11yProps(2)} />
        <Tab label="Custom brand kit" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Text tab will be here very soon ...
      </TabPanel>

      <TabPanel value={value} index={1}>
        Logo tab will be here very soon ...
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Content setTextToSend={setTextToSend} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Custom brand kit tab will be here very soon ...
      </TabPanel>
    </Box>
    <hr />
    <button className='save-button' onClick={handleButtonClick}>Save</button>
    </>
  );
}