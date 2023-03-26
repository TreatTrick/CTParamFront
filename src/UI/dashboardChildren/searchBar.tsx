import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
    if(event.target.value === ''){
      setIsSearching(false);
    }else{
      setIsSearching(true);
    }
  };

  const handleCancel = () => {
    setSearchTerm('');
    onSearch('');
    setIsSearching(false);
  };

  return (
    <form noValidate autoComplete="off">
      <TextField id="outlined-basic" label="搜索" variant="standard" value={searchTerm} onChange={handleSearch} sx={{ width: '100%' }} InputProps={{
          endAdornment: (
            isSearching ?
            <IconButton type="button" 
            aria-label="search" 
            onClick={()=>{ handleCancel() }}
            >
              {isSearching ? <CancelIcon /> : <SearchIcon />}
            </IconButton>
            : null
          ),
        }} />
    </form>
  );
};


export default SearchBar;
