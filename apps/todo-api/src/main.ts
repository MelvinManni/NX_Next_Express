/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import {v4 as uuidV4} from 'uuid';

const app = express();
app.use(express.json()); // used instead of body-parser

let todoArray: Array<{ item: string; id: string }> = [
  { item: 'default todo', id: uuidV4() },
];


app.get('/', (req, res) => {
  res.send({ message: 'Welcome to todo-api!' });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    data: todoArray,
  });
});

app.post('/api', (req, res) => {
  const item: string = req.body.item;

  // Increment id of item based on the id of the last item in the array.
  let id: string = uuidV4();

  // add the new object to the array
  todoArray.push({ item, id });

  res.status(200).json({
    message: 'item added successfully',
  });
});

app.patch('/api', (req, res) => {
  //Value of the updated item
  const updatedItem: string = req.body.updatedItem;

  // id of the position to update
  const id: string = req.body.id;

  // find index of the id
  const arrayIndex = todoArray.findIndex((obj) => obj.id === id);

  // update item that matches the index
  todoArray[arrayIndex].item = updatedItem;

  res.status(200).json({
    message: 'item updated successfully',
  });
});

app.delete('/api', (req, res) => {
  // id of the position to remove
  const id: string = req.body.id;

  // update array and remove the object that matches the id
  todoArray = todoArray.filter((val) => val.id !== id);

  res.status(200).json({
    message: 'item removed successfully',
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
