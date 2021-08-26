/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();
app.use(express.json()); // used instead of body-parser


let todoArray: Array<{ item: string; id: number }> = [
  { item: 'default todo', id: 0 },
];

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to todo-api!' });
});

app.get('/api/fetch', (req, res) => {
  res.status(200).json({
    data: todoArray,
  });
});

app.post('/api/create', (req, res) => {
  const item: string = req.body.item;

  // Increment id of item based on the id of the last item in the array.
  const id: number =
    todoArray.length > 0 ? todoArray[todoArray.length - 1].id + 1 : 0;

  // add the new object to the array
  todoArray.push({ item, id });

  res.status(200).json({
    message: 'item added successfully',
  });
});

app.patch('/api/update', (req, res) => {
  //Value of the updated item
  const updatedItem: string = req.body.updatedItem;

  // id of the position to update
  const id: number = req.body.id;

  // update item that matches the id
  todoArray.forEach((val) => {
    if (val.id === id) {
      val.item = updatedItem;
    }
  });

  res.status(200).json({
    message: 'item updated successfully',
  });
});

app.delete('/api/delete', (req, res) => {
  // id of the position to remove
  const id: number = req.body.id;

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
