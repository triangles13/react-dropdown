import { useEffect, useState } from 'react';
import Dropdown from './components/dropdown/Dropdown';
import getUsers, { User } from './api/getUsers';
import useDebounce from './helpers/useDebounce';

SelectArtist.defaultProps = {
  hideChosen: false,
};
function SelectArtist(
  { title, hideChosen = SelectArtist.defaultProps.hideChosen }
  : { title: string, hideChosen?: boolean },
) {
  const [items, setItems] = useState([] as User[]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([] as any);
  const [search, setSearch] = useState('');
  const debounce = useDebounce(search, 500);
  useEffect(() => {
    getUsers(search).then((users) => {
      setItems(users);
      setLoading(false);
    });
  }, [debounce]);
  return (
    <>
      <h1>
        { title }
      </h1>
      <Dropdown
        items={items}
        values={selectedItems}
        onChange={(updatedItems) => setSelectedItems(updatedItems)}
        optionalLabel="name"
        search={search}
        onInput={(value) => {
          setLoading(true);
          setSearch(value);
        }}
        hideChosen={hideChosen}
        isLoading={loading}
      />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <SelectArtist
        title="Перечислите художников, работы которых вам знакомы:"
        hideChosen
      />
      <hr />
      <SelectArtist
        title="Перечислите художников, с работами которых вы не знакомы:"
      />
    </div>
  );
}

export default App;
