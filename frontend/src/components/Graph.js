import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Chart from "react-apexcharts";
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import MathJax from 'react-mathjax2'
const ascii = 's(t) = a * sin( f * t / 100)'
const content = `La fonction: $$${ascii}$$`



const theme = createTheme();

function getChartOptions(data, categories) {
  return {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: categories,
        tickAmount: 5,
        forceNiceScale: true,
      },
      yaxis: {
        forceNiceScale: true,
        labels: {
          formatter: function (val) {
              return val.toFixed(2)
          }
      }

      }      
    },
    series: [
      {
        name: "series-1",
        data: data
      }
    ]
  }
}

export default function Graph({inputs}) {

    const [error, setError] = React.useState(null)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [items, setItems] = React.useState({data: [], categories: [], res: '-'})
    
    const endpoint = '/api/graph/'
  
    React.useEffect(() => {
        axios.post(endpoint, inputs)
        .then(
            (result) => {
              setItems(result.data);
              console.log(result.data)
              setIsLoaded(true);
            },
            (error) => {
              setIsLoaded(false);
              setError(error);
            }
        )
    }, [inputs])


    if (isLoaded) {
      let chartOptions = getChartOptions(items.data, items.categories)
      return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div>
                <MathJax.Context
                  input='ascii'
                  onLoad={ () => console.log("Loaded MathJax script!") }
                  onError={ (MathJax, error) => {
                      console.warn(error);
                      console.log("Encountered a MathJax error, re-attempting a typeset!");
                      MathJax.Hub.Queue(
                        MathJax.Hub.Typeset()
                      );
                  } }
                  script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                  options={ {
                      asciimath2jax: {
                          useMathMLspacing: true,
                          delimiters: [["$$","$$"]],
                          preview: "none",
                      }
                  } }
                >
                  <MathJax.Text text={ content }/>
                </MathJax.Context>
                </div>
                <div>
                  La valeur est:
                  {items.res.toFixed(4)}
                </div>

                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="line"
                    width="800"
                />
            </Box>
          </Container>
        </ThemeProvider>
      );
    } else {
      return (
        <></>
      )
    }
}