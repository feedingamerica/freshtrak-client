import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const countryOptions = [
  { key: 'en', value: 'en', flag: 'us', text: 'American' },
  { key: 'spa', value: 'spa', flag: 'mx', text: 'Spanish' },
  { key: 'som', value: 'som', flag: 'so', text: 'Somalia' },
  { key: 'rus', value: 'rus', flag: 'ru', text: 'Russia' },
  { key: 'tur', value: 'tur', flag: 'tr', text: 'Turkish' },
  { key: 'ara', value: 'ara', flag: 'ae', text: 'Arabic' },
  { key: 'zho', value: 'zho', flag: 'cn', text: 'China' },
  { key: 'hin', value: 'hin', flag: 'in', text: 'Hindi' },
  { key: 'nep', value: 'nep', flag: 'np', text: 'Nepali' }

]

const CountryListComponent = (props) => (
  <Dropdown compact
    onChange={props.change}
    placeholder='Select Language'
    search
    selection
    options={countryOptions}
  />
)

export default CountryListComponent;