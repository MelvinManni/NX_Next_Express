import { Button } from 'apps/todo/pages';
import { Input } from 'apps/todo/pages/home';
import { useState } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TodoItemProps {
  updateItem(id: number, updatedItem: string): Promise<void>;
  deleteItem(id: number): Promise<void>;
  item: string;
  id: number;
}

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-top: 20px;
  @media all and (max-width: 470px) {
    flex-direction: column;
    input {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }
`;

export function TodoItem(props: TodoItemProps) {
  const [update, setUpdate] = useState<boolean>(false);
  const [item, setNewItem] = useState<string>(props.item);

  return (
    <FlexWrapper>
      <Input
        value={item}
        style={{ borderColor: update && '#1e4a88' }}
        onChange={({ target }) => setNewItem(target.value)}
        disabled={!update}
      />
      <Button
        onClick={async () => {
          if (update === false) {
            setUpdate(true);
          } else {
            await props.updateItem(props.id, item);
            setUpdate(false);
          }
        }}
      >
        {update ? 'Update' : 'Edit'}
      </Button>
      <Button
        danger
        onClick={async () => {
          await props.deleteItem(props.id);
        }}
      >
        Delete
      </Button>
    </FlexWrapper>
  );
}

export default TodoItem;
