import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Container, Grid } from '@mui/material';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [parentDepartmentId, setParentDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/departments/current');
        setDepartments(response.data);
      } catch (error) {
        console.error('Ошибка при получении подразделений:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDepartment = {
        name: departmentName,
        parentDepartmentId: parentDepartmentId || null
      };
      const response = await axios.post('http://localhost:8080/departments/create-department', newDepartment);
      console.log('Подразделение добавлено:', response.data);
      setDepartmentName('');
      setParentDepartmentId('');
      alert('Подразделение добавлено');
    } catch (error) {
      console.error('Ошибка при добавлении подразделения:', error);
    }
  };

  return (
    <Container>
      <h2>Добавление нового подразделения</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              label="Название подразделения"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="parent-department-label">Родительский отдел</InputLabel>
              <Select
                labelId="parent-department-label"
                value={parentDepartmentId}
                onChange={(e) => setParentDepartmentId(e.target.value)}
                label="Родительский отдел"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Добавить подразделение
        </Button>
      </form>
    </Container>
  );
};

export default AddDepartment;
