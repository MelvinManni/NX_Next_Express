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
  const [items, setItems] = useState<Array<{ item: string; id: number }>>();
  const [newItem, setNewItem] = useState<string>('');

  const fetchItems = async () => {
    try {
      const data = await fetch('/api/fetch');
      const res = await data.json();
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async (item: string) => {
    try {
      const data = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({ item }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNewItem('');
      await fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const data = await fetch('/api/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await data.json();
      await fetchItems();
      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (id: number, updatedItem: string) => {
    try {
      const data = await fetch('/api/update', {
        method: 'PATCH',
        body: JSON.stringify({ id, updatedItem }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await data.json();
      await fetchItems();
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
        {items !== undefined &&
          items.map((val, index) => (
            <TodoItem
              key={index.toString()}
              item={val.item}
              id={val.id}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          ))}
      </TodoWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createItem(newItem);
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
