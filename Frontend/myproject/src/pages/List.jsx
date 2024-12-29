import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { getTaskApi, postTaskApi, deleteTaskApi, updateTaskApi, retrieveTaskApi } from '../apis/fetchApi';
import { toast } from 'react-toastify';

function List() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: '',
    due_date: ''
  });
  
  const token = sessionStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` };

  const gettasks = () => {
    getTaskApi(headers).then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(() => {
    gettasks();
  }, []);

  const handleshow = () => {
    setEditTask(null);
    setNewTask({
      title: '',
      description: '',
      status: '',
      due_date: ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAdd = () => {
    const { title, description, status, due_date } = newTask;
    if (!title || !description || !status || !due_date) {
      toast.warning("Invalid input, all fields are required.");
    } else {
      postTaskApi(headers, newTask).then((res) => {
        toast.success("Task added successfully.");
        gettasks();
        handleCloseModal();
      }).catch((error) => {
        toast.error("Error adding task.");
      });
    }
  };

  const handleDelete = (id) => {
    deleteTaskApi(id, headers).then(() => {
      toast.success("Task deleted successfully.");
      gettasks();
    }).catch((error) => {
      toast.error("Error deleting task.");
    });
  };

  const handleEdit = (id) => {
    retrieveTaskApi(id, headers).then((res) => {
      setEditTask(res.data);
      setNewTask(res.data);
      setShowModal(true);
    }).catch((error) => {
      toast.error("Error retrieving task.");
    });
  };

  const handleEditSave = () => {
    if (!newTask.title || !newTask.description || !newTask.status || !newTask.due_date) {
      toast.warning("Invalid input, all fields are required.");
    } else {
      updateTaskApi(newTask.id, newTask, headers).then(() => {
        toast.success("Task updated successfully.");
        gettasks();
        handleCloseModal();
      }).catch((error) => {
        toast.error("Error updating task.");
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Task Management</h2>
      <Button variant="primary" onClick={handleshow}>Add New Task</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.due_date}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(task.id)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editTask ? 'Edit Task' : 'Add New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="">Select status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="due_date"
                value={newTask.due_date}
                onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          {editTask ? 
            <Button variant="primary" onClick={handleEditSave}>Save Changes</Button> :
            <Button variant="primary" onClick={handleAdd}>Add Task</Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default List;
