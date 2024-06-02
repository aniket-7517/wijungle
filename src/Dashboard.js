import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Container, Grid, Paper, Typography } from '@mui/material';
import eve from "./eve.json";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(eve);
  }, []);

  const processData = () => {
    return data.map(item => {
      const { timestamp, alert } = item;
      return {
        timestamp,
        severity: alert ? alert.severity : null,
        category: alert ? alert.category : null,
      };
    });
  };

  const chartData = processData();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography  variant="h3"  style={{display:'flex', justifyContent:'center'}} gutterBottom>
          Network Alert Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                Alerts Over Time
              </Typography>
              <LineChart width={550} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="severity" stroke="#8884d8" />
              </LineChart>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                Alerts by Category
              </Typography>
              <LineChart width={550} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="category" stroke="#82ca9d" />
              </LineChart>
            </Paper>
          </Grid>
          <Grid style={{marginLeft:'250px'}} item xs={12} md={7}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                Alerts by Severity
              </Typography>
              <LineChart width={600} height={290} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="severity" stroke="#8884d8" />
              </LineChart>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
