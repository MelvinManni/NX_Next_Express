import { Button } from 'apps/todo/pages';
import { Input } from 'apps/todo/pages/home';
import { useState } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TodoItemProps {
  updateItem(id: string, updatedItem: string): Promise<void>;
  deleteItem(id: string): Promise<void>;
  fetchItems(): Promise<any>;
  item: string;
  id: string;
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
  const [isEditingItem, setIsEditingItem] = useState<boolean>(false);
  const [item, setNewItem] = useState<string | null>(null);

  return (
    <FlexWrapper>
      <Input
        defaultValue={props.item}
        isEditing={isEditingItem}
        onChange={({ target }) => setNewItem(target.value)}
        disabled={!isEditingItem}
      />

      {!isEditingItem && (
        <Button onClick={() => setIsEditingItem(true)}>Edit</Button>
      )}

      {isEditingItem && (
        <Button
          onClick={async () => {
            await props.updateItem(props.id, item);
            //fetch updated items
            await props.fetchItems();
            setIsEditingItem(false);
          }}
        >
          Update
        </Button>
      )}

      <Button
        danger
        onClick={async () => {
          await props.deleteItem(props.id);

          //fetch updated items
          await await props.fetchItems();
        }}
      >
        Delete
      </Button>
    </FlexWrapper>
  );
}

export default TodoItem;
