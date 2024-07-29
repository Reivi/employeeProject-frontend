import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import DepartmentList from './components/DepartmentList';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import AddDepartment from './components/AddDepartment'; // Импортируем компонент AddDepartment

const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>
          <Button color="inherit" component={Link} to="/">Подразделения</Button>
          <Button color="inherit" component={Link} to="/employees">Сотрудники подразделения</Button>
          <Button color="inherit" component={Link} to="/add-employee">Добавить сотрудника</Button>
          <Button color="inherit" component={Link} to="/add-department">Добавить подразделение</Button> {/* Новая ссылка */}
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<DepartmentList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/add-department" element={<AddDepartment />} /> {/* Новый маршрут */}
        </Routes>
      </Container>
    </>
  );
};

export default App;
