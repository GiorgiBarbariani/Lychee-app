import React from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './content.css';
import AlertIcon from './svg/alertIcon';
import Tooltip from '@mui/material/Tooltip';

interface Icontent {
  setTextToSend: (text: string) => void;
}

const Content = (props: Icontent) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const [textareaValue, setTextareaValue] = React.useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string);
    props.setTextToSend(event.target.value as string);
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
    setSelectedOption("");
    props.setTextToSend(event.target.value);
  };

  return (
    <>
      <div className='content-container'>
        <ul className='main-list' >
          <li className='main-list__outro'>
            Outro
            <Tooltip title="We will show the call to action at the end of the clip">
              <div className='outro-elem'>
                <AlertIcon />
              </div>
            </Tooltip>
          </li>
          <li className='main-list__cta'>
            Call to action
            <Box sx={{ minWidth: 160 }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOption}
                  displayEmpty
                  onChange={handleSelectChange}
                  sx={{
                    height: '32px',
                    width: '155px',
                    textAlign: "left"
                  }}
                  renderValue={
                    !selectedOption ? () => <span className='select-placeholder'>Select</span> : undefined
                  }
                >
                  <MenuItem value={"Listen on Spotify"}>Listen on Spotify</MenuItem>
                  <MenuItem value={"Listen on Apple"}>Listen on Apple</MenuItem>
                  <MenuItem value={"Listen on Google"}>Listen on Google</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </li>
          <li className='main-list__custom-cta'>
            Custom call to action
            <div className='main-list__custom-cta__list'>
              <textarea
                className='input-select'
                name="w3review"
                placeholder='The Most Amazing Podcast Ever!'
                value={textareaValue}
                onChange={handleTextareaChange}
                maxLength={20}
              />
              <div className='main-list__custom-cta__footer'>
                <div>
                  {textareaValue.length >= 20 &&
                    <div className='main-list__custom-cta__error'>
                      Max limit of characters is 20
                    </div>
                  }
                </div>
                <label className='main-list__custom-cta__label'>{textareaValue.length}/20</label>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Content