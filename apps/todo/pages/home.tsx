import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '.';
import TodoItem, { FlexWrapper } from '../components/todo-item/todo-item';

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div`
  color: pink;
`;

const TodoWrapper = styled.div`
  width: 100%;
  margin: 50px 0;
  padding: 10px;
  max-height: 300px;
  overflow-y: scroll;
`;

export const Input = styled.input`
  max-width: 100%;
  border: 2px solid #eee;
  border-radius: 4px;
  margin: 0;
  outline: none;
  padding: 10px 15px;
  box-sizing: border-box;
  flex: 1;
  min-height: 100%;
`;

export function Home(props: HomeProps) {
  const [items, setItems] = useState<Array<{ item: string; id: string }>>([]);
  const [newItem, setNewItem] = useState<string>('');

  const fetchItems = async () => {
    try {
      const data = await fetch('/api');
      const res = await data.json();
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async (item: string) => {
    try {
      await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ item }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const data = await fetch('/api', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await data.json();
      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (id: string, updatedItem: string) => {
    try {
      const data = await fetch('/api', {
        method: 'PATCH',
        body: JSON.stringify({ id, updatedItem }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await data.json();
      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <StyledHome>
      <h1>Welcome to Home!</h1>
      <TodoWrapper>
        {items.length > 0 &&
          items.map((val) => (
            <TodoItem
              key={val.id}
              item={val.item}
              id={val.id}
              deleteItem={deleteItem}
              updateItem={updateItem}
              fetchItems={fetchItems}
            />
          ))}
      </TodoWrapper>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createItem(newItem);
          //Clean up new item 
          setNewItem('');
          await fetchItems();
        }}
      >
        <FlexWrapper>
          <Input
            value={newItem}
            onChange={({ target }) => setNewItem(target.value)}
            placeholder="Add new item..."
          />
          <Button success type="submit">
            Add +
          </Button>
        </FlexWrapper>
      </form>
    </StyledHome>
  );
}

export default Home;
