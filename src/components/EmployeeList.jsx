import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departmentId, setDepartmentId] = useState(1);
  const [startDate, setStartDate] = useState('2023-06-01');
  const [endDate, setEndDate] = useState('2023-06-30');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/employees/department/${departmentId}?startDate=${startDate}&endDate=${endDate}`);

      const uniqueEmployees = Array.from(new Set(response.data.map(emp => emp.fullName)))
        .map(fullName => {
          return response.data.find(emp => emp.fullName === fullName);
        });

      setEmployees(uniqueEmployees);
    } catch (error) {
      console.error('Ошибка получения сотрудников:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Получение сотрудников подразделения</h2>
      <TextField
        label="ID подразделения"
        type="number"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        style={{ marginBottom: '20px', marginRight: '10px' }}
      />
      <TextField
        label="Стартовая дата"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '20px', marginRight: '10px' }}
      />
      <TextField
        label="Конечная дата"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '20px', marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={fetchEmployees}>
        Получить сотрудников
      </Button>
      <List>
        {employees.map((employee) => (
          <ListItem key={employee.fullName}>
            <ListItemText primary={employee.fullName} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EmployeeList;