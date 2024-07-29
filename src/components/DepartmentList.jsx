import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Typography, Container } from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [date, setDate] = useState('2023-06-18'); // Default date
  const [searchDate, setSearchDate] = useState(date); // Track the search date

  const fetchDepartments = async (searchDate) => {
    try {
      const response = await axios.get('http://localhost:8080/departments/by-date', { params: { date: searchDate } });
      setDepartments(response.data);
    } catch (error) {
      console.error('Ошибка поиска подразделений:', error);
    }
  };

  const handleSearch = () => {
    setDate(searchDate); 
    fetchDepartments(searchDate); 
  };

  useEffect(() => {
    fetchDepartments(date); 
  }, [date]); 

  return (
    <Container>
      <h2>Действующие подразделения на {date}</h2>
      <TextField
        label="Дата"
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginBottom: '20px', marginLeft: '20px' }}
      >
        Поиск
      </Button>
      {departments.length > 0 ? (
        <List>
          {departments.map((dept) => (
            <ListItem key={dept.id}>
              <ListItemText
                primary={`ID ${dept.id} - ${dept.name}`}
                secondary={dept.parentDepartmentName ? `Родительское подразделение: ${dept.parentDepartmentName}` : 'Нет родительского подразделения'}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>Нет подразделений на указанную дату.</Typography>
      )}
    </Container>
  );
};

export default DepartmentList;
