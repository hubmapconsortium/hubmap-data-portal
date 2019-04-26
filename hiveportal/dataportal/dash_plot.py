import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objs as go

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

df = pd.read_csv('.././studies.csv')


app.layout = html.Div([
    dcc.Graph(
        id='life-exp-vs-gdp',
        figure={
            'data': [
                go.Scatter(
                    x=df[df['subclass'] == i]['tissue'],
                    y=df[df['subclass'] == i]['data_type'],
                    text=df[df['subclass'] == i]['institution'],
                    mode='markers',
                    opacity=0.7,
                    marker={
                        'size': 15,
                        'line': {'width': 0.5, 'color': 'white'}
                    },
                    name=i
                ) for i in df.subclass.unique()
            ],
            'layout': go.Layout(
                xaxis={'type': 'log', 'title': 'By Tissue'},
                yaxis={'title': 'By Datatype'},
                margin={'l': 40, 'b': 40, 't': 5, 'r': 5},
                legend={'x': 0, 'y': 1},
                hovermode='closest'
            )
        }
    )
])

if __name__ == '__main__':
    app.run_server(debug=True)