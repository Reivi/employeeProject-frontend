import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const AddEmployee = () => {
  const [fullName, setFullName] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const addEmployee = async () => {
    try {
      await axios.post('http://localhost:8080/employees/create-employee', {
        fullName,
        departmentId
      });
      setFullName('');
      setDepartmentId('');
      alert('Сотрудник добавлен');
    } catch (error) {
      console.error('Ошибка добавления сотрудника:', error);
    }
  };

  return (
    <Container>
      <h2>Добавление нового сотрудника в подразделение</h2>
      <TextField
        label="ФИО сотрудника"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="ID подразделения"
        type="number"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={addEmployee}>
        Добавить сотрудника
      </Button>
    </Container>
  );
};

export default AddEmployee;
